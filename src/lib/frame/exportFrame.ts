import { FrameData } from "./frameTypes";
import { loadFrameFonts } from "./fontLoader";
import { getTemplate } from "@/templates/registry";

export async function exportFrameAsPng(data: FrameData, templateId: string = "placeholder-mvp"): Promise<Blob> {
  // Ensure fonts are loaded before drawing to canvas
  await loadFrameFonts();

  const template = getTemplate(templateId);
  const canvas = await template.render(data, template.config);
  
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Canvas toBlob failed"));
        }
      },
      "image/png",
      1.0
    );
  });
}
