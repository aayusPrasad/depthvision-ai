from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import torch
from PIL import Image
import io
import base64
import cv2

from model import DepthModel
from utils import preprocess_image, depth_to_colormap

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

model = DepthModel().to(device)
model.load_state_dict(torch.load("best_depth_model.pth", map_location=device))
model.eval()


@app.get("/")
def home():
    return {"message":"DepthVision backend running"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    contents = await file.read()

    image = Image.open(io.BytesIO(contents)).convert("RGB")

    input_tensor = preprocess_image(image).to(device)

    with torch.no_grad():
        output = model(input_tensor)

    depth_colormap = depth_to_colormap(output)

    _, buffer = cv2.imencode('.png', depth_colormap)

    depth_base64 = base64.b64encode(buffer).decode("utf-8")

    return {"depth_image": depth_base64}