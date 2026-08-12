import React from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-bg-inverse text-text-inverse border border-bg-inverse hover:bg-color-accent hover:border-color-accent hover:text-white",
  secondary:
    "bg-bg-surface text-text-primary border border-transparent hover:bg-gray-100",
  outline:
    "bg-transparent text-text-primary border border-border-inverse hover:bg-bg-inverse hover:text-text-inverse",
  ghost:
    "bg-transparent text-text-primary border border-transparent hover:bg-gray-100",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-8 py-4 text-lg",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-display font-medium rounded-none transition-fast focus:outline-none focus:ring-2 focus:ring-color-accent focus:ring-offset-2 focus:ring-offset-bg-base disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide";

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${
          sizeStyles[size]
        } ${fullWidth ? "w-full" : ""} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
