import { useTranslations } from "next-intl";

import Image from "next/image";

import { type PuzzleImage } from "@puzzles/core";

import { Link } from "@/shared/i18n/navigation";

export function PuzzleImageCard({
  puzzleType,
  image,
}: {
  puzzleType: string;
  image: PuzzleImage;
}) {
  const t = useTranslations();

  return (
    <Link
      href={`/puzzles/${puzzleType}/play/${image.id}`}
      className="group block focus-visible:outline-none"
    >
      <div className="bg-surface-warm border border-border rounded-card overflow-hidden transition-transform duration-200 ease-[var(--ease-out-puzzle)] motion-reduce:transition-none group-hover:scale-[1.02] group-hover:border-border-strong">
        <div className="relative aspect-square">
          <Image
            src={image.src}
            alt={t(image.titleKey)}
            fill
            sizes="(max-width: 530px) 100vw, (max-width: 768px) 50vw, 25vw"
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="px-4 py-3">
          <h3 className="font-sans text-body">{t(image.titleKey)}</h3>
        </div>
      </div>
    </Link>
  );
}
