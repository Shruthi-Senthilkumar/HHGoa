"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { Button } from "@/components/buttons/Button";
import { FramePreview } from "@/components/generator/FramePreview";
import { useGenerator } from "@/context/GeneratorContext";
import { useRouter } from "next/navigation";

export default function BuilderPage() {
  const { builderData, updateBuilderData, regenerateTitle, imageUrl, format } = useGenerator();
  const router = useRouter();
  
  const [error, setError] = useState<string | null>(null);

  // Redirect if state is lost, or if format is PFP (PFP skips builder details)
  useEffect(() => {
    if (!imageUrl) {
      router.replace("/generator");
    } else if (format === "pfp") {
      router.replace("/generator/result");
    }
  }, [imageUrl, format, router]);

  const handleGenerate = () => {
    if (!builderData.name.trim()) {
      setError("NAME REQUIRED");
      return;
    }
    if (!builderData.teamName.trim()) {
      setError("TEAM NAME REQUIRED");
      return;
    }
    if (!builderData.role.trim()) {
      setError("ROLE / STACK REQUIRED");
      return;
    }
    
    setError(null);
    router.push("/generator/result");
  };

  if (!imageUrl) return null; // Avoid rendering flash before redirect

  return (
    <>
      <Header action="back" />
      <main className="flex-1 flex flex-col pt-8 pb-24 md:pt-16 bg-bg-base">
        <Container className="flex-1 flex flex-col h-full">
          
          <div className="flex flex-col md:grid md:grid-cols-12 gap-12 md:gap-16 lg:gap-24 items-start">
            
            {/* LEFT: Builder Details Form (Desktop) / Mobile order 2 */}
            <div className="col-span-12 md:col-span-6 lg:col-span-5 flex flex-col gap-12 order-2 md:order-1 animate-reveal-up w-full">
              
              <div className="space-y-4">
                <Text mono size="xs" variant="secondary" className="uppercase tracking-widest">
                  HH GOA 2026 / BUILDER ID / PERSONALIZE
                </Text>
                <Heading level="h1" className="uppercase leading-none text-5xl sm:text-6xl">
                  BUILD<br />YOUR ID.
                </Heading>
                <Text size="lg" variant="secondary">
                  Give the frame a name.
                </Text>
              </div>

              <div className="space-y-8 flex-1">
                {/* Name Input */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block font-mono text-sm uppercase tracking-widest text-text-primary">
                    NAME
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={builderData.name}
                    onChange={(e) => {
                      setError(null);
                      updateBuilderData({ name: e.target.value.toUpperCase() });
                    }}
                    placeholder="YOUR NAME"
                    maxLength={35}
                    className="w-full bg-transparent border-b border-text-primary/30 py-3 text-2xl font-display uppercase focus:outline-none focus:border-color-accent transition-colors placeholder:text-text-secondary/50"
                  />
                </div>

                {/* Team Name Input */}
                <div className="space-y-2">
                  <label htmlFor="teamName" className="block font-mono text-sm uppercase tracking-widest text-text-primary">
                    TEAM NAME
                  </label>
                  <input
                    id="teamName"
                    type="text"
                    value={builderData.teamName}
                    onChange={(e) => {
                      setError(null);
                      // Preserve spaces in the middle, but standard string value
                      updateBuilderData({ teamName: e.target.value.toUpperCase() });
                    }}
                    onBlur={(e) => {
                      updateBuilderData({ teamName: e.target.value.trim().toUpperCase() });
                    }}
                    placeholder="YOUR TEAM"
                    maxLength={35}
                    className="w-full bg-transparent border-b border-text-primary/30 py-3 text-xl font-display uppercase focus:outline-none focus:border-color-accent transition-colors placeholder:text-text-secondary/50"
                  />
                </div>

                {/* Role Input */}
                <div className="space-y-2">
                  <label htmlFor="role" className="block font-mono text-sm uppercase tracking-widest text-text-primary">
                    STACK / ROLE
                  </label>
                  <input
                    id="role"
                    type="text"
                    value={builderData.role}
                    onChange={(e) => {
                      setError(null);
                      updateBuilderData({ role: e.target.value.toUpperCase() });
                    }}
                    placeholder="AI ENGINEER"
                    maxLength={25}
                    className="w-full bg-transparent border-b border-text-primary/30 py-3 text-xl font-mono uppercase focus:outline-none focus:border-color-accent transition-colors placeholder:text-text-secondary/50"
                  />
                </div>

                {/* Builder Title (Generated) */}
                <div className="space-y-3 pt-4">
                  <div className="flex justify-between items-center">
                    <label className="block font-mono text-sm uppercase tracking-widest text-text-primary">
                      BUILDER TITLE
                    </label>
                    <button 
                      onClick={regenerateTitle}
                      className="font-mono text-xs uppercase tracking-widest text-color-accent hover:opacity-70 transition-opacity flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-color-accent"
                      aria-label="Regenerate builder title"
                    >
                      <span>↻</span> REGENERATE
                    </button>
                  </div>
                  <div className="w-full border border-text-primary/10 bg-bg-surface px-4 py-3">
                    <Text mono weight="semibold" className="uppercase text-text-secondary">
                      {builderData.builderTitle}
                    </Text>
                  </div>
                </div>

                {error && (
                  <div className="pt-2 animate-fade-in">
                    <Text mono size="sm" className="text-color-accent uppercase">
                      {error}
                    </Text>
                  </div>
                )}
                
                <div className="pt-8 w-full">
                  <Button size="lg" fullWidth className="group" onClick={handleGenerate}>
                    GENERATE FRAME
                    <span className="ml-2 font-mono group-hover:translate-x-1 transition-transform">→</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* RIGHT: Live Preview (Desktop) / Mobile Top */}
            <div className="col-span-12 md:col-span-6 lg:col-span-7 lg:col-start-6 flex justify-center md:justify-end order-1 md:order-2 w-full">
              <div className="w-full max-w-[400px] md:max-w-md lg:max-w-lg sticky top-24 origin-top animate-fade-in delay-200">
                <FramePreview />
              </div>
            </div>

          </div>
        </Container>
      </main>
    </>
  );
}
