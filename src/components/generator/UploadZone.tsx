"use client";

import React, { useRef, useState, useCallback } from "react";
import { Text } from "../typography/Text";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  error: string | null;
}

export function UploadZone({ onFileSelect, error }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  }, [isDragging]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  }, [onFileSelect]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [onFileSelect]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  }, []);

  return (
    <div className="w-full flex flex-col gap-4">
      <div
        role="button"
        tabIndex={0}
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={handleKeyDown}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`w-full aspect-[4/5] sm:aspect-square flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all duration-300 ${
          isDragging
            ? "border-2 border-text-primary bg-bg-inverse/5"
            : "border border-dashed border-border-inverse hover:bg-bg-inverse/5"
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/jpeg,image/png,image/heic,image/heif"
          className="hidden"
          aria-label="Upload photo"
        />
        
        <div className="space-y-6 pointer-events-none">
          <Text size="lg" className="uppercase tracking-widest max-w-[12rem] mx-auto leading-tight">
            DROP YOUR PHOTO<br />OR<br />CHOOSE FROM DEVICE
          </Text>
          <Text mono size="xs" variant="secondary" className="uppercase tracking-widest">
            JPG / PNG / HEIC
          </Text>
        </div>
      </div>

      {error && (
        <div className="animate-reveal-up" role="alert">
          <Text mono size="sm" className="text-color-accent uppercase">
            {error}
          </Text>
        </div>
      )}
    </div>
  );
}
