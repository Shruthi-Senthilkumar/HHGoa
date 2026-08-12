import { FrameData } from "@/lib/frame/frameTypes";

export type RegionConfig = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export interface BaseTemplateConfig {
  id: string;
  name: string;
  description: string;
  format: "pfp" | "builder";
  category: "professional" | "creative-01" | "creative-02";
  preview: string;
  width: number;
  height: number;
  photoRegion: {
    x: number;
    y: number;
    width: number;
    height: number;
    shape: "circle" | "rectangle";
  };
}

export interface PfpTemplateConfig extends BaseTemplateConfig {
  format: "pfp";
}

export interface BuilderTemplateConfig extends BaseTemplateConfig {
  format: "builder";
  qrRegion?: RegionConfig;
  barcodeRegion?: RegionConfig;
}

export type TemplateConfig = PfpTemplateConfig | BuilderTemplateConfig;

export interface FrameTemplate {
  config: TemplateConfig;
  render: (data: FrameData, config?: TemplateConfig) => Promise<HTMLCanvasElement>;
}
