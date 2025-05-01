from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import cv2
import numpy as np
import httpx
import io
from PIL import Image
import re

from transformers import (
    TextClassificationPipeline,
    DistilBertForSequenceClassification,
    DistilBertTokenizerFast,
    pipeline as hf_pipeline
)
import torch

# === App setup ===
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
<<<<<<< Updated upstream
    allow_origins=[
        "http://localhost:3007", 
        "http://localhost:8080", 
        "http://127.0.0.1:3007", 
        "http://127.0.0.1:8080",
        "https://shieldskills.live",
        "https://v1.shieldskills.live",
        "https://v2.shieldskills.live"
    ],
=======
    allow_origin_regex=".*",
>>>>>>> Stashed changes
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Accept", "Authorization"],
)

# === Helper Functions ===

def clean_chat_text(text):
    cleaned_lines = []
    for line in text.splitlines():
        line = line.strip()

        # Remove leading timestamp-like patterns (e.g., "13:43", "1343", "15.38")
        line = re.sub(r'^(?:\d{1,2}[:.]\d{2}|\d{3,4})\s*', '', line)

        # Remove leading labels like "TODAY", "YESTERDAY", etc. (case-insensitive)
        line = re.sub(r'^(today|yesterday)\s*[,:\-]*\s*', '', line, flags=re.IGNORECASE)

        # Remove trailing timestamp-like patterns + optional suffix (e.g., "1343 vi", "15:37 V/")
        line = re.sub(r'\s*\b\d{3,4}([:.]\d{2})?\s*\w{0,3}$', '', line)

        # Keep line if anything remains
        if line:
            cleaned_lines.append(line)

    return '\n'.join(cleaned_lines)


def remove_timestamps(text):
    cleaned_lines = []
    for line in text.splitlines():
        # Remove trailing time (e.g., 15:37, 9:02) and symbols like ' V/', ' vi', etc.
        line = re.sub(r'\b\d{1,2}[:.]\d{2}\b.*$', '', line)  # Remove time + anything after it
        cleaned_lines.append(line.strip())
    return '\n'.join(cleaned_lines)

def remove_inline_timestamps(text):
    return re.sub(r'(?<=[a-zA-Z])\d{3,4}(?=\s|$)', '', text)

def remove_lines_with_leading_numbers(text):
    cleaned_lines = []
    for line in text.splitlines():
        line = line.strip()
        line = re.sub(r'^\d{3,4}\s*', '', line)
        if line:
            cleaned_lines.append(line)
    return '\n'.join(cleaned_lines)

def fix_common_ocr_misreads(line):
    line = line.replace("’", "'").replace("‘", "'").replace("`", "'")
    line = re.sub(r"\bTve\b", "I've", line)
    line = re.sub(r"\bTll\b", "I'll", line)
    line = re.sub(r"\bTm\b", "I'm", line)
    line = re.sub(r"\bT\b", "I", line)
    line = re.sub(r"\blve\b", "I've", line)
    line = re.sub(r"\bl'm\b", "I'm", line)
    return line

def enhance_image_resolution(image_np, scale_factor=2.0):
    height, width = image_np.shape[:2]
    new_height, new_width = int(height * scale_factor), int(width * scale_factor)
    resized_img = cv2.resize(image_np, (new_width, new_height), interpolation=cv2.INTER_CUBIC)
    return resized_img

# === OCR.Space Integration ===

async def extract_text_with_ocr_space(image_bytes: bytes) -> str:
    ocr_api_url = "https://api.ocr.space/parse/image"
    api_key = "K86256411088957"  # Free test key

    data = {
        'language': 'eng',
        'isOverlayRequired': False
    }
    files = {
        'file': ('image.png', image_bytes, 'image/png')
    }

    async with httpx.AsyncClient() as client:
        data['apikey'] = api_key
        response = await client.post(ocr_api_url, data=data, files=files)
        result = response.json()
    
    print("OCR.space raw response:", result)
    
    if result.get("IsErroredOnProcessing"):
        raise Exception(result.get("ErrorMessage", "OCR.space API failed"))

    parsed_results = result.get("ParsedResults")
    if not parsed_results:
        return ""

    return parsed_results[0].get("ParsedText", "").strip()

# === API Endpoint ===

@app.post("/extract-text/")
async def extract_text_api(file: UploadFile = File(...), scale_factor: float = 2.0):
    try:
        contents = await file.read()

        try:
            image = Image.open(io.BytesIO(contents)).convert("RGB")
        except Exception as e:
            return JSONResponse(status_code=400, content={"error": f"Invalid image file: {str(e)}"})

        image_np = np.array(image)
        image_np = cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR)

        enhanced_image = enhance_image_resolution(image_np, scale_factor)
        _, buffer = cv2.imencode('.png', enhanced_image)
        image_bytes = buffer.tobytes()

        extracted_text = await extract_text_with_ocr_space(image_bytes)
        cleaned_text = clean_chat_text(extracted_text)
        corrected_text = remove_timestamps(cleaned_text)
        inlinecorrected_text = remove_lines_with_leading_numbers(corrected_text)
        final_text = fix_common_ocr_misreads(inlinecorrected_text)

        return JSONResponse(content={"text": final_text})

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": f"Server error: {str(e)}"})

# === Grooming Detection Setup ===

model = DistilBertForSequenceClassification.from_pretrained("./grooming_model")
tokenizer = DistilBertTokenizerFast.from_pretrained("./grooming_model")

pipe = TextClassificationPipeline(
    model=model,
    tokenizer=tokenizer,
    return_all_scores=True,
    device=0 if torch.cuda.is_available() else -1
)

class MessageRequest(BaseModel):
    text: str

@app.post("/predict")
def predict_grooming(request: MessageRequest):
    try:
        if not request.text or not isinstance(request.text, str):
            return {"error": "Invalid input: 'text' must be a non-empty string"}

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
    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        print(f"Error in predict_grooming: {str(e)}")
        print(f"Error details: {error_details}")
        return {"error": f"Analysis error: {str(e)}"}
