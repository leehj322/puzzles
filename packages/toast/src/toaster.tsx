"use client";

import { Toaster as SonnerToaster, type ToasterProps } from "sonner";

const toastBase = [
  "group toast",
  "relative overflow-hidden",
  "flex items-start gap-3",
  "rounded-card border-2 border-border",
  "bg-surface text-fg",
  "px-5 py-4",
  "font-sans text-body",
  "shadow-[0_12px_28px_rgba(180,168,140,0.18)]",
  "before:absolute before:inset-y-0 before:left-0 before:w-[4px] before:bg-accent",
].join(" ");

const iconPill = [
  "shrink-0 grid place-items-center",
  "h-10 w-10 rounded-icon",
  "bg-accent-soft text-fg",
  "[&>svg]:h-5 [&>svg]:w-5",
].join(" ");

const toastClassNames: NonNullable<
  NonNullable<ToasterProps["toastOptions"]>["classNames"]
> = {
  toast: toastBase,
  title: "font-display text-body font-semibold text-fg leading-snug",
  description: "font-sans text-small text-fg-muted mt-0.5 leading-snug",
  icon: iconPill,
  closeButton:
    "rounded-icon border-2 border-border bg-surface text-fg-muted hover:bg-surface-warm hover:text-fg transition-colors",
  actionButton:
    "rounded-button bg-accent text-accent-fg font-semibold px-3 py-1.5 text-small shadow-(--shadow-key) hover:-translate-y-px active:translate-y-0.5 active:shadow-none transition-transform",
  cancelButton:
    "rounded-button bg-surface-warm text-fg-muted font-semibold px-3 py-1.5 text-small hover:text-fg transition-colors",
  success:
    "before:bg-success [&_[data-icon]]:bg-success/20 border-success/40",
  error:
    "before:bg-danger [&_[data-icon]]:bg-danger/20 border-danger/40",
  warning:
    "before:bg-warning [&_[data-icon]]:bg-warning/30 border-warning/50",
  info:
    "before:bg-info [&_[data-icon]]:bg-info/20 border-info/40",
};

export function Toaster(props: ToasterProps) {
  return (
    <SonnerToaster
      position="top-center"
      duration={3000}
      offset={20}
      visibleToasts={3}
      closeButton={false}
      style={
        {
          "--normal-bg": "var(--surface)",
          "--normal-text": "var(--fg)",
          "--normal-border": "var(--border)",
          "--success-bg": "var(--surface)",
          "--success-text": "var(--fg)",
          "--success-border": "var(--border)",
          "--error-bg": "var(--surface)",
          "--error-text": "var(--fg)",
          "--error-border": "var(--border)",
          "--warning-bg": "var(--surface)",
          "--warning-text": "var(--fg)",
          "--warning-border": "var(--border)",
          "--info-bg": "var(--surface)",
          "--info-text": "var(--fg)",
          "--info-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
      toastOptions={{
        ...props.toastOptions,
        classNames: {
          ...toastClassNames,
          ...props.toastOptions?.classNames,
        },
      }}
    />
  );
}
