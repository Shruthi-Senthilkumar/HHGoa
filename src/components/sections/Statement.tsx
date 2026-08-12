import React from "react";
import { Container } from "../layout/Container";
import { Heading } from "../typography/Heading";
import { Text } from "../typography/Text";

export function Statement() {
  return (
    <section className="relative min-h-[70vh] flex flex-col justify-center py-24 md:py-32 bg-black text-text-inverse overflow-hidden statement-section">
      {/* Background layer ready for future Goa-themed textures/imagery */}
      <div className="absolute inset-0 z-0"></div>
      
      <Container className="relative z-10 statement-content flex flex-col justify-center h-full w-full">
        
        <div className="flex flex-col md:flex-row md:justify-center lg:justify-end w-full animate-reveal-up">
          <div className="w-full lg:w-3/4 xl:w-2/3 pl-0 lg:pl-12">
            <Heading level="h2" className="uppercase leading-[0.85] text-[clamp(4rem,14vw,14rem)] font-black tracking-tighter text-white">
              YOU<br />
              WERE<br />
              HERE.
            </Heading>
            
            <div className="pt-8">
              <Text mono size="xs" className="text-gray-500 uppercase tracking-widest">
                HH GOA 2026 / GOA / BUILDER FRAME
              </Text>
            </div>
          </div>
        </div>

        <div className="w-full mt-24 lg:mt-32 border-t border-color-border-inverse opacity-30 animate-fade-in"></div>
        
      </Container>
    </section>
  );
}
