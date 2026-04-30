"use client";

import { Toaster as SonnerToaster, type ToasterProps } from "sonner";

const baseToastClass = [
  "group toast",
  "flex items-start gap-3",
  "rounded-card border border-border",
  "bg-surface text-fg",
  "shadow-(--shadow-md)",
  "px-4 py-3",
  "font-sans text-body",
].join(" ");

const toastClassNames: NonNullable<
  NonNullable<ToasterProps["toastOptions"]>["classNames"]
> = {
  toast: baseToastClass,
  title: "font-sans font-semibold text-body text-fg",
  description: "font-sans text-small text-fg-muted",
  icon: "shrink-0 [&>svg]:h-5 [&>svg]:w-5",
  closeButton:
    "rounded-icon border border-border bg-surface text-fg-muted hover:bg-surface-warm hover:text-fg transition-colors",
  actionButton:
    "rounded-button bg-accent text-accent-fg font-semibold px-3 py-1.5 text-small",
  cancelButton:
    "rounded-button bg-surface-warm text-fg-muted font-semibold px-3 py-1.5 text-small hover:text-fg transition-colors",
  success: "border-success/40",
  error: "border-danger/50",
  warning: "border-warning/50",
  info: "border-info/50",
};

export function Toaster(props: ToasterProps) {
  return (
    <SonnerToaster
      position="top-center"
      duration={3000}
      offset={20}
      visibleToasts={3}
      closeButton={false}
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
