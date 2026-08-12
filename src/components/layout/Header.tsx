import React from "react";
import Link from "next/link";
import { Container } from "./Container";
import { Text } from "../typography/Text";

interface HeaderProps {
  action?: "create" | "back";
}

export function Header({ action = "create" }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-bg-base/90 backdrop-blur-sm">
      <Container>
        <div className="flex h-14 items-center justify-between">
          {/* Left: Brand */}
          <div className="flex items-center gap-2">
            <Link href="/" className="group flex items-center hover:opacity-80 transition-opacity">
              <Text mono weight="semibold" className="text-sm md:text-base">
                HH GOA <span className="hidden md:inline">2026</span>
                <span className="md:hidden">/ 2026</span>
              </Text>
            </Link>
          </div>

          {/* Center: Title (Desktop Only) */}
          <div className="hidden md:flex flex-1 justify-center">
            <Text mono variant="secondary" size="sm" className="tracking-widest">
              FRAME / BUILDER ID
            </Text>
          </div>

          {/* Right: CTA */}
          <div className="flex items-center justify-end">
            {action === "create" ? (
              <Link href="/generator" className="group flex items-center gap-2">
                <Text mono weight="semibold" className="text-sm md:text-base group-hover:text-color-accent transition-colors">
                  CREATE
                </Text>
                <span className="font-mono text-sm md:text-base group-hover:translate-x-1 transition-transform group-hover:text-color-accent">
                  →
                </span>
              </Link>
            ) : (
              <Link href="/" className="group flex items-center gap-2">
                <span className="font-mono text-sm md:text-base group-hover:-translate-x-1 transition-transform group-hover:text-color-accent">
                  ←
                </span>
                <Text mono weight="semibold" className="text-sm md:text-base group-hover:text-color-accent transition-colors">
                  BACK
                </Text>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}

