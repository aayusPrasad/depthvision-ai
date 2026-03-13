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
# Convert depth map to final heatmap
# -----------------------------
def depth_to_colormap(depth):

    # Tensor → numpy
    if isinstance(depth, torch.Tensor):
        depth = depth.squeeze().cpu().numpy()

    # Remove invalid values
    depth = np.nan_to_num(depth)

    # Strong normalization
    depth = depth - np.min(depth)

    if np.max(depth) != 0:
        depth = depth / np.max(depth)

    # Convert to uint8
    depth = (depth * 255).astype(np.uint8)

    # Contrast enhancement
    depth = cv2.equalizeHist(depth)

    # Heatmap coloring
    depth_color = cv2.applyColorMap(depth, cv2.COLORMAP_MAGMA)

    return depth_color
