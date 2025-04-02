from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class Subscriber(BaseModel):
    id: int
    first_name: Optional[str] = None
    email_address: str
    state: str
    created_at: str
    tagged_at: Optional[str] = None
    fields: Dict[str, Any]
    referrer_utm_parameters: Optional[Dict[str, str]] = None

class Pagination(BaseModel):
    has_previous_page: bool
    has_next_page: bool
    start_cursor: Optional[str]
    end_cursor: Optional[str]
    per_page: int

class SubscribersResponse(BaseModel):
    subscribers: List[Subscriber]
    pagination: Pagination 