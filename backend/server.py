from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '').strip()
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
RESEND_ENABLED = False

if RESEND_API_KEY:
    try:
        import resend as resend_module
        resend_module.api_key = RESEND_API_KEY
        RESEND_ENABLED = True
    except ImportError:
        pass

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


class ContactFormCreate(BaseModel):
    name: str
    email: str
    phone: str
    average_bill: str
    message: Optional[str] = ""


class ContactLead(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    average_bill: str
    message: str = ""
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


@api_router.get("/")
async def root():
    return {"message": "Matrix Energia 360 API"}


@api_router.post("/contact")
async def submit_contact(data: ContactFormCreate):
    lead = ContactLead(**data.model_dump())
    doc = lead.model_dump()
    await db.contact_leads.insert_one(doc)

    if RESEND_ENABLED:
        try:
            import resend as resend_module
            html_content = f"""
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0A0A0A;color:#fff;padding:32px;">
                <div style="background:#FF6B00;padding:16px 24px;margin-bottom:24px;">
                    <h2 style="margin:0;color:#000;font-size:20px;">Novo Lead - Matrix Energia 360</h2>
                </div>
                <table style="width:100%;border-collapse:collapse;font-size:14px;">
                    <tr><td style="padding:10px;border-bottom:1px solid #222;color:#aaa;">Nome</td>
                        <td style="padding:10px;border-bottom:1px solid #222;">{data.name}</td></tr>
                    <tr><td style="padding:10px;border-bottom:1px solid #222;color:#aaa;">Email</td>
                        <td style="padding:10px;border-bottom:1px solid #222;">{data.email}</td></tr>
                    <tr><td style="padding:10px;border-bottom:1px solid #222;color:#aaa;">Telefone</td>
                        <td style="padding:10px;border-bottom:1px solid #222;">{data.phone}</td></tr>
                    <tr><td style="padding:10px;border-bottom:1px solid #222;color:#aaa;">Conta Média</td>
                        <td style="padding:10px;border-bottom:1px solid #222;">R$ {data.average_bill}</td></tr>
                    <tr><td style="padding:10px;color:#aaa;">Mensagem</td>
                        <td style="padding:10px;">{data.message or 'N/A'}</td></tr>
                </table>
                <p style="color:#555;font-size:12px;margin-top:24px;">
                    Recebido em {datetime.now(timezone.utc).strftime('%d/%m/%Y %H:%M')} UTC
                </p>
            </div>
            """
            params = {
                "from": SENDER_EMAIL,
                "to": ["contas@matrixenergia360.com.br"],
                "subject": f"Novo Lead: {data.name} - Matrix Energia 360",
                "html": html_content,
            }
            await asyncio.to_thread(resend_module.Emails.send, params)
            logger.info(f"Email sent for lead: {data.email}")
        except Exception as e:
            logger.error(f"Failed to send email: {e}")

    return {"status": "success", "message": "Solicitação recebida! Entraremos em contato em breve."}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
