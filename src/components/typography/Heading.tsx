import React from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingSize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  level?: HeadingLevel;
  size?: HeadingSize;
  weight?: "normal" | "medium" | "semibold" | "bold" | "extrabold";
  className?: string;
}

const sizeMap: Record<HeadingSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
  "7xl": "text-7xl",
  "8xl": "text-8xl",
};

const weightMap: Record<string, string> = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
};

export function Heading({
  children,
  level = "h2",
  size,
  weight = "bold",
  className = "",
  ...props
}: HeadingProps) {
  const Component = level;

  // Default size mapping if size is not provided
  const defaultSizes: Record<HeadingLevel, HeadingSize> = {
    h1: "5xl",
    h2: "4xl",
    h3: "3xl",
    h4: "2xl",
    h5: "xl",
    h6: "lg",
  };

  const finalSize = size || defaultSizes[level];

  const defaultTextColor = level === "h1" ? "text-text-display" : "text-text-primary";

  return (
    <Component
      className={`font-display tracking-tight ${defaultTextColor} ${sizeMap[finalSize]} ${weightMap[weight]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
