"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/shared/lib/cn";

import {
  useNonogramStore,
  type NonogramAction,
  type NonogramTool,
} from "../model/nonogram-store";

/**
 * Maps an input gesture (primary vs secondary mouse button) and the active
 * tool to the action applied to the cell. Default tool ("fill"): left=fill,
 * right=mark. Inverted tool ("mark"): left=mark, right=fill.
 */
const actionFor = (
  tool: NonogramTool,
  button: "primary" | "secondary",
): NonogramAction => {
  if (tool === "fill") return button === "primary" ? "fill" : "mark";
  return button === "primary" ? "mark" : "fill";
};

export function NonogramBoard() {
  const rows = useNonogramStore((s) => s.rows);
  const cols = useNonogramStore((s) => s.cols);
  const cells = useNonogramStore((s) => s.cells);
  const hints = useNonogramStore((s) => s.hints);
  const tool = useNonogramStore((s) => s.tool);
  const toggleCell = useNonogramStore((s) => s.toggleCell);

  const maxRowHintLen = hints.rows.reduce((m, h) => Math.max(m, h.length), 0);
  const maxColHintLen = hints.cols.reduce((m, h) => Math.max(m, h.length), 0);

  // The action is locked at pointer-down and reused for the rest of the
  // drag, so dragging across cells doesn't flip between fill/mark.
  const dragRef = useRef<{
    visited: Set<number>;
    action: NonogramAction;
  } | null>(null);
  const [dragging, setDragging] = useState(false);

  const onCellInteract = useCallback(
    (r: number, c: number) => {
      const drag = dragRef.current;
      if (!drag) return;
      const idx = r * cols + c;
      if (drag.visited.has(idx)) return;
      drag.visited.add(idx);
      toggleCell(r, c, drag.action);
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

  // Cell size scales with viewport. The horizontal budget reserves ~6rem
  // for row hints; the vertical budget leaves room for hud/pad. Mobile
  // (~390px wide) lands around 28-32px per cell for a 10-wide board, up
  // from ~24px before. Capped at 56px so desktops don't get cartoonish
  // tiles on small puzzles.
  const cellPx =
    `clamp(20px, min((96vw - 6rem) / ${cols}, (70vh - 8rem) / ${rows}), 56px)`;

  return (
    <div
      className="mx-auto select-none touch-none"
      style={{
        display: "inline-grid",
        gridTemplateColumns: `auto auto`,
        gridTemplateRows: `auto auto`,
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
                onContextMenu={(e) => e.preventDefault()}
                onPointerDown={(e) => {
                  // Touch / pen always behave as primary; mouse middle/back
                  // buttons are ignored.
                  let button: "primary" | "secondary" | null = null;
                  if (e.pointerType !== "mouse") button = "primary";
                  else if (e.button === 0) button = "primary";
                  else if (e.button === 2) button = "secondary";
                  if (button === null) return;

                  e.preventDefault();
                  (e.target as Element).releasePointerCapture?.(e.pointerId);
                  dragRef.current = {
                    visited: new Set(),
                    action: actionFor(tool, button),
                  };
                  setDragging(true);
                  onCellInteract(r, c);
                }}
                onPointerEnter={() => {
                  if (dragRef.current) onCellInteract(r, c);
                }}
                className={cn(
                  "relative flex items-center justify-center bg-bg",
                  "border-r border-b border-border hover:bg-surface-warm",
                  thickRight && "border-r-2 border-r-fg/50",
                  thickBottom && "border-b-2 border-b-fg/50",
                  c === cols - 1 && "border-r-0",
                  r === rows - 1 && "border-b-0",
                  "focus:outline-none",
                )}
              >
                {cell === "filled" && (
                  <span
                    aria-hidden
                    className="absolute inset-[12%] rounded-[15%] bg-fg transition-transform duration-75 ease-(--ease-bounce)"
                  />
                )}
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

