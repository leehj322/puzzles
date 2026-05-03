"use client";

import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

import { Card } from "../card";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** id of the title element inside `children`, wired to `aria-labelledby`. */
  labelledBy?: string;
  /** Override the inner Card className (size, padding, etc.). */
  className?: string;
  /** Accessible name for the close button. Defaults to "Close". */
  closeLabel?: string;
  children: ReactNode;
}

/**
 * Headless modal. Provides the backdrop, focus container, Escape /
 * backdrop-click dismissal, and a top-right close button. Layout and
 * content are entirely up to the consumer.
 */
export function Modal({
  open,
  onClose,
  labelledBy,
  className,
  closeLabel = "Close",
  children,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal
      aria-labelledby={labelledBy}
      onClick={onClose}
      className="fixed inset-0 z-50 grid place-items-center bg-fg/40 backdrop-blur-sm px-4"
    >
      <Card
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "relative w-full max-w-sm bg-surface p-6 flex flex-col gap-4",
          className,
        )}
      >
        <button
          type="button"
          aria-label={closeLabel}
          onClick={onClose}
          className="absolute top-2 right-2 grid h-12 w-12 place-items-center rounded-full text-fg-muted transition-colors hover:bg-fg/5 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <X size={28} strokeWidth={2} aria-hidden />
        </button>
        {children}
      </Card>
    </div>
  );
}
