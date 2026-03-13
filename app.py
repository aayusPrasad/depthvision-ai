from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import torch
from PIL import Image
import io
import base64
import cv2
import os
import gdown
import numpy as np

from model import DepthModel
from utils import preprocess_image, depth_to_colormap

app = FastAPI()

# -----------------------------
# CORS
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# CPU only
# -----------------------------
device = torch.device("cpu")
print("Using device:", device)

# -----------------------------
# Model path
# -----------------------------
MODEL_PATH = "best_depth_model.pth"
MODEL_URL = "https://drive.google.com/uc?id=1us5NNHFmdeQMJ25mH7Mbc1ZclwghWpzh"

# -----------------------------
# Download model only if missing
# -----------------------------
if not os.path.exists(MODEL_PATH):
    print("Downloading model...")
    try:
        gdown.download(MODEL_URL, MODEL_PATH, quiet=False)
        print("Model downloaded successfully")
    except Exception as e:
        print("Model download failed:", e)

# -----------------------------
# Load model once globally
# -----------------------------
model = None

try:
    model = DepthModel().to(device)

    state_dict = torch.load(
        MODEL_PATH,
        map_location=device
    )

    model.load_state_dict(state_dict)

    model.eval()

    del state_dict

    print("Model loaded successfully")

except Exception as e:
    print("Model loading failed:", e)

# -----------------------------
# Root route
# -----------------------------
@app.get("/")
def home():
    return {"message": "DepthVision backend running"}

# -----------------------------
# Prediction route
# -----------------------------
@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    try:

        if model is None:
            return {"error": "Model not loaded"}

        contents = await file.read()

        image = Image.open(io.BytesIO(contents)).convert("RGB")

        input_tensor = preprocess_image(image).to(device)

        with torch.no_grad():
            output = model(input_tensor)

        depth = output.squeeze().cpu().numpy()

        del output
        del input_tensor

        depth_colormap = depth_to_colormap(depth)

        success, buffer = cv2.imencode(".png", depth_colormap)

        if not success:
            return {"error": "Encoding failed"}

        depth_base64 = base64.b64encode(buffer).decode("utf-8")

        return {"depth_image": depth_base64}

    except Exception as e:
        print("Prediction error:", e)
        return {"error": str(e)}

# -----------------------------
# Hugging Face startup
# -----------------------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=7860)
