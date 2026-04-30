import { type HTMLAttributes } from "react";

import { cn } from "@/shared/lib/cn";

type Tone = "neutral" | "muted" | "accent" | "mint" | "peach" | "sky" | "butter" | "rose";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

const toneClasses: Record<Tone, string> = {
  neutral: "bg-fg text-bg",
  muted: "bg-surface-warm text-fg-muted border border-border",
  accent: "bg-accent-soft text-fg",
  mint: "bg-mint/30 text-fg",
  peach: "bg-peach/35 text-fg",
  sky: "bg-sky/35 text-fg",
  butter: "bg-butter/45 text-fg",
  rose: "bg-rose/35 text-fg",
};

export function Badge({
  className,
  tone = "muted",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 font-sans text-small font-semibold rounded-pill",
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  );
}
