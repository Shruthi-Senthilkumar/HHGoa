"use client";

import React from "react";
import { Container } from "../layout/Container";
import { Heading } from "../typography/Heading";
import { Text } from "../typography/Text";
import { UploadZone } from "./UploadZone";
import { FramePreview } from "./FramePreview";
import { GeneratorActions } from "./GeneratorActions";
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
      <section className="flex-1 w-full flex flex-col pt-4 pb-24 md:pt-10 items-center text-center bg-[#075936]">
        <Container className="flex-1 flex flex-col items-center">
          <div className="space-y-4 animate-reveal-up mb-12">
            <h1 className="font-display font-extrabold uppercase leading-none text-5xl md:text-7xl text-[#ffcd00] drop-shadow-md">
              WHAT ARE YOU<br /><span className="text-[#f6f3eb]">MAKING?</span>
            </h1>
          </div>

          <style>{`
            @keyframes float-a {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
            @keyframes float-b {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
            .card-float-a { animation: float-a 5s ease-in-out infinite; }
            .card-float-b { animation: float-b 5s ease-in-out infinite 0.8s; }
          `}</style>
          <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in delay-200">
            <button 
              onClick={() => setFormat("pfp")}
              className="card-float-a flex flex-col items-start p-8 border-2 border-[#f6f3eb]/20 bg-[#f6f3eb] text-[#04391e] hover:border-[#ffcd00] hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group text-left relative overflow-hidden rounded-3xl shadow-xl"
            >
              <span className="font-mono text-xs uppercase tracking-widest mb-4 font-bold text-[#e60067]">
                01 // FORMAT A
              </span>
              
              <div className="flex w-full justify-between items-start mb-4">
                <h2 className="font-display font-black text-3xl md:text-4xl uppercase leading-none text-[#04391e] group-hover:text-[#075936] transition-colors">
                  PFP FRAME
                </h2>
                <div className="w-16 h-16 rounded-full border-4 border-[#075936] group-hover:border-[#e60067] group-hover:scale-110 transition-all duration-300 flex-shrink-0" />
              </div>
              
              <p className="font-sans text-base text-[#33503c] font-medium max-w-xs">
                Your photo, framed for HH Goa. Made to be circular.
              </p>

              {/* Subtle bottom shimmer on hover */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#ffcd00] group-hover:w-full transition-all duration-500" />
            </button>

            <button 
              onClick={() => setFormat("builder")}
              className="card-float-b flex flex-col items-start p-8 border-2 border-[#f6f3eb]/20 bg-[#f6f3eb] text-[#04391e] hover:border-[#ffcd00] hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group text-left w-full relative overflow-hidden aspect-video md:aspect-auto rounded-3xl shadow-xl"
            >
              <span className="font-mono text-xs uppercase tracking-widest mb-4 font-bold text-[#e60067]">
                02 // FORMAT B
              </span>
              
              <div className="flex w-full justify-between items-start mb-4">
                <h2 className="font-display font-black text-3xl md:text-4xl uppercase leading-none text-[#04391e] group-hover:text-[#075936] transition-colors">
                  BUILDER ID
                </h2>
                <div className="w-24 h-16 border-4 border-[#075936] group-hover:border-[#e60067] group-hover:scale-105 transition-all duration-300 flex-shrink-0" />
              </div>
              
              <p className="font-sans text-base text-[#33503c] font-medium max-w-xs">
                Your photo + builder identity. Horizontal format.
              </p>

              {/* Subtle bottom shimmer on hover */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#ffcd00] group-hover:w-full transition-all duration-500" />
            </button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="flex-1 w-full flex flex-col pt-4 pb-12 md:pt-8 bg-[#075936]">
      <Container className="flex-1 flex flex-col h-full">
        
        {/* Workspace Layout */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 h-full">
          
          {/* LEFT: Intro & Controls */}
          <div className="flex flex-col gap-6 order-2 md:order-1 h-full">
            <div className="space-y-4 animate-reveal-up hidden md:block">

              <h1 className="font-display font-extrabold uppercase leading-none text-5xl md:text-6xl text-[#ffcd00]">
                {format === "pfp" ? (
                  <>MAKE<br /><span className="text-[#f6f3eb]">YOUR PFP.</span></>
                ) : (
                  <>YOUR BUILDER<br /><span className="text-[#f6f3eb]">ID CARD.</span></>
                )}
              </h1>
              
              <p className="font-mono text-sm text-[#f6f3eb]/80 uppercase tracking-wider font-semibold">
                MAKE YOUR GOA MOMENT OFFICIAL.
              </p>

              <button 
                onClick={() => setFormat(null)}
                className="text-[#ffcd00] hover:text-white uppercase tracking-widest font-mono text-xs transition-colors font-bold flex items-center gap-2"
              >
                ← SWITCH FORMAT
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-start gap-4">
              {status !== "ready" ? (
                <div className="animate-fade-in w-full max-w-sm">
                  <UploadZone 
                    onFileSelect={handleFileSelect} 
                    error={error} 
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-8 w-full max-w-sm">
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

              <h2 className="font-display font-extrabold uppercase leading-none text-4xl text-[#ffcd00]">
                {format === "pfp" ? (
                  <>MAKE<br /><span className="text-[#f6f3eb]">YOUR PFP.</span></>
                ) : (
                  <>YOUR PHOTO.<br /><span className="text-[#f6f3eb]">YOUR FRAME.</span></>
                )}
              </h2>
              <button 
                onClick={() => setFormat(null)}
                className="text-[#ffcd00] hover:text-white uppercase tracking-widest font-mono text-xs transition-colors mt-2 font-bold"
              >
                ← SWITCH FORMAT
              </button>
            </div>

            <div 
              className={`sticky top-24 mx-auto ${format === "pfp" ? "w-full max-w-md" : "w-full max-w-[280px]"}`}
            >
              {status === "ready" && imageUrl ? (
                <FramePreview />
              ) : (
                <div 
                  className={`w-full border-2 border-[#f6f3eb]/20 bg-[#f6f3eb] flex flex-col items-center justify-center p-8 text-center animate-fade-in relative overflow-hidden ${format === "pfp" ? "rounded-full aspect-square" : "rounded-2xl"}`}
                  style={format !== "pfp" ? { aspectRatio: '638 / 1013' } : undefined}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/goa_placeholder_preview.jpg" alt="Preview Placeholder" className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[20%]" />
                  <span className="font-mono text-sm font-bold text-[#04391e] uppercase tracking-widest relative z-10 bg-[#f6f3eb]/90 px-6 py-3 rounded-full backdrop-blur-md border border-[#04391e]/10 shadow-lg">
                    PREVIEW WILL APPEAR HERE
                  </span>
                </div>
              )}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
