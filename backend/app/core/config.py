import os
from typing import List
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Study Blueprint"
    API_V1_STR: str = "/api/v1"
    
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    
    # MongoDB Atlas Settings
    MONGODB_URI: str = os.getenv("MONGODB_URI", "mongodb://localhost:27017/study_blueprint")
    MONGODB_DATABASE_NAME: str = os.getenv("MONGODB_DATABASE_NAME", "study_blueprint")
    
    # Google OAuth / Identity Services
    GOOGLE_CLIENT_ID: str = os.getenv("GOOGLE_CLIENT_ID", "")
    
    # Session Management
    APP_SESSION_SECRET: str = os.getenv("APP_SESSION_SECRET", "dev-secret-session-key-study-blueprint-32-chars-long")
    SESSION_ALGORITHM: str = "HS256"
    SESSION_EXPIRE_DAYS: int = 14
    
    # CORS
    CORS_ALLOWED_ORIGINS: str = os.getenv("CORS_ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000")
    
    # File Storage
    FILE_STORAGE_PROVIDER: str = os.getenv("FILE_STORAGE_PROVIDER", "local")
    FILE_STORAGE_LOCAL_DIR: str = os.getenv("FILE_STORAGE_LOCAL_DIR", "./storage/uploads")
    
    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ALLOWED_ORIGINS.split(",") if origin.strip()]

    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()
