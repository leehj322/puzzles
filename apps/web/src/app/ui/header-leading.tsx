"use client";

import { useTranslations } from "next-intl";

import { Link } from "@/shared/i18n/navigation";

import { BackButton, useBackHref } from "./back-button";
import { LogoMark } from "./logo-mark";

export function HeaderLeading() {
  const t = useTranslations("header");
  const backHref = useBackHref();

  if (backHref) {
    return <BackButton href={backHref} />;
  }

  return (
    <Link
      href="/"
      className="flex items-center gap-2 font-display text-h4 font-semibold hover:opacity-80 transition-opacity"
    >
      <LogoMark className="h-7 w-7" />
      {t("title")}
    </Link>
  );
}
