from fastapi import FastAPI, APIRouter, HTTPException, Depends, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
import jwt
from pathlib import Path
from pydantic import BaseModel, Field
from typing import Optional
import uuid
from datetime import datetime, timezone, timedelta

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

ADMIN_JWT_SECRET = os.environ.get('ADMIN_JWT_SECRET', 'change-me-in-env')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'matrix360@2026')

class AdminLogin(BaseModel):
    password: str


def verify_admin(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Token requerido")
    try:
        jwt.decode(authorization[7:], ADMIN_JWT_SECRET, algorithms=["HS256"])
    except Exception:
        raise HTTPException(status_code=401, detail="Token inválido ou expirado")


app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


class ContactFormCreate(BaseModel):
    name: str
    email: str
    phone: str
    average_bill: str
    portability_expectations: Optional[str] = ""
    energy_pains: Optional[str] = ""
    city_state: Optional[str] = ""
    profession: Optional[str] = ""


class ContactLead(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    average_bill: str
    portability_expectations: str = ""
    energy_pains: str = ""
    city_state: str = ""
    profession: str = ""
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
                    <tr><td style="padding:10px;border-bottom:1px solid #222;color:#aaa;">Expectativas de Portabilidade</td>
                        <td style="padding:10px;border-bottom:1px solid #222;">{data.portability_expectations or 'N/A'}</td></tr>
                    <tr><td style="padding:10px;border-bottom:1px solid #222;color:#aaa;">Dores com Energia</td>
                        <td style="padding:10px;border-bottom:1px solid #222;">{data.energy_pains or 'N/A'}</td></tr>
                    <tr><td style="padding:10px;border-bottom:1px solid #222;color:#aaa;">Cidade / Estado</td>
                        <td style="padding:10px;border-bottom:1px solid #222;">{data.city_state or 'N/A'}</td></tr>
                    <tr><td style="padding:10px;color:#aaa;">Profissão</td>
                        <td style="padding:10px;">{data.profession or 'N/A'}</td></tr>
                </table>
                <p style="color:#555;font-size:12px;margin-top:24px;">
                    Recebido em {datetime.now(timezone.utc).strftime('%d/%m/%Y %H:%M')} UTC
                </p>
            </div>
            """
            params = {
                "from": SENDER_EMAIL,
                "to": ["contas@matrix360brasil.com.br"],
                "subject": f"Novo Lead: {data.name} - Matrix Energia 360",
                "html": html_content,
            }
            await asyncio.to_thread(resend_module.Emails.send, params)
            logger.info(f"Email sent for lead: {data.email}")
        except Exception as e:
            logger.error(f"Failed to send email: {e}")

    return {"status": "success", "message": "Solicitação recebida! Entraremos em contato em breve."}


@api_router.post("/admin/auth")
async def admin_auth(data: AdminLogin):
    if data.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Senha incorreta")
    token = jwt.encode(
        {"sub": "admin", "exp": datetime.now(timezone.utc) + timedelta(hours=24)},
        ADMIN_JWT_SECRET, algorithm="HS256"
    )
    return {"token": token}


@api_router.get("/admin/leads")
async def get_admin_leads(_=Depends(verify_admin)):
    leads = await db.contact_leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return leads


@api_router.get("/admin/stats")
async def get_admin_stats(_=Depends(verify_admin)):
    total = await db.contact_leads.count_documents({})
    week_ago = (datetime.now(timezone.utc) - timedelta(days=7)).isoformat()
    this_week = await db.contact_leads.count_documents({"created_at": {"$gte": week_ago}})
    today_start = datetime.now(timezone.utc).replace(hour=0, minute=0, second=0, microsecond=0).isoformat()
    today = await db.contact_leads.count_documents({"created_at": {"$gte": today_start}})
    return {"total": total, "this_week": this_week, "today": today}


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
