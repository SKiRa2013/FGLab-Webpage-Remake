from pydantic import BaseModel, Field
from typing import Text, Optional

from datetime import datetime

class PostLabMem(BaseModel):
    name: str = Field(min_length=6, max_length=30)
    alias: str = Field(min_length=1, max_length=30)
    age: int
    dob: datetime = Field(pattern=r"^\d{4}-\d{2}-\d{2}$", description="Date of Birth in YYYY-MM-DD format")
    description: Text | None = ""
    img: str = Field(pattern=r"^[a-zA-Z0-9_-]+.\.(jpg|jpeg|png|gif|webp)$", description="Image path must be a valid path ending with .jpg, .jpeg, .png, .gif or .webp")

    # created_at: datetime = datetime.now()

class UpdateLabMem(BaseModel):
    name: Optional[str] = None
    alias: Optional[str] = None
    age: Optional[int] = None
    dob: Optional[datetime] = None
    description: Optional[Text] = None
    img: Optional[str] = None

    # created_at: datetime = datetime.now()
