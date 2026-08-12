"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useGenerator } from "@/context/GeneratorContext";
import { getTemplate } from "@/templates/registry";

export function PhotoAdjuster() {
  const { imageUrl, imagePosition, setImagePosition, builderData } = useGenerator();
  const [imageSize, setImageSize] = useState<{ w: number; h: number } | null>(null);

  const isDragging = useRef(false);
  const lastPointer = useRef<{ x: number; y: number } | null>(null);
  const activePointers = useRef<number>(0);

  // Load image size
  useEffect(() => {
    if (!imageUrl) return;
    const img = new Image();
    img.onload = () => setImageSize({ w: img.width, h: img.height });
    img.src = imageUrl;
  }, [imageUrl]);

  const template = getTemplate(builderData.templateId);
  const region = template.config.photoRegion;

  const clampPosition = useCallback((newX: number, newY: number, newScale: number) => {
    if (!imageSize || !region) return { x: newX, y: newY, scale: newScale };

    // 1. Calculate minimum cover scale
    const scaleX = region.width / imageSize.w;
    const scaleY = region.height / imageSize.h;
    const coverScale = Math.max(scaleX, scaleY);

    // 2. Clamp user scale to [1, 3] (where 1 = coverScale)
    const clampedScale = Math.max(1, Math.min(3, newScale));
    const finalScale = coverScale * clampedScale;

    const drawW = imageSize.w * finalScale;
    const drawH = imageSize.h * finalScale;

    // 3. Calculate max translation
    const maxTx = Math.max(0, (drawW - region.width) / 2);
    const maxTy = Math.max(0, (drawH - region.height) / 2);

    // 4. Clamp requested translation
    const clampedX = Math.max(-maxTx, Math.min(maxTx, newX));
    const clampedY = Math.max(-maxTy, Math.min(maxTy, newY));

    return { x: clampedX, y: clampedY, scale: clampedScale };
  }, [imageSize, region]);

  const handleZoomIn = () => {
    const next = clampPosition(imagePosition.x, imagePosition.y, imagePosition.scale + 0.1);
    setImagePosition(next);
  };

  const handleZoomOut = () => {
    const next = clampPosition(imagePosition.x, imagePosition.y, imagePosition.scale - 0.1);
    setImagePosition(next);
  };

  const handleReset = () => {
    setImagePosition({ x: 0, y: 0, scale: 1 });
  };

  const panAmount = 20;
  const pan = (dx: number, dy: number) => {
    const next = clampPosition(imagePosition.x + dx, imagePosition.y + dy, imagePosition.scale);
    setImagePosition(next);
  };

  // Pointer event handlers for drag
  const onPointerDown = (e: React.PointerEvent) => {
    activePointers.current += 1;
    isDragging.current = true;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !lastPointer.current) return;
    
    // Calculate raw delta
    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    
    // Scale the movement up slightly because the preview is usually much smaller than the actual canvas
    const sensitivity = 2.0; 
    
    const next = clampPosition(
      imagePosition.x + dx * sensitivity, 
      imagePosition.y + dy * sensitivity, 
      imagePosition.scale
    );
    setImagePosition(next);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    activePointers.current = Math.max(0, activePointers.current - 1);
    if (activePointers.current === 0) {
      isDragging.current = false;
      lastPointer.current = null;
    }
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  // Re-center on template switch
  useEffect(() => {
    const next = clampPosition(imagePosition.x, imagePosition.y, imagePosition.scale);
    setImagePosition(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [builderData.templateId, imageSize]);

  if (!imageUrl || !imageSize) return null;

  return (
    <div className="flex flex-col gap-4 mt-6 w-full max-w-sm">
      <div className="flex justify-between items-center text-xs font-mono uppercase text-text-secondary tracking-widest mb-1 border-b border-white/10 pb-2">
        <span>Adjust Photo</span>
        <button onClick={handleReset} className="hover:text-white focus:outline-none focus:ring-1 focus:ring-white">Reset</button>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-xs font-mono text-white/50 w-12">ZOOM</span>
        <div className="flex flex-1 gap-2">
          <button 
            aria-label="Zoom out"
            onClick={handleZoomOut} 
            className="flex-1 bg-white/5 hover:bg-white/10 text-white font-mono h-10 border border-white/10 rounded-sm focus:outline-none focus:ring-1 focus:ring-white"
          >-</button>
          <button 
            aria-label="Zoom in"
            onClick={handleZoomIn} 
            className="flex-1 bg-white/5 hover:bg-white/10 text-white font-mono h-10 border border-white/10 rounded-sm focus:outline-none focus:ring-1 focus:ring-white"
          >+</button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-xs font-mono text-white/50 w-12">PAN</span>
        <div className="flex flex-1 gap-1">
          <button aria-label="Move photo left" onClick={() => pan(-panAmount, 0)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-mono h-10 border border-white/10 rounded-sm focus:outline-none focus:ring-1 focus:ring-white">←</button>
          <div className="flex flex-col flex-1 gap-1">
            <button aria-label="Move photo up" onClick={() => pan(0, -panAmount)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-mono h-5 flex items-center justify-center border border-white/10 rounded-sm focus:outline-none focus:ring-1 focus:ring-white">↑</button>
            <button aria-label="Move photo down" onClick={() => pan(0, panAmount)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-mono h-5 flex items-center justify-center border border-white/10 rounded-sm focus:outline-none focus:ring-1 focus:ring-white">↓</button>
          </div>
          <button aria-label="Move photo right" onClick={() => pan(panAmount, 0)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-mono h-10 border border-white/10 rounded-sm focus:outline-none focus:ring-1 focus:ring-white">→</button>
        </div>
      </div>

      {/* Drag Pad */}
      <div 
        className="mt-2 w-full h-16 bg-white/5 hover:bg-white/10 border border-white/10 border-dashed rounded-sm flex items-center justify-center cursor-move touch-none select-none focus:outline-none focus:ring-1 focus:ring-white"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        tabIndex={0}
        aria-label="Drag area to pan photo"
      >
        <span className="text-xs font-mono text-white/50 pointer-events-none">DRAG HERE TO PAN</span>
      </div>
    </div>
  );
}
