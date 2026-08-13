import React from "react";
import Link from "next/link";
import { Container } from "../layout/Container";
import { Heading } from "../typography/Heading";
import { Text } from "../typography/Text";
import { Button } from "../buttons/Button";
import { FrameArtifact } from "./FrameArtifact";
import { GoaBeachIllustration } from "./GoaBeachIllustration";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] w-full pt-12 pb-24 md:pt-20 flex flex-col justify-center overflow-hidden border-b border-[#f6f3eb]/20 bg-[#075936]">
      {/* Tropical Beach, Sunset & Coconut Trees Background */}
      <GoaBeachIllustration />

      <Container className="relative z-10">
        
        {/* Mobile Layout: Stacked */}
        <div className="flex flex-col gap-10 md:hidden">
          <div className="space-y-4 animate-reveal-up">
            <div className="inline-flex items-center gap-2 bg-[#e60067] text-white px-4 py-2 text-sm font-sans font-bold uppercase tracking-widest rounded-full shadow-lg self-start">
              ✦ HACKER HOUSE GOA 2026 ✦
            </div>

            <Heading level="h1" className="uppercase leading-[0.9] text-[clamp(3rem,12vw,4.5rem)] drop-shadow-md">
              <span className="text-[#ffcd00]">YOU<br />BUILT IT.</span><br />
              <span className="text-[#f6f3eb]">NOW</span><br />
              <span className="text-[#e60067] underline stroke-2">FRAME IT.</span>
            </Heading>
          </div>

          <div className="w-full flex justify-center animate-fade-in delay-200">
            <FrameArtifact />
          </div>

          <div className="space-y-6 animate-reveal-up delay-300">
            <div className="space-y-4 max-w-sm">
              <Text size="lg" className="text-[#f6f3eb] font-medium leading-relaxed drop-shadow">
                Turn your HH Goa 2026 moment into a frame worth keeping.
              </Text>
              <div className="flex flex-wrap gap-3">
                <span className="font-sans text-[13px] text-[#ffcd00] bg-black/30 px-4 py-1.5 rounded-full border border-[#ffcd00]/30 font-medium backdrop-blur-sm shadow-sm tracking-wide">NO SIGNUP</span>
                <span className="font-sans text-[13px] text-[#f6f3eb] bg-black/30 px-4 py-1.5 rounded-full border border-[#f6f3eb]/30 font-medium backdrop-blur-sm shadow-sm tracking-wide">INSTANT GENERATION</span>
                <span className="font-sans text-[13px] text-[#e60067] bg-black/30 px-4 py-1.5 rounded-full border border-[#e60067]/30 font-medium backdrop-blur-sm shadow-sm tracking-wide">READY TO SHARE</span>
              </div>
            </div>

            <Link href="/generator" className="inline-block w-full relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#ffcd00] to-[#e60067] blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <Button size="lg" fullWidth className="relative group text-lg py-4 hover:scale-[1.02] transition-all duration-300 shadow-xl">
                CREATE YOUR FRAME 
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Desktop Layout: Asymmetric */}
        <div className="hidden md:grid grid-cols-12 gap-8 items-center">
          
          <div className="col-span-7 lg:col-span-6 flex flex-col pt-6 animate-reveal-up">
            <div className="mb-4 inline-flex items-center gap-2 bg-[#e60067] text-white px-5 py-2.5 text-[15px] font-sans font-bold uppercase tracking-widest rounded-full shadow-lg self-start">
              ✦ HACKER HOUSE GOA 2026 ✦
            </div>

            <Heading level="h1" className="uppercase leading-[0.88] text-[clamp(4.5rem,7.5vw,7.5rem)] mb-8 drop-shadow-lg">
              <span className="text-[#ffcd00]">YOU<br />BUILT IT.</span><br />
              <span className="text-[#f6f3eb]">NOW</span><br />
              <span className="text-[#e60067]">FRAME IT.</span>
            </Heading>

            <div className="space-y-6 max-w-md">
              <Text size="xl" className="text-[#f6f3eb] font-medium leading-relaxed drop-shadow-sm">
                Turn your HH Goa 2026 moment into an official builder frame worth keeping.
              </Text>
              
              <div className="flex flex-wrap gap-3">
                <span className="font-sans text-[13px] text-[#ffcd00] bg-black/30 px-4 py-1.5 rounded-full border border-[#ffcd00]/30 font-medium backdrop-blur-sm shadow-sm tracking-wide">NO SIGNUP</span>
                <span className="font-sans text-[13px] text-[#f6f3eb] bg-black/30 px-4 py-1.5 rounded-full border border-[#f6f3eb]/30 font-medium backdrop-blur-sm shadow-sm tracking-wide">INSTANT GENERATION</span>
                <span className="font-sans text-[13px] text-[#e60067] bg-black/30 px-4 py-1.5 rounded-full border border-[#e60067]/30 font-medium backdrop-blur-sm shadow-sm tracking-wide">READY TO SHARE</span>
              </div>

              <div className="pt-4">
                <Link href="/generator" className="inline-block relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#ffcd00] to-[#e60067] blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                  <Button size="lg" className="relative group text-xl px-10 py-5 hover:scale-105 transition-all duration-300 shadow-xl">
                    CREATE YOUR FRAME 
                    <span className="ml-3 font-mono group-hover:translate-x-2 transition-transform">→</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-span-5 lg:col-span-5 lg:col-start-8 flex justify-end animate-fade-in delay-200">
            <div className="w-full max-w-lg origin-top-right scale-100 xl:scale-105">
              <FrameArtifact />
            </div>
          </div>

        </div>

      </Container>
    </section>
  );
}
