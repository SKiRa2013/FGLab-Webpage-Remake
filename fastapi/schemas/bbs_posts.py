from sqlalchemy import Table, Column, ForeignKey
from sqlalchemy.sql.sqltypes import INTEGER, VARCHAR, TIMESTAMP
from config.db import meta, engine

bbs_posts_table = Table("bbs_posts", meta,
    Column("id", INTEGER, primary_key=True),
    Column("author", INTEGER, ForeignKey("bbs_users.id"), nullable=False),
    Column("subject", VARCHAR(30), nullable=False, default=""),
    Column("message", VARCHAR(200), nullable=False, default=""),
    Column("url", VARCHAR(30), nullable=True, default=""),
    Column("created_at", TIMESTAMP, nullable=False, default="1970-01-01 00:00:00"),
)
