export interface FrameData {
  imageUrl: string;
  imagePosition: { x: number; y: number; scale: number };
  name: string;
  teamName: string;
  role: string;
  builderTitle: string;
  builderId: string;
}

export interface FrameDimensions {
  width: number;
  height: number;
}
