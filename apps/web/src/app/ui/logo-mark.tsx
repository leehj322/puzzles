import clsx from "clsx";

const CELL_COLORS = [
  "fill-accent",
  "fill-butter",
  "fill-peach",
  "fill-sky",
  "fill-rose",
  "fill-mint",
  "fill-peach",
  "fill-accent",
  "fill-butter",
] as const;

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={clsx("shrink-0", className)}
      aria-hidden
    >
      {CELL_COLORS.map((color, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        return (
          <rect
            key={i}
            x={col * 8.5}
            y={row * 8.5}
            width={7}
            height={7}
            rx={1.6}
            className={color}
          />
        );
      })}
    </svg>
  );
}
