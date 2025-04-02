from abc import ABC, abstractmethod
import httpx
from fastapi import HTTPException
from typing import Dict, Any
from ..config.settings import Settings

class SubscriberServiceInterface(ABC):
    @abstractmethod
    async def get_subscribers(self) -> Dict[str, Any]:
        pass

class KitSubscriberService(SubscriberServiceInterface):
    def __init__(self, settings: Settings):
        self.api_key = settings.KIT_API_KEY
        self.base_url = settings.KIT_API_BASE_URL

    async def get_subscribers(self) -> Dict[str, Any]:
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(
                    f"{self.base_url}/subscribers",
                    headers={
                        "Accept": "application/json",
                        "X-Kit-Api-Key": self.api_key
                    }
                )
                response.raise_for_status()
                return response.json()
            except httpx.HTTPError as e:
                raise HTTPException(status_code=500, detail=f"Błąd podczas pobierania subskrybentów: {str(e)}")
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"Nieoczekiwany błąd: {str(e)}") 