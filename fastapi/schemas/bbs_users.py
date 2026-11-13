from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import INTEGER, VARCHAR
from config.db import meta, engine

bbs_users_table = Table("bbs_users", meta,
    Column("id", INTEGER, primary_key=True),
    Column("name", VARCHAR(30), nullable=False, unique=True),
    Column("email", VARCHAR(30), nullable=True, default=""),
    Column("tripcode", VARCHAR(30), nullable=False, default="passwordnothashed")
)
