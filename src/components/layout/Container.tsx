import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  as?: React.ElementType;
}

export function Container({
  children,
  className = "",
  as: Component = "div",
  ...props
}: ContainerProps) {
  return (
    <Component
      className={`mx-auto w-full max-w-[var(--container-max)] px-4 sm:px-6 lg:px-8 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
