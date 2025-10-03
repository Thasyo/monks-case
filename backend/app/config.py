from pydantic_settings import BaseSettings
from pydantic import Field
import os

class Settings(BaseSettings):
    
    DB_USER: str = Field(default='root')
    DB_PASSWORD: str
    DB_HOST: str = Field(default='localhost')
    DB_PORT: str = Field(default='3306')
    DB_NAME: str = Field(default='projeto_api')

    
    SECRET_KEY: str
    ALGORITHM: str = Field(default='HS256')
    ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(default=30)
    
    CORS_ORIGINS: str = Field(default="http://localhost:5173")
    
    class Config:
        env_file = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
        env_file_encoding = 'utf-8'

settings = Settings()