import { FrameTemplate, BuilderTemplateConfig } from "@/templates/types";
import { FrameData } from "@/lib/frame/frameTypes";
import { drawAdjustedImage, drawText, measureFittedText } from "@/lib/frame/frameUtils";
import { generateQrCanvas } from "@/lib/codes/generateQr";
import { generateBarcodeCanvas } from "@/lib/codes/generateBarcode";

const WIDTH = 1600;
const HEIGHT = 1008;

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
  description: "Standard ID card layout.",
  format: "builder",
  category: "professional",
  preview: "/templates/builder/professional/preview.png",
  width: WIDTH,
  height: HEIGHT,
  photoRegion: {
    x: 80,
    y: 80,
    width: 600,
    height: HEIGHT - 160,
    shape: "rectangle"
  },
  qrRegion: { x: WIDTH - 80 - 150, y: 80, width: 150, height: 150 },
  barcodeRegion: { x: WIDTH - 80 - 400, y: HEIGHT - 80 - 100, width: 400, height: 100 },
};

export async function render(data: FrameData): Promise<HTMLCanvasElement> {
  const canvas = document.createElement("canvas");
  canvas.width = config.width;
  canvas.height = config.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2D context");

  // Background
  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(0, 0, config.width, config.height);

  // Photo Region Masking
  if (data.imageUrl) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(config.photoRegion.x, config.photoRegion.y, config.photoRegion.width, config.photoRegion.height);
    ctx.clip();

    const img = await loadImage(data.imageUrl);
    drawAdjustedImage(
      ctx,
      img,
      config.photoRegion.x,
      config.photoRegion.y,
      config.photoRegion.width,
      config.photoRegion.height,
      data.imagePosition.x,
      data.imagePosition.y,
      data.imagePosition.scale
    );
    
    ctx.restore();
  }

  // Draw Photo Border
  ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
  ctx.lineWidth = 4;
  ctx.strokeRect(config.photoRegion.x, config.photoRegion.y, config.photoRegion.width, config.photoRegion.height);

  // Layout Text Area (Right side of photo)
  const textLeftX = config.photoRegion.x + config.photoRegion.width + 80;
  
  // Top Header
  drawText(ctx, "HH GOA 2026", textLeftX, 80, 48, "Space Grotesk, sans-serif", "#ffffff", "bold");
  drawText(ctx, "BUILDER ID", textLeftX, 140, 32, "monospace", "rgba(255,255,255,0.7)", "normal");

  // Middle Text
  const nameText = data.name || "YOUR NAME";
  const nameFontSize = measureFittedText(ctx, nameText, "Space Grotesk, sans-serif", "bold", config.width - textLeftX - 250, 40, 100);
  drawText(ctx, nameText, textLeftX, 350, nameFontSize, "Space Grotesk, sans-serif", "#ffffff", "bold", "left", "bottom");
  drawText(ctx, data.builderTitle || "BUILDER", textLeftX, 350 - nameFontSize - 20, 28, "monospace", "rgba(255,255,255,0.7)", "normal", "left", "bottom");

  const roleText = data.role || "ENGINEER";
  drawText(ctx, roleText, textLeftX, 500, 36, "monospace", "#6496ff", "bold", "left", "bottom");
  drawText(ctx, "STACK / ROLE", textLeftX, 440, 24, "monospace", "rgba(255,255,255,0.5)", "normal", "left", "bottom");

  const teamNameText = data.teamName ? `TEAM: ${data.teamName}` : "";
  if (teamNameText) {
    drawText(ctx, teamNameText, textLeftX, 600, 32, "monospace", "#ffffff", "bold", "left", "bottom");
  }

  // Badge / ID Number
  const badgeText = data.builderId || "B-ID // 001";
  drawText(ctx, badgeText, textLeftX, HEIGHT - 180, 32, "monospace", "#ffffff", "bold", "left", "bottom");

  // Draw QR / Barcode
  if (config.qrRegion) {
    const qrCanvas = await generateQrCanvas(badgeText);
    ctx.drawImage(qrCanvas, config.qrRegion.x, config.qrRegion.y, config.qrRegion.width, config.qrRegion.height);
  }
  if (config.barcodeRegion) {
    const barcodeCanvas = await generateBarcodeCanvas(badgeText);
    ctx.drawImage(barcodeCanvas, config.barcodeRegion.x, config.barcodeRegion.y, config.barcodeRegion.width, config.barcodeRegion.height);
  }

  return canvas;
}

export const template: FrameTemplate = {
  config,
  render
};
