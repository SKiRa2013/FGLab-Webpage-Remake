from pydantic import BaseModel, Field
from typing import Optional

# from datetime import datetime

class BbsUserResponse(BaseModel):
    id: int
    name: str
    email: Optional[str] = None
    tripcode: str
    
    class Config:
        from_attributes = True

class PostBbsUser(BaseModel):
    name: str = Field(min_length=1, max_length=30)
    email: Optional[str] = None
    password: str = Field(min_length=8, max_length=8)
        
    # created_at: datetime = datetime.now()

"""
class UpdateBbsUser(BaseModel):
    name: Optional[str] = Field(min_length=1, max_length=30)
    email: Optional[str] = None
    password: Optional[str] = Field(min_length=8, max_length=8)
        
    # tripcode: str = Field(min_length=1, max_length=30)
    
    # created_at: datetime = datetime.now()
"""
