from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

from models.bbs_users import PostBbsUser, BbsUserResponse

class PostBbsPosts(BaseModel):
    author: PostBbsUser
    subject: str = Field(min_length=1, max_length=30)
    message: str = Field(min_length=1, max_length=200)
    url: Optional[str] = None
    created_at: datetime = datetime.now()

class BbsPostsResponse(BaseModel):
    id: int
    author: BbsUserResponse
    subject: str
    message: str
    url: Optional[str] = None
    created_at: datetime = datetime.now()
    
    class Config:
        from_attributes = True

"""
class UpdateBbsPosts(BaseModel):
    subject: Optional[str] = Field(min_length=1, max_length=30)
    message: Optional[str] = Field(min_length=1, max_length=200)
    url: Optional[str] = None
    
    # created_at: datetime = datetime.now()
"""
