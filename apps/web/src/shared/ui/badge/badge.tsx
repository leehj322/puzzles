import { type HTMLAttributes } from "react";

import { cn } from "@/shared/lib/cn";

type Tone = "neutral" | "muted";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

const toneClasses: Record<Tone, string> = {
  neutral: "bg-fg text-bg",
  muted: "bg-surface-warm text-fg-muted border border-border",
};

export function Badge({
  className,
  tone = "neutral",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 font-mono text-mono uppercase tracking-[0.6px] rounded-button",
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  );
}
