import { forwardRef, type ButtonHTMLAttributes } from "react";

import { cn } from "@/shared/lib/cn";

type Variant = "primary" | "outlined" | "ghost";
type Size = "md" | "sm";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const baseClasses =
  "inline-flex items-center justify-center rounded-button font-sans transition-transform duration-200 ease-[var(--ease-out-puzzle)] motion-reduce:transition-none disabled:opacity-50 disabled:pointer-events-none";

const sizeClasses: Record<Size, string> = {
  md: "h-10 px-[14px] text-body",
  sm: "h-8 px-[12px] text-small",
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-fg text-bg hover:bg-bg hover:text-fg hover:scale-110 active:bg-active active:text-bg active:scale-[0.85] motion-reduce:hover:scale-100 motion-reduce:active:scale-100 motion-reduce:hover:opacity-90",
  outlined:
    "bg-transparent text-fg border border-fg hover:scale-110 active:scale-[0.85] motion-reduce:hover:scale-100 motion-reduce:active:scale-100 motion-reduce:hover:opacity-90",
  ghost:
    "bg-transparent text-fg hover:bg-surface-warm hover:scale-110 active:scale-[0.85] motion-reduce:hover:scale-100 motion-reduce:active:scale-100",
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
