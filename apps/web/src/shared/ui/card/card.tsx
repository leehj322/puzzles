import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "@/shared/lib/cn";

export type CardProps = HTMLAttributes<HTMLDivElement>;

export const Card = forwardRef<HTMLDivElement, CardProps>((
  { className, ...props },
  ref,
) => {
  return (
    <div
      ref={ref}
      className={cn(
        "bg-surface-warm border border-border rounded-card",
        className,
      )}
      {...props}
    />
  );
});
