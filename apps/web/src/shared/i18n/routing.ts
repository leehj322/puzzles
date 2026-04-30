import { defineRouting } from "next-intl/routing";

import { DEFAULT_LOCALE, LOCALES } from "@puzzles/i18n";

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
});
