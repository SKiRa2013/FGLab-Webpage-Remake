from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config.db import meta, engine
import schemas.bbs_posts, schemas.bbs_users, schemas.labmem

from routes.labmem import labmem
from routes.bbs_users import bbs as bbs_users
from routes.bbs_posts import bbs as bbs_posts

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Se ejecuta una sola vez al levantar el servidor (después de que Postgres está healthy)
    
    meta.create_all(engine)
    yield


api = FastAPI(lifespan=lifespan)
api.include_router(labmem)
api.include_router(bbs_users)
api.include_router(bbs_posts)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

api.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)
