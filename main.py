from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import torch
from PIL import Image
import io
import base64
import cv2
import os
import gdown

from model import DepthModel
from utils import preprocess_image, depth_to_colormap

app = FastAPI()

# -----------------------------
# CORS (allow frontend access)
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Device selection
# -----------------------------
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print("Using device:", device)

# -----------------------------
# Model configuration
# -----------------------------
MODEL_PATH = "best_depth_model.pth"
MODEL_URL = "https://drive.google.com/uc?id=1us5NNHFmdeQMJ25mH7Mbc1ZclwghWpzh"

# -----------------------------
# Download model if not present
# -----------------------------
if not os.path.exists(MODEL_PATH):
    print("Model not found. Downloading...")
    try:
        gdown.download(MODEL_URL, MODEL_PATH, quiet=False)
        print("Model downloaded successfully")
    except Exception as e:
        print("Model download failed:", e)

# -----------------------------
# Load model
# -----------------------------
try:
    model = DepthModel().to(device)

    state_dict = torch.load(MODEL_PATH, map_location=device)
    model.load_state_dict(state_dict)

    model.eval()

    print("Model loaded successfully")

except Exception as e:
    print("Model loading failed:", e)

# -----------------------------
# Debug: show files in server
# -----------------------------
print("Files in server directory:", os.listdir())

# -----------------------------
# Test route
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

        contents = await file.read()

        image = Image.open(io.BytesIO(contents)).convert("RGB")

        input_tensor = preprocess_image(image).to(device)

        with torch.no_grad():
            output = model(input_tensor)

        depth_colormap = depth_to_colormap(output)

        success, buffer = cv2.imencode(".png", depth_colormap)

        if not success:
            return {"error": "Failed to encode image"}

        depth_base64 = base64.b64encode(buffer.tobytes()).decode("utf-8")

        return {"depth_image": depth_base64}

    except Exception as e:
        print("Prediction error:", e)
        return {"error": str(e)}
