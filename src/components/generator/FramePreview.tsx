import React, { useEffect, useState, useMemo } from "react";
import { useGenerator } from "@/context/GeneratorContext";
import { getTemplate } from "@/templates/registry";

export function FramePreview() {
  const { format, imageUrl, imagePosition, builderData } = useGenerator();
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);

  // Memoize the data object to prevent excessive re-renders, but ensure it updates on every stroke
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

    // Debounce rendering slightly
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
    }, 100);

    return () => {
      isActive = false;
      clearTimeout(timer);
    };
  }, [frameData, builderData.templateId, imageUrl]);

  if (!imageUrl) return null;

  if (format === "pfp") {
    return (
      <div className="relative w-full aspect-square rounded-full border border-text-primary bg-bg-surface overflow-hidden group animate-fade-in">
        {previewDataUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={previewDataUrl}
            alt="PFP Preview"
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="animate-pulse bg-white/20 w-16 h-16 rounded-full" />
          </div>
        )}
      </div>
    );
  }

  const activeTemplate = getTemplate(builderData.templateId);
  const aspectRatioStyle = {
    aspectRatio: `${activeTemplate.config.width} / ${activeTemplate.config.height}`
  };

  return (
    <div 
      className="relative w-full border border-text-primary bg-bg-surface overflow-hidden group animate-fade-in"
      style={aspectRatioStyle}
    >
      {previewDataUrl ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={previewDataUrl}
          alt="Builder ID Preview"
          className="w-full h-full object-contain"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="animate-pulse bg-white/20 w-24 h-24 rounded-sm" />
        </div>
      )}
    </div>
  );
}
