import React from "react";
import { Container } from "../layout/Container";
import { Text } from "../typography/Text";

export function Footer() {
  return (
    <footer className="w-full border-t border-[#f6f3eb]/20 bg-[#03331e] py-8 text-[#f6f3eb]">
      <Container>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <span className="font-display font-extrabold text-[#ffcd00] tracking-wider text-base">
              HH GOA 2026
            </span>
            <span className="font-mono text-xs text-[#f6f3eb]/60">
              © 2026 2:47 PM STUDIO
            </span>
          </div>

          <div className="flex items-center gap-4 sm:items-end">
            <span className="font-mono text-xs text-[#f6f3eb]/80 uppercase tracking-widest">
              BUILDER FRAME GENERATOR
            </span>
            <span className="font-mono text-xs text-white bg-[#e60067] font-bold px-2 py-0.5 uppercase tracking-wider rounded-sm">
              #FrameInGoa
            </span>
          </div>

        </div>
      </Container>
    </footer>
  );
}
