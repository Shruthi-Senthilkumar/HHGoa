import React from "react";
import Link from "next/link";
import { Container } from "./Container";
import { Text } from "../typography/Text";

interface HeaderProps {
  action?: "create" | "back";
}

export function Header({ action = "create" }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#f6f3eb]/15 bg-[#075936]/95 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Left: Brand */}
          <div className="flex items-center">
            <Link href="/" className="group flex items-center gap-3 hover:opacity-90 transition-opacity">
              {/* Left block: Year badge + HH GOA */}
              <div className="flex flex-col items-center leading-none gap-0.5 group-hover:scale-105 transition-transform duration-300">
                <span className="bg-[#e60067] text-white text-[9px] font-extrabold uppercase tracking-[0.18em] px-2.5 py-1 rounded-sm w-full text-center group-hover:bg-[#ffcd00] group-hover:text-[#04391e] transition-colors duration-300" style={{ fontFamily: "'Inter', sans-serif" }}>
                  2026
                </span>
                <span className="text-[#ffcd00] group-hover:text-white transition-colors duration-300 animate-pulse" style={{ fontFamily: "'Fredoka One', cursive", fontSize: "0.75rem", letterSpacing: "0.08em", lineHeight: 1 }}>
                  HH GOA
                </span>
              </div>

              {/* Thin vertical divider */}
              <div className="w-px h-7 bg-[#f6f3eb]/20" />

              {/* Right: 2:47PM STUDIO combined */}
              <div className="flex flex-col leading-none">
                <span className="text-[#ffcd00] group-hover:text-white transition-colors" style={{ fontFamily: "'Fredoka One', cursive", fontSize: "1.2rem", lineHeight: 1 }}>
                  2:47<span style={{ fontSize: "0.75rem" }}>PM</span>
                </span>
                <span className="text-[#ffcd00]/70 uppercase tracking-[0.3em]" style={{ fontFamily: "'Fredoka One', cursive", fontSize: "0.6rem", lineHeight: 1.2 }}>
                  STUDIO
                </span>
              </div>
            </Link>
          </div>


          {/* Right: CTA */}
          <div className="flex items-center justify-end">
            {action === "create" ? (
              <Link href="/generator" className="group flex items-center gap-2 bg-[#ffcd00] text-[#04391e] px-5 py-2.5 rounded-full font-sans font-bold text-sm uppercase tracking-wide hover:bg-[#e60067] hover:text-white hover:shadow-[0_0_15px_rgba(230,0,103,0.5)] hover:scale-105 transition-all duration-300">
                <span>CREATE FRAME</span>
                <span className="font-sans text-sm group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            ) : (
              <Link href="/" className="group flex items-center gap-2 bg-white/10 text-[#f6f3eb] px-5 py-2.5 rounded-full font-sans font-bold text-sm uppercase tracking-wide hover:bg-[#ffcd00] hover:text-[#04391e] hover:shadow-[0_0_15px_rgba(255,205,0,0.4)] hover:scale-105 transition-all duration-300 border border-white/20">
                <span className="group-hover:-translate-x-1 transition-transform font-sans">←</span>
                <span>BACK</span>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}

