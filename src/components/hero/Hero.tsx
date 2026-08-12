import React from "react";
import Link from "next/link";
import { Container } from "../layout/Container";
import { Heading } from "../typography/Heading";
import { Text } from "../typography/Text";
import { Button } from "../buttons/Button";
import { FrameArtifact } from "./FrameArtifact";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] w-full pt-12 pb-24 md:pt-24 flex flex-col justify-center overflow-hidden border-b border-border">
      <Container className="relative z-10">
        
        {/* Mobile Layout: Stacked */}
        <div className="flex flex-col gap-12 md:hidden">
          <div className="space-y-6 animate-reveal-up">

            <Heading level="h1" className="uppercase leading-[0.9] text-[clamp(3.5rem,13vw,5rem)]">
              YOU<br />BUILT IT.<br />NOW<br />FRAME IT.
            </Heading>
          </div>

          <div className="w-full flex justify-center animate-fade-in delay-200">
            <FrameArtifact />
          </div>

          <div className="space-y-8 animate-reveal-up delay-300">
            <div className="space-y-4 max-w-sm">
              <Text size="lg">
                Turn your HH Goa 2026 moment into a frame worth keeping.
              </Text>
              <div className="flex flex-wrap gap-x-3 gap-y-2">
                <Text mono size="xs" variant="secondary" className="whitespace-nowrap">NO SIGNUP /</Text>
                <Text mono size="xs" variant="secondary" className="whitespace-nowrap">INSTANT GENERATION /</Text>
                <Text mono size="xs" variant="secondary" className="whitespace-nowrap">READY TO SHARE</Text>
              </div>
            </div>

            <Link href="/generator" className="inline-block w-full">
              <Button size="lg" fullWidth className="group">
                CREATE YOUR FRAME 
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Desktop Layout: Asymmetric */}
        <div className="hidden md:grid grid-cols-12 gap-8 items-start">
          
          <div className="col-span-7 lg:col-span-6 flex flex-col pt-12 animate-reveal-up">

            <Heading level="h1" className="uppercase leading-[0.85] text-[clamp(5rem,8vw,8rem)] mb-12">
              YOU<br />BUILT IT.<br />NOW<br />FRAME IT.
            </Heading>

            <div className="space-y-6 max-w-md">
              <Text size="xl">
                Turn your HH Goa 2026 moment into a frame worth keeping.
              </Text>
              
              <div className="flex flex-wrap gap-x-3 gap-y-2">
                <Text mono size="xs" variant="secondary">NO SIGNUP /</Text>
                <Text mono size="xs" variant="secondary">INSTANT GENERATION /</Text>
                <Text mono size="xs" variant="secondary">READY TO SHARE</Text>
              </div>

              <div className="pt-4">
                <Link href="/generator" className="inline-block">
                  <Button size="lg" className="group text-lg px-10 py-5">
                    CREATE YOUR FRAME 
                    <span className="ml-3 font-mono group-hover:translate-x-2 transition-transform">→</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-span-5 lg:col-span-5 lg:col-start-8 flex justify-end animate-fade-in delay-200">
            <div className="w-full max-w-lg origin-top-right scale-100 xl:scale-110">
              <FrameArtifact />
            </div>
          </div>

        </div>

      </Container>
    </section>
  );
}
