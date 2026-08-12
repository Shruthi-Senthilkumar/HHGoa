"use client";

import React, { useRef } from "react";
import { Button } from "../buttons/Button";
import { Text } from "../typography/Text";
import Link from "next/link";

import { useGenerator } from "@/context/GeneratorContext";

interface GeneratorActionsProps {
  onFileSelect: (file: File) => void;
  onRemove: () => void;
}

export function GeneratorActions({ onFileSelect, onRemove }: GeneratorActionsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { format } = useGenerator();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-reveal-up w-full max-w-sm">
      <div className="flex items-center gap-6 pt-6 border-t border-border">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/jpeg,image/png,image/heic,image/heif"
          className="hidden"
          aria-label="Change photo"
        />
        
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-color-accent"
        >
          <Text mono size="sm" weight="semibold" className="uppercase">
            CHANGE PHOTO
          </Text>
        </button>
        
        <button 
          onClick={onRemove}
          className="hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-color-accent"
        >
          <Text mono size="sm" variant="secondary" className="uppercase">
            REMOVE
          </Text>
        </button>
      </div>

      {format === "pfp" ? (
        <Link href="/generator/result" className="w-full">
          <Button size="lg" fullWidth className="group">
            GENERATE PFP
            <span className="ml-2 font-mono group-hover:translate-x-1 transition-transform">→</span>
          </Button>
        </Link>
      ) : (
        <Link href="/generator/builder" className="w-full">
          <Button size="lg" fullWidth className="group">
            CONTINUE
            <span className="ml-2 font-mono group-hover:translate-x-1 transition-transform">→</span>
          </Button>
        </Link>
      )}
    </div>
  );
}
