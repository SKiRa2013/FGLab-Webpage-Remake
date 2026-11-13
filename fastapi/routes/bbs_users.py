import logging

from fastapi import APIRouter, HTTPException, Depends, status

from sqlalchemy import text
from sqlalchemy.engine import Connection
from sqlalchemy.exc import DBAPIError, IntegrityError

from config.db import get_db
from config.tripcode import parse_userdata

from models.bbs_users import PostBbsUser, BbsUserResponse

bbs = APIRouter()

logger = logging.getLogger(__name__)

################################################################################################################################

def get_bbs_user_by_id(user_id: int, db: Connection):
    query = text("SELECT * FROM bbs_users WHERE id = :user_id")
    result = db.execute(query, {'user_id': user_id}).mappings().fetchone()
    
    if not result:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado.")
    
    return result

def get_user_by_name(db: Connection, name: str):
    query = text("""
        SELECT id, name, email, tripcode
        FROM bbs_users
        WHERE name = :name
    """)
    return db.execute(query, {'name': name}).mappings().fetchone()

def create_user(db: Connection, name: str, email: str | None, password: str):
    clean_name, tripcode = parse_userdata(
        raw_name=name,
        explicit_password=password
    )
            
    query = text("""
        INSERT INTO bbs_users (name, email, tripcode)
        VALUES (:name, :email, :tripcode)
        RETURNING id, name, email, tripcode
    """)
    
    return db.execute(query, {
        'name': clean_name,
        'email': email,
        'tripcode': tripcode
    }).mappings().fetchone()

def authenticate_user(db: Connection, raw_name: str, email: str | None, password: str) -> dict:
    clean_name, incoming_tripcode = parse_userdata(raw_name, password)
    
    # User exists, either log in or block if the password is incorrect
    existing_user = get_user_by_name(db, clean_name)
    
    if existing_user:
        # User exists, incorrect password
        if existing_user['tripcode'] != incoming_tripcode:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"The password for '{clean_name}' does not match."
            )

        return dict(existing_user)
    
    # User does not exist, create a new one
    new_user = create_user(db, raw_name, email, password)
    return dict(new_user)

################################################################################################################################

@bbs.post('/bbs/users/', response_model=BbsUserResponse, status_code=status.HTTP_201_CREATED)
def create_bbs_user(bbs_user: PostBbsUser, db: Connection = Depends(get_db)):    
    try:
        result = create_user(db, bbs_user.name, bbs_user.email, bbs_user.password)

        db.commit()
        return result
    
    except IntegrityError as ie:
        db.rollback()
        
        logger.warning(f"Integrity error creating BBS user: {ie.orig}")
        
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="El usuario o combinación de datos ya existe."
        )
    
    except DBAPIError as dbe:
        db.rollback()
    
        logger.error(f"Database error creating BBS user: {dbe.orig}")
        
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Error interno al procesar la solicitud en la base de datos.")

@bbs.get('/bbs/users/{user_id}', response_model=BbsUserResponse, status_code=status.HTTP_200_OK)
def read_bbs_user(user_id: int, db: Connection = Depends(get_db)):
    try:
        user = get_bbs_user_by_id(user_id, db)
        return user
    
    except HTTPException as he:
        raise he
    
    except DBAPIError as dbe:
        logger.error(f"Database error reading BBS user: {dbe.orig}")
        
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Error interno al procesar la solicitud en la base de datos.")
    