import React from "react";
import { Container } from "../layout/Container";
import { Text } from "../typography/Text";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-bg-base py-6 sm:py-8">
      <Container>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          <div className="flex flex-col">
            <Text mono size="sm" weight="semibold" className="uppercase tracking-widest">
              HH GOA
            </Text>
            <Text mono size="sm" variant="secondary" className="uppercase tracking-widest">
              2026
            </Text>
          </div>

          <div className="flex flex-col sm:items-end">
            <Text mono size="sm" className="uppercase tracking-widest">
              FRAME GENERATOR
            </Text>
            <Text mono size="sm" variant="secondary" className="uppercase tracking-widest text-color-accent">
              #FrameInGoa
            </Text>
          </div>

        </div>
      </Container>
    </footer>
  );
}
