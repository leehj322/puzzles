"use client";

import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/shared/i18n/navigation";

const getBackHref = (pathname: string): string | null => {
  const segments = pathname.split("/").filter(Boolean);

  if (segments[0] === "browse" && segments.length === 2) {
    return "/browse";
  }

  if (segments[0] === "play" && segments.length === 3) {
    return `/browse/${segments[1]}`;
  }

  return null;
};

export const useBackHref = (): string | null => {
  const pathname = usePathname();
  return getBackHref(pathname);
};

export function BackButton({ href }: { href: string }) {
  const t = useTranslations("common");

  return (
    <Link
      href={href}
      aria-label={t("back")}
      className="inline-flex items-center justify-center h-10 w-10 -ml-2 rounded-nav text-fg-muted hover:text-fg hover:bg-surface-warm transition-colors"
    >
      <ChevronLeft aria-hidden className="h-6 w-6" />
    </Link>
  );
}
