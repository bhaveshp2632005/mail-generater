"""Pydantic request and response schemas for MailGenie AI."""
from typing import List, Literal, Optional

from pydantic import BaseModel, Field, field_validator

Category = Literal[
    "Professional", "Academic", "Leave Application", "Job Application",
    "Follow-up", "Complaint", "Thank You", "General",
]
Tone = Literal["Formal", "Friendly", "Polite", "Persuasive"]
Length = Literal["Short", "Medium", "Detailed"]
ImproveGoal = Literal[
    "Fix grammar", "Make professional", "Make shorter", "Make clearer", "Make friendlier",
]


class StrippedModel(BaseModel):
    """Trims whitespace from every string field before validation."""

    @field_validator("*", mode="before")
    @classmethod
    def _strip(cls, value):
        return value.strip() if isinstance(value, str) else value


class GenerateEmailRequest(StrippedModel):
    purpose: str = Field(..., min_length=5, max_length=4000)
    category: Category = "General"
    tone: Tone = "Formal"
    length: Length = "Medium"
    recipient_name: Optional[str] = Field(None, max_length=100)
    sender_name: Optional[str] = Field(None, max_length=100)


class GenerateReplyRequest(StrippedModel):
    received_email: str = Field(..., min_length=5, max_length=8000)
    reply_intent: str = Field(..., min_length=3, max_length=2000)
    tone: Tone = "Polite"
    length: Length = "Medium"
    sender_name: Optional[str] = Field(None, max_length=100)


class ImproveEmailRequest(StrippedModel):
    email: str = Field(..., min_length=5, max_length=8000)
    goals: List[ImproveGoal] = Field(
        default_factory=lambda: ["Fix grammar", "Make professional"], min_length=1
    )


class EmailResponse(BaseModel):
    subject: str
    body: str
    model: str


class HealthResponse(BaseModel):
    status: str
    model: str
    api_key_configured: bool
