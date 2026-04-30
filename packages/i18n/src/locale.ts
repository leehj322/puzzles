export const LOCALES = ["ko", "en"] as const;
export const DEFAULT_LOCALE = "ko";

export type Locale = (typeof LOCALES)[number];

export const isLocale = (value: string): value is Locale =>
  (LOCALES as readonly string[]).includes(value);
