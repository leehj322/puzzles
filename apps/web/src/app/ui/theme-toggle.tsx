"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { cn } from "@/shared/lib/cn";

export function ThemeToggle() {
  const t = useTranslations("header");
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const label = isDark ? t("lightMode") : t("darkMode");

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "h-8 w-8 inline-flex items-center justify-center rounded-nav",
        "text-fg hover:bg-surface-warm transition-colors",
        "border border-border",
      )}
    >
      <span aria-hidden className="text-base leading-none">
        {mounted ? (isDark ? "☼" : "☾") : "·"}
      </span>
    </button>
  );
}
