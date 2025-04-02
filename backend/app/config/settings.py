from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    KIT_API_KEY: str
    KIT_API_BASE_URL: str
    FRONTEND_URL: str

    class Config:
        env_file = ".env"

@lru_cache()
def get_settings() -> Settings:
    return Settings() 