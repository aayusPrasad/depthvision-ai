import torch
import numpy as np
import cv2
from torchvision import transforms

transform = transforms.Compose([
    transforms.Resize((224,224)),
    transforms.ToTensor()
])

def preprocess_image(image):

    img = transform(image)
    img = img.unsqueeze(0)

    return img


def depth_to_colormap(depth_tensor):

    depth = depth_tensor.squeeze().cpu().numpy()

    depth = cv2.normalize(depth,None,0,255,cv2.NORM_MINMAX)
    depth = depth.astype(np.uint8)

    depth_color = cv2.applyColorMap(depth,cv2.COLORMAP_MAGMA)

    return depth_color