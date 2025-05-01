from fastapi import FastAPI, File, UploadFile, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import shutil, os, uuid
import cv2
import numpy as np
import easyocr
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
    allow_origins=["http://localhost:3007", "http://localhost:8080", "http://127.0.0.1:3007", "http://127.0.0.1:8080"],  # Explicitly list frontend origins
=======
    allow_origins=[
        "http://localhost:3007", 
        "http://localhost:8080", 
        "http://127.0.0.1:3007", 
        "http://127.0.0.1:8080",
        "http://shieldskills.live",
        "http://v1.shieldskills.live",
        "http://v2.shieldskills.live"
    ],
>>>>>>> Stashed changes
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Accept", "Authorization"],
)

# === Initialize OCR reader once ===
reader = easyocr.Reader(['en'])

# === Helper Functions ===

def remove_timestamps(text):
    # Split into lines
    lines = text.splitlines()
    cleaned_lines = []
    for line in lines:
        # Remove line if it matches something like "15.38", "9:12", etc. (even with small words after)
        if re.match(r'^\s*\d{1,2}[.:*]\d{2}(?:\s*\w*)?\s*$', line.strip()):
            continue
        cleaned_lines.append(line)
    return '\n'.join(cleaned_lines)

def remove_inline_timestamps(text):
    # Remove 3 or 4 digit numbers that are directly attached to letters (no space)
    cleaned_text = re.sub(r'(?<=[a-zA-Z])\d{3,4}(?=\s|$)', '', text)
    return cleaned_text

def remove_lines_with_leading_numbers(text):
    cleaned_lines = []
    for line in text.splitlines():
        line = line.strip()
        # If line starts with a 3-4 digit number (e.g., 1344 vi)
        line = re.sub(r'^\d{3,4}\s*', '', line)
        if line:  # keep only if something remains
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

def extract_text_with_easyocr(image_np):
    results = reader.readtext(image_np)
    results.sort(key=lambda x: (x[0][0][1] + x[0][2][1]) / 2)
    extracted_texts = [text for bbox, text, conf in results if conf > 0.2]
    return '\n'.join(extracted_texts)

# === API Endpoint ===

@app.post("/extract-text/")
async def extract_text_api(file: UploadFile = File(...), scale_factor: float = 2.0):
    try:
        # Read file bytes
        contents = await file.read()

        # Try opening with PIL
        try:
            image = Image.open(io.BytesIO(contents)).convert("RGB")
        except Exception as e:
            return JSONResponse(status_code=400, content={"error": f"Invalid image file: {str(e)}"})

        # Convert to OpenCV format
        image_np = np.array(image)
        image_np = cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR)

        # Enhance resolution
        enhanced_image = enhance_image_resolution(image_np, scale_factor)

        # Extract text
        extracted_text = extract_text_with_easyocr(enhanced_image)

        # Correct Extracted Text
        corrected_text = remove_timestamps(extracted_text)
        print(corrected_text)
        
        # Then remove inline timestamps
        inlinecorrected_text = remove_lines_with_leading_numbers(corrected_text)

        # Correct Extracted Text
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
        # Add input validation
        if not request.text or not isinstance(request.text, str):
            return {"error": "Invalid input: 'text' must be a non-empty string"}
            
        # Model prediction
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
        # Log the detailed error
        import traceback
        error_details = traceback.format_exc()
        print(f"Error in predict_grooming: {str(e)}")
        print(f"Error details: {error_details}")
        # Return more helpful error message
        return {"error": f"Analysis error: {str(e)}"}
