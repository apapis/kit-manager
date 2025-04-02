from fastapi import APIRouter, Depends
from ..models.subscriber import SubscribersResponse
from ..services.kit_service import SubscriberServiceInterface
from ..config.settings import get_settings

router = APIRouter()

@router.get("/", response_model=SubscribersResponse)
async def get_subscribers(
    subscriber_service: SubscriberServiceInterface = Depends()
):
    return await subscriber_service.get_subscribers() 