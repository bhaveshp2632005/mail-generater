"""FastAPI route handlers for MailGenie AI."""
import os

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

import ai_service
from schemas import (
    EmailResponse,
    GenerateEmailRequest,
    GenerateReplyRequest,
    HealthResponse,
    ImproveEmailRequest,
)

app = FastAPI(title="MailGenie AI API", version="1.0.0")

# Local Vite dev servers plus any production URLs from FRONTEND_URL (comma separated).
origins = ["http://localhost:5173", "http://127.0.0.1:5173"]
origins += [u.strip().rstrip("/") for u in os.getenv("FRONTEND_URL", "").split(",") if u.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


@app.exception_handler(ai_service.AIServiceError)
async def ai_error_handler(_: Request, exc: ai_service.AIServiceError):
    return JSONResponse(status_code=exc.status_code, content={"detail": exc.message})


@app.get("/api/health", response_model=HealthResponse)
def health():
    return HealthResponse(
        status="ok",
        model=ai_service.get_model(),
        api_key_configured=ai_service.api_key_configured(),
    )


@app.post("/api/generate-email", response_model=EmailResponse)
def generate_email(req: GenerateEmailRequest):
    return ai_service.generate_email(
        req.purpose, req.category, req.tone, req.length, req.recipient_name, req.sender_name
    )


@app.post("/api/generate-reply", response_model=EmailResponse)
def generate_reply(req: GenerateReplyRequest):
    return ai_service.generate_reply(
        req.received_email, req.reply_intent, req.tone, req.length, req.sender_name
    )


@app.post("/api/improve-email", response_model=EmailResponse)
def improve_email(req: ImproveEmailRequest):
    return ai_service.improve_email(req.email, req.goals)
