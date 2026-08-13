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
    "bg-color-accent text-[#04391e] border-2 border-color-accent hover:bg-color-accent-pink hover:border-color-accent-pink hover:text-white font-bold shadow-md transition-all",
  secondary:
    "bg-bg-surface text-[#04391e] border border-transparent hover:bg-white font-medium",
  outline:
    "bg-transparent text-[#ffcd00] border-2 border-color-accent hover:bg-color-accent hover:text-[#04391e] font-semibold",
  ghost:
    "bg-transparent text-[#f6f3eb] border border-transparent hover:bg-black/20",
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
