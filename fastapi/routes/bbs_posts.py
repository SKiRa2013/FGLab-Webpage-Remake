import logging

from fastapi import APIRouter, HTTPException, Depends, status

from sqlalchemy import text
from sqlalchemy.engine import Connection
from sqlalchemy.exc import DBAPIError, IntegrityError

from config.db import get_db
from config.tripcode import parse_userdata

from models.bbs_posts import PostBbsPosts, BbsPostsResponse
from routes.bbs_users import authenticate_user

bbs = APIRouter()

logger = logging.getLogger(__name__)

################################################################################################################################

@bbs.post('/bbs/posts/', response_model=BbsPostsResponse, status_code=status.HTTP_201_CREATED)
def create_bbs_post(bbs_post: PostBbsPosts, db: Connection = Depends(get_db)):    
    try:
        user = authenticate_user(
            db=db,
            raw_name=bbs_post.author.name,
            email=bbs_post.author.email,
            password=bbs_post.author.password
        )
        
        query = text("""
            INSERT INTO bbs_posts (author, subject, message, url)
            VALUES (:user_id, :subject, :message, :url)
            RETURNING id, author, subject, message, url, created_at
        """)
        
        new_post = db.execute(query, {
            'user_id': user['id'],
            'subject': bbs_post.subject,
            'message': bbs_post.message,
            'url': bbs_post.url
        }).mappings().fetchone()
        
        db.commit()
        
        return {
            'id': new_post['id'],
            'author': {
                'id': user['id'],
                'name': user['name'],
                'email': user['email'],
                'tripcode': user['tripcode']
            },
            'subject': new_post['subject'],
            'message': new_post['message'],
            'url': new_post['url'],
            'created_at': new_post['created_at'],
        }
    
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

@bbs.get('/bbs/posts/', response_model=list[BbsPostsResponse], status_code=status.HTTP_200_OK)
def read_bbs_post(db: Connection = Depends(get_db)):
    try:
        query = text("""
            SELECT 
                p.id,
                p.subject,
                p.message,
                p.url,
                u.id AS user_id,
                u.name,
                u.email,
                u.tripcode,
                p.created_at
            FROM bbs_posts p INNER JOIN bbs_users u ON p.author = u.id
            ORDER BY p.id DESC
        """)

        posts = db.execute(query).mappings().all()
        
        return [
            {
                'id': post['id'],
                'author': {
                    'id': post['user_id'],
                    'name': post['name'],
                    'email': post['email'],
                    'tripcode': post['tripcode'],
                },
                'subject': post['subject'],
                'message': post['message'],
                'url': post['url'],
                'created_at': post['created_at'],
            }
            for post in posts
        ]

    except HTTPException as he:
        raise he
    
    except DBAPIError as dbe:
        logger.error(f"Database error fetching BBS posts: {dbe.orig}")
        
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error al obtener los mensajes del BBS."
        )
