import React from "react";
import { useGenerator } from "@/context/GeneratorContext";
import { getTemplatesByFormat } from "@/templates/registry";
import { Text } from "../typography/Text";

export function TemplateSelector() {
  const { format, builderData, updateBuilderData } = useGenerator();

  if (!format) return null;

  const templates = getTemplatesByFormat(format);

  return (
    <div className="w-full space-y-4 animate-reveal-up delay-100">
      <Text mono size="xs" variant="secondary" className="uppercase tracking-widest">
        CHOOSE YOUR STYLE
      </Text>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {templates.map((template) => {
          const isSelected = builderData.templateId === template.config.id;
          
          return (
            <button
              key={template.config.id}
              onClick={() => updateBuilderData({ templateId: template.config.id })}
              className={`relative flex flex-col items-center p-4 border transition-all ${
                isSelected 
                  ? "border-color-accent bg-color-accent/5" 
                  : "border-border bg-bg-surface hover:border-text-secondary"
              }`}
            >
              {/* Simple CSS preview representation */}
              <div className={`w-16 mb-4 bg-bg-inverse/10 border border-border ${format === "pfp" ? "aspect-square rounded-full" : "aspect-[4/5]"}`}>
                {/* Fallback internal representation just for selector visual weight */}
                <div className="w-full h-full flex items-center justify-center text-[8px] text-text-secondary opacity-50">
                  {format === "pfp" ? "○" : "▭"}
                </div>
              </div>
              
              <Text mono size="xs" className={`uppercase font-bold text-center ${isSelected ? "text-color-accent" : "text-text-primary"}`}>
                {template.config.name}
              </Text>

              {isSelected && (
                <div className="absolute top-2 right-2">
                  <span className="flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-color-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-color-accent"></span>
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
