import { FrameTemplate, PfpTemplateConfig } from "@/templates/types";
import { FrameData } from "@/lib/frame/frameTypes";
import { drawAdjustedImage, drawText } from "@/lib/frame/frameUtils";

const PFP_SIZE = 1080;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = src;
  });
}

export const config: PfpTemplateConfig = {
  id: "pfp-professional",
  name: "Professional",
  description: "Minimal circular PFP overlay.",
  format: "pfp",
  category: "professional",
  preview: "/templates/pfp/professional/preview.png",
  width: PFP_SIZE,
  height: PFP_SIZE,
  photoRegion: {
    x: 0,
    y: 0,
    width: PFP_SIZE,
    height: PFP_SIZE,
    shape: "circle"
  }
};

export async function render(data: FrameData): Promise<HTMLCanvasElement> {
  const canvas = document.createElement("canvas");
  canvas.width = config.width;
  canvas.height = config.height;
  
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2D context");

  // 1. Setup Circular Clipping Path
  ctx.save();
  ctx.beginPath();
  ctx.arc(config.photoRegion.x + config.photoRegion.width / 2, config.photoRegion.y + config.photoRegion.height / 2, config.photoRegion.width / 2, 0, Math.PI * 2);
  ctx.clip();

  // 2. Draw Background
  ctx.fillStyle = "#000000";
  ctx.fillRect(config.photoRegion.x, config.photoRegion.y, config.photoRegion.width, config.photoRegion.height);

  // 3. Draw Photo using new adjusted image logic
  if (data.imageUrl) {
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
  }

  const BORDER_WIDTH = 40;
  ctx.beginPath();
  // Draw the border completely inside the clipping region
  ctx.arc(PFP_SIZE / 2, PFP_SIZE / 2, (PFP_SIZE / 2) - (BORDER_WIDTH / 2), 0, Math.PI * 2);
  ctx.strokeStyle = "#ffcd00"; // HH Goa Yellow
  ctx.lineWidth = BORDER_WIDTH;
  ctx.stroke();

  // Draw a secondary inner border for a premium feel
  ctx.beginPath();
  ctx.arc(PFP_SIZE / 2, PFP_SIZE / 2, (PFP_SIZE / 2) - BORDER_WIDTH - 2, 0, Math.PI * 2);
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 4;
  ctx.stroke();

  // Branding text with shadow for better visibility over varied photos
  ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
  ctx.shadowBlur = 20;
  ctx.shadowOffsetY = 6;
  
  // Use Fredoka One if loaded, fallback to system display fonts
  drawText(ctx, "HH GOA", PFP_SIZE / 2, PFP_SIZE - 120, 110, "'Fredoka One', system-ui, -apple-system, sans-serif", "#ffcd00", "900", "center", "bottom");
  drawText(ctx, "2026", PFP_SIZE / 2, PFP_SIZE - 45, 80, "'Fredoka One', system-ui, -apple-system, sans-serif", "#ffffff", "900", "center", "bottom");
  ctx.shadowColor = "transparent"; // Reset shadow

  ctx.restore();
  return canvas;
}

export const template: FrameTemplate = {
  config,
  render
};
