from sqlalchemy import Column, String, Integer
from app.db import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(255))
    password = Column(String(255))
    role = Column(String(100), default="user")
    email = Column(String(255))
