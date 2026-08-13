import React from "react";
import { Container } from "../layout/Container";
import { Heading } from "../typography/Heading";
import { Text } from "../typography/Text";

export function Statement() {
  return (
    <section className="relative min-h-[60vh] flex flex-col justify-center py-24 md:py-32 bg-[#03331e] text-[#f6f3eb] overflow-hidden statement-section border-t border-[#f6f3eb]/20">
      {/* Sunset Background Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255, 205, 0, 0.5) 0%, rgba(230, 0, 103, 0.3) 50%, transparent 80%)"
        }}
      />
      
      <Container className="relative z-10 statement-content flex flex-col justify-center h-full w-full">
        
        <div className="flex flex-col md:flex-row md:justify-center lg:justify-end w-full animate-reveal-up">
          <div className="w-full lg:w-3/4 xl:w-2/3 pl-0 lg:pl-12">
            <h2 className="font-display uppercase leading-[0.85] text-[clamp(4rem,14vw,12rem)] font-black tracking-tighter text-[#ffcd00] drop-shadow-lg">
              YOU<br />
              WERE<br />
              <span className="text-[#f6f3eb]">HERE.</span>
            </h2>
            
            <div className="pt-8 flex flex-wrap items-center gap-3">
              <span className="bg-[#e60067] text-white font-mono text-xs px-3 py-1 font-bold uppercase tracking-widest">
                HH GOA 2026
              </span>
              <span className="font-mono text-xs text-[#ffcd00] uppercase tracking-widest bg-black/40 px-3 py-1 border border-[#ffcd00]/40">
                GOA / BUILDER FRAME
              </span>
            </div>
          </div>
        </div>

        <div className="w-full mt-16 lg:mt-24 border-t border-[#f6f3eb]/20 opacity-40"></div>
        
      </Container>
    </section>
  );
}
