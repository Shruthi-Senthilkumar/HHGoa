"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { generateBuilderId } from "@/lib/builder/generateBuilderId";
import { generateBuilderTitle } from "@/lib/builder/titleGenerator";
import { revokeObjectUrl } from "@/lib/image/objectUrl";

export type BuilderData = {
  name: string;
  teamName: string;
  role: string;
  builderTitle: string;
  builderId: string;
  templateId: string;
};

export type GeneratorFormat = "pfp" | "builder" | null;

type ImagePosition = { x: number; y: number; scale: number };

type GeneratorContextType = {
  format: GeneratorFormat;
  file: File | null;
  imageUrl: string | null;
  imagePosition: ImagePosition;
  builderData: BuilderData;
  setFormat: (format: GeneratorFormat) => void;
  setImage: (file: File | null, url: string | null) => void;
  setImagePosition: (position: ImagePosition) => void;
  updateBuilderData: (data: Partial<BuilderData>) => void;
  regenerateTitle: () => void;
  resetGenerator: () => void;
};

const defaultContext: GeneratorContextType = {
  format: null,
  file: null,
  imageUrl: null,
  imagePosition: { x: 0, y: 0, scale: 1 },
  builderData: {
    name: "",
    teamName: "",
    role: "",
    builderTitle: "",
    builderId: "",
    templateId: "builder-professional",
  },
  setFormat: () => {},
  setImage: () => {},
  setImagePosition: () => {},
  updateBuilderData: () => {},
  regenerateTitle: () => {},
  resetGenerator: () => {},
};

const GeneratorContext = createContext<GeneratorContextType>(defaultContext);

export function GeneratorProvider({ children }: { children: ReactNode }) {
  const [format, setFormatState] = useState<GeneratorFormat>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imagePosition, setImagePosition] = useState<ImagePosition>({ x: 0, y: 0, scale: 1 });
  
  const [builderData, setBuilderData] = useState<BuilderData>(() => ({
    name: "",
    teamName: "",
    role: "",
    builderTitle: generateBuilderTitle(),
    builderId: generateBuilderId(),
    templateId: "builder-professional"
  }));

  const setFormat = useCallback((newFormat: GeneratorFormat) => {
    setFormatState(newFormat);
    // When format changes, ensure correct template is selected
    if (newFormat === "builder") {
      setBuilderData(prev => ({ ...prev, templateId: "builder-professional" }));
    } else if (newFormat === "pfp") {
      setBuilderData(prev => ({ ...prev, templateId: "pfp-professional" }));
    }
  }, []);

  const setImage = useCallback((newFile: File | null, newUrl: string | null) => {
    setImageUrl(prevUrl => {
      if (prevUrl && prevUrl !== newUrl) {
        revokeObjectUrl(prevUrl);
      }
      return newUrl;
    });
    setFile(newFile);
    setImagePosition({ x: 0, y: 0, scale: 1 }); // reset position on new image
  }, []);

  const updateBuilderData = useCallback((data: Partial<BuilderData>) => {
    setBuilderData(prev => ({ ...prev, ...data }));
  }, []);

  const regenerateTitle = useCallback(() => {
    setBuilderData(prev => ({
      ...prev,
      builderTitle: generateBuilderTitle()
    }));
  }, []);

  const resetGenerator = useCallback(() => {
    setImageUrl(prev => {
      if (prev) revokeObjectUrl(prev);
      return null;
    });
    setFile(null);
    setFormatState(null);
    setImagePosition({ x: 0, y: 0, scale: 1 });
    setBuilderData({
      name: "",
      teamName: "",
      role: "",
      builderTitle: generateBuilderTitle(),
      builderId: generateBuilderId(),
      templateId: "builder-professional" // format will be null, but default for safety
    });
  }, []);

  return (
    <GeneratorContext.Provider value={{
      format,
      file,
      imageUrl,
      imagePosition,
      builderData,
      setFormat,
      setImage,
      setImagePosition,
      updateBuilderData,
      regenerateTitle,
      resetGenerator
    }}>
      {children}
    </GeneratorContext.Provider>
  );
}

export function useGenerator() {
  return useContext(GeneratorContext);
}

