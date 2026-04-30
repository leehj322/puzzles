import Image from "next/image";

import { type PuzzleImage } from "@puzzles/core";

import { Link } from "@/shared/i18n/navigation";
import { Badge } from "@/shared/ui/badge";

export function PuzzleImageCard({
  puzzleType,
  image,
}: {
  puzzleType: string;
  image: PuzzleImage;
}) {
  return (
    <Link
      href={`/play/${puzzleType}/${image.id}`}
      className="group block focus-visible:outline-none"
    >
      <div className="bg-surface border border-border rounded-card shadow-sm overflow-hidden transition-[transform,box-shadow] duration-200 ease-(--ease-bounce) motion-reduce:transition-none group-hover:scale-[1.02] group-hover:-translate-y-0.5 group-hover:shadow-md group-hover:border-border-strong motion-reduce:group-hover:scale-100 motion-reduce:group-hover:translate-y-0">
        <div className="relative aspect-square">
          <Image
            src={image.src}
            alt={`${puzzleType} 퍼즐 ${image.size}×${image.size}`}
            fill
            sizes="(max-width: 530px) 100vw, (max-width: 768px) 50vw, 25vw"
            className="object-cover"
            unoptimized
          />
          <span className="absolute right-3 top-3">
            <Badge tone="neutral">{`${image.size}×${image.size}`}</Badge>
          </span>
        </div>
      </div>
    </Link>
  );
}
