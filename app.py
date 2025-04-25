from fastapi import FastAPI, File, UploadFile, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import shutil, os, uuid
import cv2
import numpy as np
import easyocr
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
    allow_origins=["http://localhost:3007", "http://localhost:8080", "http://127.0.0.1:3007", "http://127.0.0.1:8080"],  # Explicitly list frontend origins
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Accept", "Authorization"],
)

# === OCR Setup ===
# Initialize with English, and specify GPU usage if available
ocr_reader = easyocr.Reader(['en'], gpu=torch.cuda.is_available())

# === Grammar Correction Setup ===
grammar_corrector = hf_pipeline("text2text-generation", model="vennify/t5-base-grammar-correction")

def clean_ocr_text(lines):
    """
    Remove time-like values from OCR output (e.g., 14:06, 12.45)
    """
    time_pattern = re.compile(r'\b\d{1,2}[:.]\d{2}\b', re.IGNORECASE)
    return [line for line in lines if not time_pattern.search(line)]

def correct_text(text):
    """
    Run grammar correction on OCR output.
    """
    try:
        # Skip grammar correction if text is empty or too short
        if not text or len(text.strip()) < 5:
            print(f"Text too short for grammar correction: '{text}'")
            return text
            
        print(f"Running grammar correction on text: '{text[:50]}...'")
        result = grammar_corrector(text, max_length=256, do_sample=False)
        corrected = result[0]['generated_text'].strip()
        print(f"Grammar correction result: '{corrected[:50]}...'")
        return corrected
    except Exception as e:
        print(f"Error in grammar correction: {str(e)}")
        # Return original text if grammar correction fails
        return text

def fix_common_ocr_misreads(line):
    line = line.replace("'","'").replace("'","'").replace("`","'")
    line = re.sub(r"\bTve\b", "I've", line)
    line = re.sub(r"\bTll\b", "I'll", line)
    line = re.sub(r"\bTm\b", "I'm", line)
    line = re.sub(r"\bT\b", "I", line)
    line = re.sub(r"\blve\b", "I've", line)
    line = re.sub(r"\bl'm\b", "I'm", line)
    return line

# Add image preprocessing function
def preprocess_image(img):
    """
    Preprocess image to improve OCR results
    """
    # Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Apply adaptive thresholding
    thresh = cv2.adaptiveThreshold(
        gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
        cv2.THRESH_BINARY, 11, 2
    )
    
    # Apply some blur to reduce noise
    blur = cv2.GaussianBlur(thresh, (3, 3), 0)
    
    # Apply dilation to make text more visible
    kernel = np.ones((1, 1), np.uint8)
    dilated = cv2.dilate(blur, kernel, iterations=1)
    
    return dilated

@app.post("/extract-text/")
async def extract_text(file: UploadFile = File(...)):
    temp_filename = f"temp_{uuid.uuid4().hex}.jpg"
    enhanced_filename = f"enhanced_{uuid.uuid4().hex}.jpg"
    
    try:
        # Save uploaded file
        with open(temp_filename, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Read image
        img = cv2.imread(temp_filename)
        if img is None:
            return {"error": "Could not read image file", "text": ""}
        
        # Get original image dimensions for debugging
        original_height, original_width = img.shape[:2]
        print(f"Original image dimensions: {original_width}x{original_height}")
            
        # Enhance resolution (scale up)
        img_resized = cv2.resize(img, None, fx=2.0, fy=2.0, interpolation=cv2.INTER_CUBIC)
        
        # Try different preprocessing approaches
        preprocessed = preprocess_image(img_resized)
        
        # Save enhanced image for debugging
        cv2.imwrite(enhanced_filename, preprocessed)
        print(f"Saved enhanced image to {enhanced_filename}")

        # Try OCR on both original and preprocessed images
        print(f"Running OCR on original image...")
        results_original = ocr_reader.readtext(img_resized)
        print(f"OCR results count (original): {len(results_original)}")
        
        print(f"Running OCR on preprocessed image...")
        results_preprocessed = ocr_reader.readtext(preprocessed)
        print(f"OCR results count (preprocessed): {len(results_preprocessed)}")
        
        # Use whichever gave more results
        if len(results_preprocessed) > len(results_original):
            print("Using preprocessed image results")
            results = results_preprocessed
        else:
            print("Using original image results")
            results = results_original
        
        # Extract text with confidence > 0.2
        raw_lines = [text for _, text, conf in results if conf > 0.2]
        print(f"Raw lines after confidence filter: {len(raw_lines)}")
        print(f"Raw text: {raw_lines}")

        # If no text was detected, return early
        if not raw_lines:
            print("No text detected in image")
            return {"text": ""}

        # Remove time-like values
        filtered_lines = clean_ocr_text(raw_lines)
        extracted_text = "\n".join(filtered_lines)
        print(f"Extracted text: '{extracted_text}'")

        # Grammar correction - only if we have enough text
        if len(extracted_text.strip()) > 5:
            corrected_text = correct_text(extracted_text)
            final_corrected_text = fix_common_ocr_misreads(corrected_text)
        else:
            print("Text too short for corrections, using raw text")
            final_corrected_text = extracted_text

        print(f"Final text: '{final_corrected_text}'")
        return { "text": final_corrected_text }

    except Exception as e:
        print(f"Error in extract_text: {str(e)}")
        import traceback
        traceback.print_exc()
        return { "error": str(e), "text": "" }

    finally:
        # Clean up temporary files
        for filename in [temp_filename, enhanced_filename]:
            if os.path.exists(filename):
                try:
                    os.remove(filename)
                except Exception as e:
                    print(f"Error removing temporary file {filename}: {e}")

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
