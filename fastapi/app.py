from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.labmem import labmem

api = FastAPI()
api.include_router(labmem)

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
