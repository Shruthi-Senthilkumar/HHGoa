"use client";

import React, { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/footer/Footer";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { useGenerator } from "@/context/GeneratorContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/buttons/Button";
import { exportFrameAsPng } from "@/lib/frame/exportFrame";
import { createObjectUrl, revokeObjectUrl } from "@/lib/image/objectUrl";
import { shareToX } from "@/lib/sharing/x";
import { getTemplate } from "@/templates/registry";

export default function ResultPage() {
  const { format, imageUrl, imagePosition, builderData, resetGenerator } = useGenerator();
  const router = useRouter();

  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);

  // Redirect if state is lost
  useEffect(() => {
    if (!imageUrl) {
      router.replace("/generator");
    } else if (format === "builder" && !builderData.name) {
      router.replace("/generator/builder");
    }
  }, [imageUrl, format, builderData.name, router]);

  // Generate PNG on mount
  useEffect(() => {
    if (!imageUrl) return;

    let urlToRevoke: string | null = null;

    async function generate() {
      try {
        setIsGenerating(true);
        const blob = await exportFrameAsPng({
          imageUrl: imageUrl!,
          imagePosition,
          name: builderData.name,
          teamName: builderData.teamName,
          role: builderData.role,
          builderTitle: builderData.builderTitle,
          builderId: builderData.builderId,
        }, builderData.templateId);

        const url = createObjectUrl(new File([blob], "temp.png"));
        urlToRevoke = url;
        setGeneratedUrl(url);
      } catch (err) {
        console.error("Frame generation failed", err);
        setError("FRAME GENERATION FAILED. Please try again.");
      } finally {
        setIsGenerating(false);
      }
    }

    generate();

    return () => {
      if (urlToRevoke) revokeObjectUrl(urlToRevoke);
    };
  }, [imageUrl, imagePosition, builderData]);

  const handleDownload = () => {
    if (!generatedUrl) return;
    const link = document.createElement("a");
    link.href = generatedUrl;
    
    // Sanitize name for filename
    let filename = "hh-goa-2026.png";
    if (format === "pfp") {
      filename = "hh-goa-2026-pfp.png";
    } else {
      const sanitizedName = builderData.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'builder';
      filename = `hh-goa-2026-${sanitizedName}.png`;
    }
    
    link.download = filename;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShareToX = () => {
    // Note: since the file is local (Blob URL), we can't directly attach it to the web intent.
    // The user will need to upload their downloaded file. We supply the prepopulated caption.
    shareToX("Ready for HH Goa 2026. #FrameInGoa");
  };

  const handleCreateAnother = () => {
    resetGenerator();
    router.push("/generator");
  };

  if (!imageUrl) return null;
  if (format === "builder" && !builderData.name) return null;

  return (
    <>
      <Header action="back" />
      <main className="flex-1 flex flex-col pt-8 pb-24 md:pt-16 bg-bg-base">
        <Container className="flex-1 flex flex-col items-center gap-12">
          
          <div className="space-y-4 text-center animate-reveal-up min-h-[120px]">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center h-full">
                 <Text mono className="uppercase tracking-widest animate-pulse text-color-accent">
                   GENERATING FRAME...
                 </Text>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-full">
                 <Text mono className="uppercase tracking-widest text-color-accent">
                   {error}
                 </Text>
              </div>
            ) : (
              <>
                <Text mono size="xs" variant="secondary" className="uppercase tracking-widest">
                  HH GOA 2026 / GENERATOR / SUCCESS
                </Text>
                <Heading level="h1" className="uppercase leading-none text-5xl">
                  YOUR {format === "pfp" ? "PFP" : "FRAME"}.<br />READY.
                </Heading>
              </>
            )}
          </div>

          {(() => {
            const activeTemplate = getTemplate(builderData.templateId);
            const aspectRatioStyle = format === "builder" ? {
              aspectRatio: `${activeTemplate.config.width} / ${activeTemplate.config.height}`
            } : undefined;

            return (
              <div 
                className={`w-full max-w-[1600px] animate-fade-in bg-bg-surface border border-border flex items-center justify-center overflow-hidden ${format === 'pfp' ? 'max-w-md aspect-square rounded-full' : ''}`}
                style={aspectRatioStyle}
              >
                 {generatedUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={generatedUrl} alt="Generated Builder ID" className="w-full h-full object-contain shadow-2xl" />
                 ) : (
                    <div className="animate-pulse w-full h-full bg-bg-inverse/5" />
                 )}
              </div>
            );
          })()}

          <div className="w-full max-w-sm animate-reveal-up flex flex-col gap-4 mt-8">
             <Button size="lg" fullWidth onClick={handleDownload} disabled={!generatedUrl}>
               DOWNLOAD PNG
               <span className="ml-2 font-mono">↓</span>
             </Button>

             <Button variant="outline" size="lg" fullWidth onClick={handleShareToX}>
               SHARE TO X
             </Button>
             
             <button onClick={handleCreateAnother} className="mt-2 text-text-secondary hover:text-text-primary transition-colors focus:outline-none">
               <Text mono size="sm" weight="semibold" className="uppercase tracking-widest">
                 CREATE ANOTHER
               </Text>
             </button>
          </div>
          
        </Container>
      </main>
      <Footer />
    </>
  );
}
