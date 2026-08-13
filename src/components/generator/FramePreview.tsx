import React, { useEffect, useState, useMemo, useRef } from "react";
import { useGenerator } from "@/context/GeneratorContext";
import { getTemplate } from "@/templates/registry";
import { clampPosition } from "@/lib/frame/imagePositionHelper";

export function FramePreview() {
  const { format, imageUrl, imagePosition, setImagePosition, builderData } = useGenerator();
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<{ w: number; h: number } | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const lastPointer = useRef<{ x: number; y: number } | null>(null);
  const activePointers = useRef<number>(0);

  // Load raw image size for clamping
  useEffect(() => {
    if (!imageUrl) return;
    const img = new Image();
    img.onload = () => setImageSize({ w: img.width, h: img.height });
    img.src = imageUrl;
  }, [imageUrl]);

  // Memoize the data object to prevent excessive re-renders
  const frameData = useMemo(() => ({
    imageUrl: imageUrl || "",
    imagePosition,
    name: builderData.name,
    teamName: builderData.teamName,
    role: builderData.role,
    builderTitle: builderData.builderTitle,
    builderId: builderData.builderId,
  }), [imageUrl, imagePosition, builderData]);

  useEffect(() => {
    if (!imageUrl) return;
    let isActive = true;
    const templateId = builderData.templateId;
    const template = getTemplate(templateId);

    // Debounce rendering slightly for smoother dragging
    const timer = setTimeout(() => {
      template.render(frameData, template.config)
        .then((canvas) => {
          if (isActive) {
            setPreviewDataUrl(canvas.toDataURL("image/png"));
          }
        })
        .catch(err => {
          console.error("Failed to render preview canvas:", err);
        });
    }, 15);

    return () => {
      isActive = false;
      clearTimeout(timer);
    };
  }, [frameData, builderData.templateId, imageUrl]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!imageUrl || !imageSize) return;
    activePointers.current += 1;
    isDragging.current = true;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !lastPointer.current || !containerRef.current || !imageSize) return;
    
    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    
    const template = getTemplate(builderData.templateId);
    const canvasWidth = template.config.width;
    const displayWidth = containerRef.current.clientWidth;
    const ratio = displayWidth > 0 ? canvasWidth / displayWidth : 1;
    
    const canvasDx = dx * ratio;
    const canvasDy = dy * ratio;
    
    const region = template.config.photoRegion;
    const next = clampPosition(
      imagePosition.x + canvasDx,
      imagePosition.y + canvasDy,
      imagePosition.scale,
      imageSize,
      region
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

  if (!imageUrl) return null;

  const activeTemplate = getTemplate(builderData.templateId);
  const isPfp = format === "pfp";

  const containerClasses = `relative w-full overflow-hidden group animate-fade-in touch-none select-none cursor-grab active:cursor-grabbing border border-[#f6f3eb]/20 bg-[#f6f3eb] shadow-2xl ${
    isPfp ? "aspect-square rounded-full" : "rounded-2xl"
  }`;

  const aspectRatioStyle = isPfp ? undefined : {
    aspectRatio: `${activeTemplate.config.width} / ${activeTemplate.config.height}`
  };

  if (isPfp) {
    return (
      <div 
        ref={containerRef}
        className={containerClasses}
        style={aspectRatioStyle}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        aria-label="Drag to adjust photo position"
        role="application"
      >
        {previewDataUrl ? (
          <img
            src={previewDataUrl}
            alt="Preview"
            className="w-full h-full object-contain pointer-events-none transition-all duration-1000"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center pointer-events-none">
            <span className={`animate-pulse bg-[#04391e]/10 w-16 h-16 rounded-full`} />
          </div>
        )}
      </div>
    );
  }

  // Builder ID Card (3D Flip Mode)
  return (
    <div className="relative w-full perspective-1000 group" style={{ aspectRatio: '638 / 1013' }}>
      {/* Flip Control */}
      <button 
        onClick={() => setIsFlipped(!isFlipped)}
        className="absolute -right-4 -top-4 z-50 bg-[#ffcd00] text-[#04391e] font-bold text-xs uppercase tracking-widest px-5 py-2 rounded-full shadow-xl hover:scale-110 transition-transform"
      >
        FLIP ↻
      </button>

      <div className={`w-full h-full preserve-3d transition-transform duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* FRONT FACE */}
        <div 
          ref={containerRef}
          className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-2xl bg-[#f6f3eb] cursor-grab active:cursor-grabbing border-4 border-white"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {previewDataUrl ? (
            <>
              <div 
                className="absolute inset-0 w-full h-full bg-no-repeat pointer-events-none" 
                style={{ backgroundImage: `url(${previewDataUrl})`, backgroundSize: '100% 200%', backgroundPosition: 'top' }} 
              />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center pointer-events-none">
              <span className="animate-pulse bg-[#04391e]/10 w-24 h-24 rounded-sm" />
            </div>
          )}
        </div>

        {/* BACK FACE */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden shadow-2xl bg-[#04391e] border-4 border-[#ffcd00]"
        >
          {previewDataUrl && (
            <>
              <div 
                className="absolute inset-0 w-full h-full bg-no-repeat pointer-events-none" 
                style={{ backgroundImage: `url(${previewDataUrl})`, backgroundSize: '100% 200%', backgroundPosition: 'bottom' }} 
              />
              <div className="absolute inset-0 hologram-shimmer" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
