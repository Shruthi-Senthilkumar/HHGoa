"use client";

import React, { useState, useEffect } from "react";
import { useGenerator } from "@/context/GeneratorContext";
import { getTemplate } from "@/templates/registry";
import { clampPosition } from "@/lib/frame/imagePositionHelper";
import { Text } from "../typography/Text";

export function PhotoAdjuster() {
  const { imageUrl, imagePosition, setImagePosition, builderData } = useGenerator();
  const [imageSize, setImageSize] = useState<{ w: number; h: number } | null>(null);
  const [isAdjusting, setIsAdjusting] = useState(false);

  // Load image size
  useEffect(() => {
    if (!imageUrl) return;
    const img = new Image();
    img.onload = () => setImageSize({ w: img.width, h: img.height });
    img.src = imageUrl;
  }, [imageUrl]);

  const template = getTemplate(builderData.templateId);
  const region = template.config.photoRegion;

  const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newScale = parseFloat(e.target.value);
    const next = clampPosition(imagePosition.x, imagePosition.y, newScale, imageSize, region);
    setImagePosition(next);
  };

  const handleReset = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setImagePosition({ x: 0, y: 0, scale: 1 });
  };

  // Re-center on template switch if needed
  useEffect(() => {
    const next = clampPosition(imagePosition.x, imagePosition.y, imagePosition.scale, imageSize, region);
    setImagePosition(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [builderData.templateId, imageSize]);

  if (!imageUrl || !imageSize) return null;

  return (
    <div className="flex flex-col gap-4 mt-6 w-full max-w-sm select-none">
      <div className="flex justify-between items-center text-xs font-mono uppercase text-text-primary tracking-widest mb-1 border-b border-border-inverse/20 pb-3">
        <button 
          onClick={() => setIsAdjusting(!isAdjusting)} 
          className="hover:text-color-accent transition-colors focus:outline-none focus:ring-1 focus:ring-text-primary flex items-center gap-2 font-bold"
          type="button"
          aria-label={isAdjusting ? "Close adjust photo panel" : "Open adjust photo panel"}
        >
          {isAdjusting ? "▼" : "▶"} ADJUST PHOTO
        </button>
        <button 
          onClick={handleReset} 
          className="hover:text-color-accent transition-colors focus:outline-none focus:ring-1 focus:ring-text-primary text-text-primary"
          type="button"
          aria-label="Reset photo position"
        >
          Reset
        </button>
      </div>

      {isAdjusting && (
        <div className="flex flex-col gap-6 animate-fade-in py-2">
          {/* Zoom Slider */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center text-xs font-mono text-text-primary">
              <span>ZOOM</span>
              <span>{imagePosition.scale.toFixed(1)}×</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-text-secondary">MIN</span>
              <input
                type="range"
                min="1"
                max="3"
                step="0.05"
                value={imagePosition.scale}
                onChange={handleZoomChange}
                aria-label="Photo zoom"
                className="flex-1 h-1 bg-border-inverse/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-bg-inverse [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-grab active:[&::-webkit-slider-thumb]:cursor-grabbing [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-bg-inverse [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-grab active:[&::-moz-range-thumb]:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-text-primary focus:ring-offset-2 focus:ring-offset-bg-base"
              />
              <span className="text-xs font-mono text-text-secondary">MAX</span>
            </div>
          </div>
          
          <Text mono size="xs" variant="secondary" className="text-center mt-2 tracking-wider">
            DRAG PHOTO TO POSITION
          </Text>
        </div>
      )}
    </div>
  );
}
