import { useTranslations } from "next-intl";

import { Link } from "@/shared/i18n/navigation";
import { buttonClass } from "@/shared/ui/button";

export function HomeView() {
  const t = useTranslations("home");

  return (
    <main className="px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-[896px] flex flex-col gap-10">
        <p className="font-mono text-mono uppercase text-fg-muted">
          {t("eyebrow")}
        </p>
        <h1 className="font-sans text-h2 sm:text-h1 lg:text-display max-w-[800px]">
          {t("title")}
        </h1>
        <p className="font-serif text-body sm:text-lead text-fg-muted max-w-[560px]">
          {t("subtitle")}
        </p>
        <div>
          <Link href="/puzzles" className={buttonClass()}>
            {t("cta")}
          </Link>
        </div>
      </div>
    </main>
  );
}
