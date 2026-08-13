import { FrameTemplate } from "./types";
import { template as pfpProfessional } from "./pfp/professional";
import { template as pfpCreative01 } from "./pfp/creative-01";
import { template as pfpCreative02 } from "./pfp/creative-02";
import { template as builderProfessional } from "./builder/professional";
import { template as builderCreative01 } from "./builder/creative-01";
import { template as builderCreative02 } from "./builder/creative-02";

// Registry of all available templates
export const templateRegistry: Record<string, FrameTemplate> = {
  "pfp-professional": pfpProfessional,
  "builder-professional": builderProfessional,
};

export function getTemplate(id: string): FrameTemplate {
  const template = templateRegistry[id];
  if (!template) {
    console.warn(`Template ${id} not found, falling back to professional.`);
    // Fall back based on string prefix if possible, else builder
    if (id.startsWith("pfp-")) return pfpProfessional;
    return builderProfessional;
  }
  return template;
}

export function getTemplatesByFormat(format: "pfp" | "builder"): FrameTemplate[] {
  return Object.values(templateRegistry).filter(t => t.config.format === format);
}
