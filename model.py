import torch
import torch.nn as nn

class DepthModel(nn.Module):

    def __init__(self):
        super().__init__()

        # Encoder
        self.enc1 = nn.Sequential(
            nn.Conv2d(3,64,3,padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(),
            nn.Conv2d(64,64,3,padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU()
        )

        self.enc2 = nn.Sequential(
            nn.Conv2d(64,128,3,stride=2,padding=1),
            nn.BatchNorm2d(128),
            nn.ReLU(),
            nn.Conv2d(128,128,3,padding=1),
            nn.BatchNorm2d(128),
            nn.ReLU()
        )

        self.enc3 = nn.Sequential(
            nn.Conv2d(128,256,3,stride=2,padding=1),
            nn.BatchNorm2d(256),
            nn.ReLU(),
            nn.Conv2d(256,256,3,padding=1),
            nn.BatchNorm2d(256),
            nn.ReLU()
        )

        self.enc4 = nn.Sequential(
            nn.Conv2d(256,512,3,stride=2,padding=1),
            nn.BatchNorm2d(512),
            nn.ReLU(),
            nn.Conv2d(512,512,3,padding=1),
            nn.BatchNorm2d(512),
            nn.ReLU()
        )

        # Decoder
        self.up3 = nn.ConvTranspose2d(512,256,2,stride=2)

        self.dec3 = nn.Sequential(
            nn.Conv2d(512,256,3,padding=1),
            nn.BatchNorm2d(256),
            nn.ReLU(),
            nn.Conv2d(256,256,3,padding=1),
            nn.BatchNorm2d(256),
            nn.ReLU()
        )

        self.up2 = nn.ConvTranspose2d(256,128,2,stride=2)

        self.dec2 = nn.Sequential(
            nn.Conv2d(256,128,3,padding=1),
            nn.BatchNorm2d(128),
            nn.ReLU(),
            nn.Conv2d(128,128,3,padding=1),
            nn.BatchNorm2d(128),
            nn.ReLU()
        )

        self.up1 = nn.ConvTranspose2d(128,64,2,stride=2)

        self.dec1 = nn.Sequential(
            nn.Conv2d(128,64,3,padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(),
            nn.Conv2d(64,64,3,padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU()
        )

        self.final = nn.Conv2d(64,1,1)

    def forward(self,x):

        x1 = self.enc1(x)
        x2 = self.enc2(x1)
        x3 = self.enc3(x2)
        x4 = self.enc4(x3)

        x = self.up3(x4)
        x = torch.cat([x,x3],dim=1)
        x = self.dec3(x)

        x = self.up2(x)
        x = torch.cat([x,x2],dim=1)
        x = self.dec2(x)

        x = self.up1(x)
        x = torch.cat([x,x1],dim=1)
        x = self.dec1(x)

        x = self.final(x)

        return x