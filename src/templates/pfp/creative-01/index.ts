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
  id: "pfp-creative-01",
  name: "Creative 01",
  description: "Dynamic circular PFP overlay.",
  format: "pfp",
  category: "creative-01",
  preview: "/templates/pfp/creative-01/preview.png",
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

  ctx.save();
  ctx.beginPath();
  ctx.arc(config.photoRegion.x + config.photoRegion.width / 2, config.photoRegion.y + config.photoRegion.height / 2, config.photoRegion.width / 2, 0, Math.PI * 2);
  ctx.clip();

  ctx.fillStyle = "#111111";
  ctx.fillRect(config.photoRegion.x, config.photoRegion.y, config.photoRegion.width, config.photoRegion.height);

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

  // Creative border 1
  ctx.beginPath();
  ctx.arc(PFP_SIZE / 2, PFP_SIZE / 2, (PFP_SIZE / 2) - 32, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255, 100, 100, 0.8)";
  ctx.lineWidth = 8;
  ctx.stroke();

  drawText(ctx, "CREATIVE 01", PFP_SIZE / 2, PFP_SIZE - 96, 72, "Space Grotesk, sans-serif", "#ff6464", "900", "center", "bottom");

  ctx.restore();
  return canvas;
}

export const template: FrameTemplate = {
  config,
  render
};
