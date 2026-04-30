import { forwardRef, type ButtonHTMLAttributes } from "react";

import { cn } from "@/shared/lib/cn";

type Variant = "primary" | "outlined" | "ghost";
type Size = "md" | "sm";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const baseClasses =
  "inline-flex items-center justify-center rounded-button font-sans font-semibold transition-[transform,box-shadow] duration-200 ease-(--ease-bounce) motion-reduce:transition-none disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none";

const sizeClasses: Record<Size, string> = {
  md: "h-11 px-5 text-body",
  sm: "h-9 px-4 text-small",
};

const bouncePress =
  "hover:scale-[1.04] hover:-translate-y-px active:scale-[0.96] active:translate-y-0.5 motion-reduce:hover:scale-100 motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100 motion-reduce:active:translate-y-0 motion-reduce:hover:opacity-90";

const variantClasses: Record<Variant, string> = {
  primary: cn(
    "bg-accent text-accent-fg shadow-(--shadow-key) hover:shadow-(--shadow-key-hover) active:shadow-none",
    bouncePress,
  ),
  outlined: cn(
    "bg-surface text-fg border-2 border-border hover:border-accent hover:bg-accent-soft",
    bouncePress,
  ),
  ghost: cn(
    "bg-transparent text-fg-muted hover:bg-surface-warm hover:text-fg",
    bouncePress,
  ),
};

export const buttonClass = ({
  variant = "primary",
  size = "md",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}): string =>
  cn(baseClasses, sizeClasses[size], variantClasses[variant], className);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", type, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type ?? "button"}
        className={buttonClass({ variant, size, className })}
        {...props}
      />
    );
  },
);
