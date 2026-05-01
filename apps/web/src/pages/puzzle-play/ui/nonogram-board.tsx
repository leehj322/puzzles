"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/shared/lib/cn";

import { useNonogramStore, type NonogramCell } from "../model/nonogram-store";

export function NonogramBoard() {
  const rows = useNonogramStore((s) => s.rows);
  const cols = useNonogramStore((s) => s.cols);
  const cells = useNonogramStore((s) => s.cells);
  const hints = useNonogramStore((s) => s.hints);
  const tool = useNonogramStore((s) => s.tool);
  const toggleCell = useNonogramStore((s) => s.toggleCell);

  const maxRowHintLen = hints.rows.reduce((m, h) => Math.max(m, h.length), 0);
  const maxColHintLen = hints.cols.reduce((m, h) => Math.max(m, h.length), 0);

  const dragRef = useRef<{ visited: Set<number> } | null>(null);
  const [dragging, setDragging] = useState(false);

  const onCellInteract = useCallback(
    (r: number, c: number) => {
      const idx = r * cols + c;
      if (dragRef.current?.visited.has(idx)) return;
      dragRef.current?.visited.add(idx);
      toggleCell(r, c);
    },
    [cols, toggleCell],
  );

  useEffect(() => {
    const onUp = () => {
      dragRef.current = null;
      setDragging(false);
    };
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  if (rows === 0 || cols === 0) return null;

  const cellPx = `clamp(14px, min(${Math.floor(70 / cols)}vw, ${Math.floor(60 / rows)}vh), 44px)`;

  return (
    <div
      className="select-none touch-none"
      style={{
        display: "grid",
        gridTemplateColumns: `auto 1fr`,
        gridTemplateRows: `auto 1fr`,
      }}
    >
      <div />
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${cellPx})`,
        }}
      >
        {hints.cols.map((hint, c) => (
          <div
            key={c}
            className={cn(
              "flex flex-col items-center justify-end gap-0.5 pb-1 font-mono text-fg-muted",
              "text-[clamp(9px,1.6vw,13px)] leading-none tabular-nums",
            )}
            style={{ minHeight: `calc(${maxColHintLen} * 1.1em + 0.25rem)` }}
          >
            {hint.map((n, i) => (
              <span key={i} className={n === 0 ? "opacity-30" : ""}>
                {n}
              </span>
            ))}
          </div>
        ))}
      </div>

      <div
        className="grid"
        style={{
          gridTemplateRows: `repeat(${rows}, ${cellPx})`,
        }}
      >
        {hints.rows.map((hint, r) => (
          <div
            key={r}
            className={cn(
              "flex flex-row items-center justify-end gap-1 pr-2 font-mono text-fg-muted",
              "text-[clamp(9px,1.6vw,13px)] leading-none tabular-nums",
            )}
            style={{ minWidth: `calc(${maxRowHintLen} * 1.6em + 0.5rem)` }}
          >
            {hint.map((n, i) => (
              <span key={i} className={n === 0 ? "opacity-30" : ""}>
                {n}
              </span>
            ))}
          </div>
        ))}
      </div>

      <div
        role="grid"
        aria-label="Nonogram board"
        className="grid border-2 border-fg/70 rounded-tile overflow-hidden bg-bg"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${cellPx})`,
          gridTemplateRows: `repeat(${rows}, ${cellPx})`,
        }}
        onPointerLeave={() => {
          if (!dragging) return;
        }}
      >
        {cells.flatMap((row, r) =>
          row.map((cell, c) => {
            const thickRight = (c + 1) % 5 === 0 && c !== cols - 1;
            const thickBottom = (r + 1) % 5 === 0 && r !== rows - 1;
            return (
              <button
                key={`${r}-${c}`}
                type="button"
                role="gridcell"
                aria-label={`R${r + 1}C${c + 1} ${cell}`}
                onPointerDown={(e) => {
                  e.preventDefault();
                  (e.target as Element).releasePointerCapture?.(e.pointerId);
                  dragRef.current = { visited: new Set() };
                  setDragging(true);
                  onCellInteract(r, c);
                }}
                onPointerEnter={() => {
                  if (dragRef.current) onCellInteract(r, c);
                }}
                className={cn(
                  "relative flex items-center justify-center",
                  "border-r border-b border-border",
                  thickRight && "border-r-2 border-r-fg/50",
                  thickBottom && "border-b-2 border-b-fg/50",
                  c === cols - 1 && "border-r-0",
                  r === rows - 1 && "border-b-0",
                  cellBg(cell, tool),
                  "transition-colors duration-75",
                  "focus:outline-none",
                )}
              >
                {cell === "marked" && (
                  <span className="font-mono text-fg-muted text-[clamp(10px,2vw,16px)] leading-none">
                    ×
                  </span>
                )}
              </button>
            );
          }),
        )}
      </div>
    </div>
  );
}

const cellBg = (cell: NonogramCell, _tool: string): string => {
  if (cell === "filled") return "bg-fg hover:bg-fg";
  if (cell === "marked") return "bg-bg hover:bg-surface-warm";
  return "bg-bg hover:bg-surface-warm";
};
