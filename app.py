# app.py
from fastapi import FastAPI, Request
from pydantic import BaseModel
from transformers import TextClassificationPipeline, DistilBertForSequenceClassification, DistilBertTokenizerFast
import torch
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your Vue frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and tokenizer
model = DistilBertForSequenceClassification.from_pretrained("./grooming_model")
tokenizer = DistilBertTokenizerFast.from_pretrained("./grooming_model")

pipe = TextClassificationPipeline(
    model=model,
    tokenizer=tokenizer,
    return_all_scores=True,
    device=0 if torch.cuda.is_available() else -1
)

# Define input schema
class MessageRequest(BaseModel):
    text: str

@app.post("/predict")
def predict_grooming(request: MessageRequest):
    scores = pipe(request.text)[0]
    grooming_score = next(score['score'] for score in scores if score['label'] == 'LABEL_1')

    if grooming_score < 0.35:
        risk = "SAFE"
        color = "green"
    elif grooming_score < 0.70:
        risk = "CAUTION"
        color = "orange"
    else:
        risk = "DANGER"
        color = "red"

    return {
        "score": round(grooming_score, 2),
        "label": risk,
        "color": color
    }
