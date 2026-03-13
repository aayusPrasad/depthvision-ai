import torch
import numpy as np
import cv2
from torchvision import transforms

# -----------------------------
# Image preprocessing
# -----------------------------
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor()
])

def preprocess_image(image):

    img = transform(image)

    img = img.unsqueeze(0)

    return img

# -----------------------------
# Convert depth map to colormap
# -----------------------------
def depth_to_colormap(depth):

    # If tensor comes accidentally, convert safely
    if isinstance(depth, torch.Tensor):
        depth = depth.squeeze().cpu().numpy()

    # Normalize depth
    depth = cv2.normalize(depth, None, 0, 255, cv2.NORM_MINMAX)

    # Convert to uint8
    depth = depth.astype(np.uint8)

    # Apply color map
    depth_color = cv2.applyColorMap(depth, cv2.COLORMAP_MAGMA)

    return depth_color