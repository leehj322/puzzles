import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import {
  Quicksand,
  Fredoka,
  IBM_Plex_Sans_KR,
  Sunflower,
} from "next/font/google";
import { notFound } from "next/navigation";

import { ThemeProvider } from "@/app/providers/theme-provider";
import { Header } from "@/app/ui/header";

import { routing } from "@/shared/i18n/routing";

import type { Metadata } from "next";
import "@/app/styles/globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
  display: "swap",
});

const ibmPlexSansKr = IBM_Plex_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-kr",
  display: "swap",
});

const sunflower = Sunflower({
  weight: ["500", "700"],
  variable: "--font-sunflower",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Puzzles",
  description: "Solve a variety of puzzles",
};

export const generateStaticParams = () =>
  routing.locales.map((locale) => ({ locale }));

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${quicksand.variable} ${fredoka.variable} ${ibmPlexSansKr.variable} ${sunflower.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <NextIntlClientProvider>
            <Header />
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
