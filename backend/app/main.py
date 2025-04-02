from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config.settings import get_settings
from .services.kit_service import KitSubscriberService
from .api import subscribers

app = FastAPI(title="Kit API Admin Panel")
settings = get_settings()

# Konfiguracja CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inicjalizacja serwisu
app.dependency_overrides[subscribers.SubscriberServiceInterface] = lambda: KitSubscriberService(settings)

# Routery
app.include_router(subscribers.router, prefix="/subscribers", tags=["subscribers"])

@app.get("/")
async def root():
    return {"message": "Witaj w API Kit Admin Panel"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"} 