from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict
import uuid
from datetime import datetime, timezone, timedelta
import secrets
import string

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Stripe Integration
from emergentintegrations.payments.stripe.checkout import (
    StripeCheckout, 
    CheckoutSessionResponse, 
    CheckoutStatusResponse, 
    CheckoutSessionRequest
)

stripe_api_key = os.environ.get('STRIPE_API_KEY')

# Create the main app
app = FastAPI(title="IXLPro API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Pricing Plans - Server-side only (security)
PRICING_PLANS = {
    "day_key": {
        "name": "Day Key",
        "price": 2.50,
        "duration_days": 1,
        "badge": "Most Affordable",
        "description": "Perfect for quick access and trying us out with minimal cost."
    },
    "week_key": {
        "name": "Week Key",
        "price": 10.00,
        "duration_days": 7,
        "badge": "Trial Pack",
        "description": "Extend your access and save compared to Day Keys."
    },
    "month_key": {
        "name": "Month Key",
        "price": 25.00,
        "duration_days": 30,
        "badge": "Most Popular",
        "description": "Best for regular users who want to enjoy uninterrupted access."
    },
    "3_month_key": {
        "name": "3 Month Key",
        "price": 50.00,
        "duration_days": 90,
        "badge": "Semester Pack",
        "description": "Great for long-term projects or consistent use over months."
    },
    "year_key": {
        "name": "Year Key",
        "price": 100.00,
        "duration_days": 365,
        "badge": "Best Value",
        "description": "Enjoy uninterrupted access and save more with an annual plan."
    },
    "service_key": {
        "name": "Service Key",
        "price": 120.00,
        "duration_days": 365,
        "badge": "Bulk Savings",
        "description": "Perfect for business needs or sharing access across users."
    }
}

# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class CheckoutRequest(BaseModel):
    plan_id: str
    origin_url: str
    email: Optional[str] = None

class LicenseKey(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    key: str
    email: Optional[str] = None
    plan_id: str
    plan_name: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    expires_at: datetime
    is_active: bool = True
    session_id: str

class KeyValidationRequest(BaseModel):
    key: str

class KeyValidationResponse(BaseModel):
    valid: bool
    message: str
    plan_name: Optional[str] = None
    expires_at: Optional[str] = None

class StatsResponse(BaseModel):
    users: int
    questions_answered: int
    discord_members: int

# Helper function to generate license key
def generate_license_key():
    """Generate a unique license key in format: IXLP-XXXX-XXXX-XXXX-XXXX"""
    chars = string.ascii_uppercase + string.digits
    segments = [''.join(secrets.choice(chars) for _ in range(4)) for _ in range(4)]
    return f"IXLP-{'-'.join(segments)}"

# Routes
@api_router.get("/")
async def root():
    return {"message": "IXLPro API v1.0"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "services": "online"}

# Stats endpoint
@api_router.get("/stats", response_model=StatsResponse)
async def get_stats():
    """Get platform statistics"""
    # Get actual counts from database
    users_count = await db.license_keys.count_documents({})
    # Simulated stats with base numbers + actual users
    return StatsResponse(
        users=6360 + users_count,
        questions_answered=268976645,
        discord_members=54492
    )

# Pricing endpoints
@api_router.get("/pricing")
async def get_pricing():
    """Get all pricing plans"""
    return {"plans": PRICING_PLANS}

# Stripe Checkout endpoints
@api_router.post("/checkout/create")
async def create_checkout_session(request: CheckoutRequest, http_request: Request):
    """Create a Stripe checkout session for a pricing plan"""
    if request.plan_id not in PRICING_PLANS:
        raise HTTPException(status_code=400, detail="Invalid plan selected")
    
    plan = PRICING_PLANS[request.plan_id]
    
    # Build URLs from provided origin
    success_url = f"{request.origin_url}/payment/success?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{request.origin_url}/payment/cancel"
    
    # Initialize Stripe checkout
    host_url = str(http_request.base_url)
    webhook_url = f"{host_url}api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=stripe_api_key, webhook_url=webhook_url)
    
    # Create checkout session
    checkout_request = CheckoutSessionRequest(
        amount=plan["price"],
        currency="usd",
        success_url=success_url,
        cancel_url=cancel_url,
        metadata={
            "plan_id": request.plan_id,
            "plan_name": plan["name"],
            "email": request.email or "",
            "source": "ixlpro_checkout"
        }
    )
    
    session: CheckoutSessionResponse = await stripe_checkout.create_checkout_session(checkout_request)
    
    # Create payment transaction record
    transaction_doc = {
        "id": str(uuid.uuid4()),
        "session_id": session.session_id,
        "plan_id": request.plan_id,
        "plan_name": plan["name"],
        "amount": plan["price"],
        "currency": "usd",
        "email": request.email,
        "payment_status": "pending",
        "status": "initiated",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "metadata": checkout_request.metadata
    }
    await db.payment_transactions.insert_one(transaction_doc)
    
    return {"url": session.url, "session_id": session.session_id}

@api_router.get("/checkout/status/{session_id}")
async def get_checkout_status(session_id: str, http_request: Request):
    """Get checkout session status and generate license key if paid"""
    host_url = str(http_request.base_url)
    webhook_url = f"{host_url}api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=stripe_api_key, webhook_url=webhook_url)
    
    checkout_status: CheckoutStatusResponse = await stripe_checkout.get_checkout_status(session_id)
    
    # Update transaction in database
    transaction = await db.payment_transactions.find_one(
        {"session_id": session_id},
        {"_id": 0}
    )
    
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    
    # Update status
    await db.payment_transactions.update_one(
        {"session_id": session_id},
        {"$set": {
            "payment_status": checkout_status.payment_status,
            "status": checkout_status.status,
            "updated_at": datetime.now(timezone.utc).isoformat()
        }}
    )
    
    result = {
        "status": checkout_status.status,
        "payment_status": checkout_status.payment_status,
        "amount_total": checkout_status.amount_total,
        "currency": checkout_status.currency
    }
    
    # If payment is successful, check if we already generated a key
    if checkout_status.payment_status == "paid":
        existing_key = await db.license_keys.find_one(
            {"session_id": session_id},
            {"_id": 0}
        )
        
        if existing_key:
            result["license_key"] = existing_key["key"]
            result["expires_at"] = existing_key["expires_at"]
        else:
            # Generate new license key
            plan_id = checkout_status.metadata.get("plan_id", "day_key")
            plan = PRICING_PLANS.get(plan_id, PRICING_PLANS["day_key"])
            
            license_key = generate_license_key()
            expires_at = datetime.now(timezone.utc) + timedelta(days=plan["duration_days"])
            
            key_doc = {
                "id": str(uuid.uuid4()),
                "key": license_key,
                "email": checkout_status.metadata.get("email"),
                "plan_id": plan_id,
                "plan_name": plan["name"],
                "created_at": datetime.now(timezone.utc).isoformat(),
                "expires_at": expires_at.isoformat(),
                "is_active": True,
                "session_id": session_id
            }
            await db.license_keys.insert_one(key_doc)
            
            result["license_key"] = license_key
            result["expires_at"] = expires_at.isoformat()
    
    return result

# Webhook endpoint
@api_router.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    """Handle Stripe webhooks"""
    body = await request.body()
    signature = request.headers.get("Stripe-Signature")
    
    host_url = str(request.base_url)
    webhook_url = f"{host_url}api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=stripe_api_key, webhook_url=webhook_url)
    
    try:
        webhook_response = await stripe_checkout.handle_webhook(body, signature)
        
        # Update transaction based on webhook
        if webhook_response.session_id:
            await db.payment_transactions.update_one(
                {"session_id": webhook_response.session_id},
                {"$set": {
                    "payment_status": webhook_response.payment_status,
                    "webhook_event_type": webhook_response.event_type,
                    "webhook_received_at": datetime.now(timezone.utc).isoformat()
                }}
            )
        
        return {"status": "success"}
    except Exception as e:
        logging.error(f"Webhook error: {e}")
        return {"status": "error", "message": str(e)}

# License Key validation endpoint (for Tampermonkey script)
@api_router.post("/validate-key", response_model=KeyValidationResponse)
async def validate_license_key(request: KeyValidationRequest):
    """Validate a license key (used by the Tampermonkey script)"""
    key_doc = await db.license_keys.find_one(
        {"key": request.key},
        {"_id": 0}
    )
    
    if not key_doc:
        return KeyValidationResponse(
            valid=False,
            message="Invalid license key"
        )
    
    if not key_doc.get("is_active", False):
        return KeyValidationResponse(
            valid=False,
            message="License key has been deactivated"
        )
    
    # Check expiration
    expires_at = datetime.fromisoformat(key_doc["expires_at"].replace('Z', '+00:00'))
    if datetime.now(timezone.utc) > expires_at:
        return KeyValidationResponse(
            valid=False,
            message="License key has expired"
        )
    
    return KeyValidationResponse(
        valid=True,
        message="License key is valid",
        plan_name=key_doc.get("plan_name"),
        expires_at=key_doc.get("expires_at")
    )

# Get key by email (for Discord bot integration)
@api_router.get("/keys/by-email/{email}")
async def get_keys_by_email(email: str):
    """Get license keys by email"""
    keys = await db.license_keys.find(
        {"email": email},
        {"_id": 0}
    ).to_list(100)
    return {"keys": keys}

# Legacy status endpoints
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
