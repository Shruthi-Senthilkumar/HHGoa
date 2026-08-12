import React from "react";
import { Heading } from "../typography/Heading";
import { Text } from "../typography/Text";

export function FrameArtifact() {
  return (
    <div className="relative aspect-[4/5] w-full max-w-md border border-text-primary bg-bg-surface overflow-hidden group">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 bg-gray-200 grayscale opacity-50 mix-blend-multiply group-hover:scale-105 transition-transform duration-1000 ease-out" />
      
      {/* Decorative Grid Lines */}
      <div className="absolute top-1/4 left-0 right-0 h-px bg-text-primary/10" />
      <div className="absolute bottom-1/4 left-0 right-0 h-px bg-text-primary/10" />
      <div className="absolute left-1/4 top-0 bottom-0 w-px bg-text-primary/10" />
      
      {/* Frame Content */}
      <div className="relative h-full w-full p-4 flex flex-col justify-between">
        {/* Top bar */}
        <div className="flex justify-between items-start">
          <Heading level="h3" size="2xl" className="uppercase leading-none">
            HH GOA<br />2026
          </Heading>
          <Text mono size="xs" className="uppercase rotate-90 origin-top-right translate-y-4">
            B-ID // 001
          </Text>
        </div>

        {/* Bottom info */}
        <div className="space-y-1">
          <div className="border-t border-text-primary/30 pt-2 flex justify-between items-end">
            <div>
              <Text mono size="xs" variant="secondary" className="uppercase">
                Name
              </Text>
              <Heading level="h4" size="xl" className="uppercase">
                BUILDER
              </Heading>
            </div>
            <div className="text-right">
              <Text mono size="xs" variant="secondary" className="uppercase">
                Class
              </Text>
              <Text mono weight="semibold" className="uppercase text-color-accent">
                ENGINEER
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
