import { useTranslations } from "next-intl";

import { Link } from "@/shared/i18n/navigation";

import { BackButton } from "./back-button";
import { LocaleSwitcher } from "./locale-switcher";
import { LogoMark } from "./logo-mark";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const t = useTranslations("header");
  return (
    <header>
      <div className="border-b border-border bg-bg">
        <div className="mx-auto max-w-4xl px-6 h-14 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-h4 font-semibold hover:opacity-80 transition-opacity"
          >
            <LogoMark className="h-7 w-7" />
            {t("title")}
          </Link>
          <div className="flex items-center gap-3">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
      <BackButton />
    </header>
  );
}
