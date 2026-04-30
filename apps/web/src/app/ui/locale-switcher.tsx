"use client";

import { useLocale, useTranslations } from "next-intl";

import { LOCALES, type Locale } from "@puzzles/i18n";

import { usePathname, useRouter } from "@/shared/i18n/navigation";
import { cn } from "@/shared/lib/cn";

export function LocaleSwitcher() {
  const t = useTranslations("header");
  const current = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const setLocale = (next: Locale) => {
    if (next === current) return;
    router.replace(pathname, { locale: next });
  };

  return (
    <div
      role="group"
      aria-label={t("language")}
      className="inline-flex items-center gap-1 font-mono text-mono uppercase"
    >
      {LOCALES.map((locale) => {
        const active = locale === current;
        return (
          <button
            key={locale}
            type="button"
            aria-pressed={active}
            onClick={() => setLocale(locale)}
            className={cn(
              "px-2 h-8 rounded-nav transition-colors",
              active
                ? "bg-fg text-bg"
                : "text-fg-muted hover:text-fg hover:bg-surface-warm",
            )}
          >
            {locale}
          </button>
        );
      })}
    </div>
  );
}
