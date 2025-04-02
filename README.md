# Kit API Admin Panel

Panel administracyjny do zarządzania subskrybentami i mailingami zintegrowany z API Kit.com.

## Wymagania

- Docker
- Docker Compose

## Instalacja i uruchomienie

1. Sklonuj repozytorium
2. Uruchom aplikację za pomocą Docker Compose:

```bash
docker-compose up --build
```

Aplikacja będzie dostępna pod następującymi adresami:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Dokumentacja API: http://localhost:8000/docs

## Struktura projektu

- `backend/` - Aplikacja FastAPI
- `frontend/` - Aplikacja React
- `docker-compose.yml` - Konfiguracja Docker Compose

## Funkcjonalności

- Zarządzanie subskrybentami
- Wysyłanie mailingów (broadcastów)
- Przeglądanie statystyk
- Segmentacja po tagach i działaniach 