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
          <button className="w-full relative overflow-hidden group bg-gradient-to-r from-[#ffcd00] to-[#ff9900] text-[#04391e] px-5 py-4 rounded-xl font-sans font-black text-lg uppercase tracking-wide hover:shadow-[0_0_20px_rgba(255,205,0,0.6)] transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0">
            <div className="relative z-10 flex items-center justify-center gap-2">
              <span>GENERATE PFP</span>
              <span className="font-mono group-hover:translate-x-2 transition-transform">→</span>
            </div>
            {/* Shimmer effect */}
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shimmer" />
          </button>
        </Link>
      ) : (
        <Link href="/generator/builder" className="w-full">
          <button className="w-full relative overflow-hidden group bg-gradient-to-r from-[#ffcd00] to-[#ff9900] text-[#04391e] px-5 py-4 rounded-xl font-sans font-black text-lg uppercase tracking-wide hover:shadow-[0_0_20px_rgba(255,205,0,0.6)] transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0">
            <div className="relative z-10 flex items-center justify-center gap-2">
              <span>CONTINUE</span>
              <span className="font-mono group-hover:translate-x-2 transition-transform">→</span>
            </div>
            {/* Shimmer effect */}
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shimmer" />
          </button>
        </Link>
      )}
    </div>
  );
}
