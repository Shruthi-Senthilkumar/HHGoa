import React from "react";

type TextSize = "xs" | "sm" | "base" | "lg" | "xl";
type TextVariant = "primary" | "secondary" | "inverse" | "accent";

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  as?: "p" | "span" | "div";
  size?: TextSize;
  variant?: TextVariant;
  weight?: "normal" | "medium" | "semibold";
  mono?: boolean;
  className?: string;
}

const sizeMap: Record<TextSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const variantMap: Record<TextVariant, string> = {
  primary: "text-text-primary",
  secondary: "text-text-secondary",
  inverse: "text-text-inverse",
  accent: "text-color-accent",
};

const weightMap: Record<string, string> = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
};

export function Text({
  children,
  as: Component = "p",
  size = "base",
  variant = "primary",
  weight = "normal",
  mono = false,
  className = "",
  ...props
}: TextProps) {
  return (
    <Component
      className={`${sizeMap[size]} ${variantMap[variant]} ${weightMap[weight]} ${
        mono ? "font-mono" : "font-sans"
      } ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
