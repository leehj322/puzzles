import { useTranslations } from "next-intl";

import { Link } from "@/shared/i18n/navigation";

import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const t = useTranslations("header");
  return (
    <header className="border-b border-border bg-bg">
      <div className="mx-auto max-w-[896px] px-6 h-14 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="font-sans text-ui hover:opacity-80 transition-opacity"
        >
          {t("title")}
        </Link>
        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
