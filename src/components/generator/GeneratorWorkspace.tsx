"use client";

import React from "react";
import { Container } from "../layout/Container";
import { Heading } from "../typography/Heading";
import { Text } from "../typography/Text";
import { UploadZone } from "./UploadZone";
import { FramePreview } from "./FramePreview";
import { GeneratorActions } from "./GeneratorActions";
import { TemplateSelector } from "./TemplateSelector";
import { validateImageFile } from "@/lib/image/validation";
import { createObjectUrl } from "@/lib/image/objectUrl";
import { useGenerator } from "@/context/GeneratorContext";

import { PhotoAdjuster } from "./PhotoAdjuster";

export function GeneratorWorkspace() {
  const { format, setFormat, imageUrl, setImage } = useGenerator();
  const [error, setError] = React.useState<string | null>(null);

  const status = imageUrl ? "ready" : "empty";

  const handleFileSelect = (selectedFile: File) => {
    const validation = validateImageFile(selectedFile);
    
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    const url = createObjectUrl(selectedFile);
    setError(null);
    setImage(selectedFile, url);
  };

  const handleRemove = () => {
    setImage(null, null);
    setError(null);
  };

  if (!format) {
    return (
      <section className="flex-1 w-full flex flex-col pt-8 pb-24 md:pt-32 items-center text-center">
        <Container className="flex-1 flex flex-col items-center">
          <div className="space-y-4 animate-reveal-up mb-16">
            <Text mono size="xs" variant="secondary" className="uppercase tracking-widest">
              HH GOA 2026 / GENERATOR
            </Text>
            <Heading level="h1" className="uppercase leading-none text-5xl md:text-7xl">
              WHAT ARE YOU<br />MAKING?
            </Heading>
          </div>

          <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in delay-200">
            <button 
              onClick={() => setFormat("pfp")}
              className="flex flex-col items-start p-8 border border-border bg-bg-surface hover:border-color-accent hover:bg-color-accent/5 transition-all group text-left relative overflow-hidden"
            >
              <Text mono size="xs" className="uppercase tracking-widest mb-4 group-hover:text-color-accent transition-colors">
                01 // FORMAT A
              </Text>
              
              <div className="flex w-full justify-between items-start mb-4">
                <Heading level="h2" size="4xl" className="uppercase leading-none group-hover:text-color-accent transition-colors">
                  PFP FRAME
                </Heading>
                <div className="w-16 h-16 rounded-full border-2 border-white/20 group-hover:border-color-accent transition-colors flex-shrink-0" />
              </div>
              
              <Text variant="secondary" className="max-w-xs">
                Your photo, framed for HH Goa. Made to be circular.
              </Text>
            </button>

            <button 
              onClick={() => setFormat("builder")}
              className="flex flex-col items-start p-8 border border-border bg-bg-surface hover:border-color-accent hover:bg-color-accent/5 transition-all group text-left w-full relative overflow-hidden aspect-video md:aspect-auto"
            >
              <Text mono size="xs" className="uppercase tracking-widest mb-4 group-hover:text-color-accent transition-colors">
                02 // FORMAT B
              </Text>
              
              <div className="flex w-full justify-between items-start mb-4">
                <Heading level="h2" size="4xl" className="uppercase leading-none group-hover:text-color-accent transition-colors">
                  BUILDER ID
                </Heading>
                <div className="w-24 h-16 border-2 border-white/20 group-hover:border-color-accent transition-colors flex-shrink-0" />
              </div>
              
              <Text variant="secondary" className="max-w-xs">
                Your photo + builder identity. Horizontal format.
              </Text>
            </button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="flex-1 w-full flex flex-col pt-8 pb-24 md:pt-16">
      <Container className="flex-1 flex flex-col h-full">
        
        {/* Workspace Layout */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-12 md:gap-24 h-full">
          
          {/* LEFT: Intro & Controls */}
          <div className="flex flex-col gap-12 order-2 md:order-1 h-full">
            <div className="space-y-6 animate-reveal-up hidden md:block">

              <Heading level="h1" className="uppercase leading-none text-6xl">
                {format === "pfp" ? (
                  <>MAKE<br />YOUR<br />PFP.</>
                ) : (
                  <>YOUR PHOTO.<br />YOUR FRAME.</>
                )}
              </Heading>
              
              <Text size="lg" variant="secondary">
                MAKE YOUR GOA MOMENT OFFICIAL.
              </Text>

              <button 
                onClick={() => setFormat(null)}
                className="text-text-secondary hover:text-text-primary uppercase tracking-widest font-mono text-xs transition-colors"
              >
                ← SWITCH FORMAT
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-start gap-8">
              <TemplateSelector />
              {status !== "ready" ? (
                <div className="animate-fade-in w-full max-w-sm">
                  <UploadZone 
                    onFileSelect={handleFileSelect} 
                    error={error} 
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-8">
                  <PhotoAdjuster />
                  <GeneratorActions 
                    onFileSelect={handleFileSelect}
                    onRemove={handleRemove}
                  />
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Live Preview */}
          <div className="flex flex-col justify-start items-center md:items-start order-1 md:order-2 h-full">
            
            {/* Mobile Header */}
            <div className="space-y-4 animate-reveal-up w-full text-center md:hidden mb-8">

              <Heading level="h2" size="4xl" className="uppercase leading-none">
                {format === "pfp" ? (
                  <>MAKE<br />YOUR<br />PFP.</>
                ) : (
                  <>YOUR PHOTO.<br />YOUR FRAME.</>
                )}
              </Heading>
              <button 
                onClick={() => setFormat(null)}
                className="text-text-secondary hover:text-text-primary uppercase tracking-widest font-mono text-xs transition-colors mt-2"
              >
                ← SWITCH FORMAT
              </button>
            </div>

            <div className={`w-full max-w-[1600px] sticky top-24 ${format === "pfp" ? "max-w-md aspect-square" : "aspect-[1.587/1]"}`}>
              {status === "ready" && imageUrl ? (
                <FramePreview />
              ) : (
                <div className={`w-full h-full border border-border bg-bg-base flex flex-col items-center justify-center p-8 text-center animate-fade-in ${format === "pfp" ? "rounded-full" : ""}`}>
                   <Text mono variant="secondary" className="uppercase">
                     PREVIEW WILL APPEAR HERE
                   </Text>
                </div>
              )}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
