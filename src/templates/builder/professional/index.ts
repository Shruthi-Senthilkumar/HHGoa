import { FrameTemplate, BuilderTemplateConfig } from "@/templates/types";
import { FrameData } from "@/lib/frame/frameTypes";
import { drawAdjustedImage, drawText, measureFittedText } from "@/lib/frame/frameUtils";
import { generateQrCanvas } from "@/lib/codes/generateQr";
import { generateBarcodeCanvas } from "@/lib/codes/generateBarcode";

const WIDTH = 638;
const HEIGHT = 2026; // 1013 for Front, 1013 for Back

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = src;
  });
}

export const config: BuilderTemplateConfig = {
  id: "builder-professional",
  name: "Professional",
  description: "Minimal Portrait ID card (Front & Back).",
  format: "builder",
  category: "professional",
  preview: "/templates/builder/professional/preview.png",
  width: WIDTH,
  height: HEIGHT,
  photoRegion: {
    x: 30,
    y: 30,
    width: WIDTH - 60,
    height: 475,
    shape: "rectangle"
  },
  qrRegion: { x: (WIDTH / 2) - 100, y: 1013 + 253, width: 200, height: 200 },
};

export async function render(data: FrameData): Promise<HTMLCanvasElement> {
  const canvas = document.createElement("canvas");
  canvas.width = config.width;
  canvas.height = config.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2D context");

  const bgOffWhite = "#f6f3eb";
  const bgGreen = "#04391e";
  const textDark = "#1a1a1a";
  const textGold = "#ffcd00";

  // ==========================================
  // FRONT SIDE (0 to 1013)
  // ==========================================
  ctx.fillStyle = bgGreen; // Make front side dark green
  ctx.fillRect(0, 0, WIDTH, 1013);

  // Draw Goa Landmarks (Background artwork)
  try {
    const bgImg = await loadImage("/goa_hero_bg.jpg");
    // Draw faintly to fill the white spaces without overlapping details
    ctx.globalAlpha = 0.3;
    ctx.globalCompositeOperation = "screen"; // Better for dark backgrounds
    // Draw it across the bottom section. 
    // Image is 1:1, so we draw it at 638x638 positioned at the bottom.
    ctx.drawImage(bgImg, 0, 1013 - 638, WIDTH, 638);
    
    ctx.globalCompositeOperation = "source-over"; // reset
    ctx.globalAlpha = 1.0;
  } catch (err) {
    console.error("Could not load background image", err);
  }

  // Photo Region
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(config.photoRegion.x, config.photoRegion.y, config.photoRegion.width, config.photoRegion.height, 30);
  ctx.clip();
  if (data.imageUrl) {
    try {
      const img = await loadImage(data.imageUrl);
      drawAdjustedImage(ctx, img, config.photoRegion.x, config.photoRegion.y, config.photoRegion.width, config.photoRegion.height, data.imagePosition?.x, data.imagePosition?.y, data.imagePosition?.scale);
    } catch (err) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(config.photoRegion.x, config.photoRegion.y, config.photoRegion.width, config.photoRegion.height);
    }
  } else {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(config.photoRegion.x, config.photoRegion.y, config.photoRegion.width, config.photoRegion.height);
  }
  ctx.restore();

  // Photo subtle border
  ctx.strokeStyle = "rgba(255,255,255,0.1)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(config.photoRegion.x, config.photoRegion.y, config.photoRegion.width, config.photoRegion.height, 30);
  ctx.stroke();
  const nameText = data.name || "Your Name";
  drawText(ctx, nameText, 50, 790, 70, "'Space Grotesk', sans-serif", "#ffffff", "800", "left", "bottom");

  const roleText = data.role || "Role / Title";
  drawText(ctx, roleText, 50, 848, 35, "'Inter', sans-serif", textGold, "600", "left", "bottom");

  // Minimal Branding Bottom Right (Front)
  drawText(ctx, "HACKER HOUSE", WIDTH - 50, 937, 15, "'Space Grotesk', sans-serif", "rgba(255,255,255,0.5)", "bold", "right", "bottom");
  drawText(ctx, "GOA 2026", WIDTH - 50, 959, 22, "'Space Grotesk', sans-serif", "#ffffff", "bold", "right", "bottom");

  // ==========================================
  // BACK SIDE (1013 to 2026)
  // ==========================================
  ctx.fillStyle = bgGreen;
  ctx.fillRect(0, 1013, WIDTH, 1013);

  // Fold line
  ctx.setLineDash([12, 12]);
  ctx.beginPath();
  ctx.moveTo(0, 1013);
  ctx.lineTo(WIDTH, 1013);
  ctx.strokeStyle = "rgba(255,255,255,0.3)";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.setLineDash([]);

  // Back Branding Top
  drawText(ctx, "BUILDER ID", WIDTH / 2, 1108, 30, "'Space Grotesk', sans-serif", textGold, "bold", "center", "bottom");

  // QR Code
  if (config.qrRegion) {
    const qrCanvas = await generateQrCanvas("YOU ARE VERIFIED");
    
    // Draw white background for QR
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.roundRect(config.qrRegion.x - 25, config.qrRegion.y - 25, config.qrRegion.width + 50, config.qrRegion.height + 50, 20);
    ctx.fill();

    ctx.drawImage(qrCanvas, config.qrRegion.x, config.qrRegion.y, config.qrRegion.width, config.qrRegion.height);
  }

  // Tagline & Team
  const textCenterY = 1583;
  drawText(ctx, "TAGLINE", WIDTH / 2, textCenterY, 15, "'Inter', sans-serif", "rgba(255,255,255,0.5)", "bold", "center", "bottom");
  
  const tagline = data.builderTitle || "AI-generated professional tagline.";
  drawText(ctx, tagline, WIDTH / 2, textCenterY + 38, 30, "'Space Grotesk', sans-serif", "#ffffff", "500", "center", "bottom");

  drawText(ctx, "TEAM", WIDTH / 2, textCenterY + 126, 15, "'Inter', sans-serif", "rgba(255,255,255,0.5)", "bold", "center", "bottom");
  drawText(ctx, data.teamName || "—", WIDTH / 2, textCenterY + 164, 30, "'Space Grotesk', sans-serif", textGold, "bold", "center", "bottom");

  // Credential ID (Bottom center)
  const badgeText = data.builderId || "B-ID // 001";
  drawText(ctx, "CREDENTIAL ID", WIDTH / 2, 1840, 15, "'Inter', sans-serif", "rgba(255,255,255,0.5)", "bold", "center", "bottom");
  drawText(ctx, badgeText, WIDTH / 2, 1884, 40, "'Space Grotesk', sans-serif", "#ffffff", "800", "center", "bottom");

  // Barcode
  const barcodeCanvas = await generateBarcodeCanvas(badgeText);
  // Center the barcode horizontally
  const barcodeWidth = 300; // Expected scaled width
  const barcodeHeight = 60;
  ctx.drawImage(barcodeCanvas, (WIDTH - barcodeWidth) / 2, 1920, barcodeWidth, barcodeHeight);

  // Geometric Accents (Back)
  ctx.strokeStyle = "rgba(255,205,0,0.1)";
  ctx.lineWidth = 1;
  for(let i=0; i<5; i++) {
    ctx.beginPath();
    ctx.arc(WIDTH / 2, 1013 + 253 + 100, 220 + (i * 38), 0, Math.PI * 2);
    ctx.stroke();
  }

  return canvas;
}

export const template: FrameTemplate = {
  config,
  render
};
