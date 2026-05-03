"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  TARGET_SUM,
  normalizeRect,
  sumRect,
  type FruitBoxRect,
} from "@puzzles/core";

import { cn } from "@/shared/lib/cn";

import { useFruitBoxStore } from "../model/fruit-box-store";

interface DragState {
  pointerId: number;
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
}

const cellFromPointer = (
  el: HTMLElement,
  clientX: number,
  clientY: number,
  rows: number,
  cols: number,
): { row: number; col: number } => {
  const rect = el.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  const col = Math.max(0, Math.min(cols - 1, Math.floor((x / rect.width) * cols)));
  const row = Math.max(0, Math.min(rows - 1, Math.floor((y / rect.height) * rows)));
  return { row, col };
};

export function FruitBoxBoard() {
  const board = useFruitBoxStore((s) => s.board);
  const gameOver = useFruitBoxStore((s) => s.gameOver);
  const startTimer = useFruitBoxStore((s) => s.startTimer);
  const applyRect = useFruitBoxStore((s) => s.applyRect);

  const gridRef = useRef<HTMLDivElement | null>(null);
  const [drag, setDrag] = useState<DragState | null>(null);

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (gameOver) return;
      const el = gridRef.current;
      if (!el) return;
      if (event.pointerType === "mouse" && event.button !== 0) return;
      el.setPointerCapture(event.pointerId);
      const { row, col } = cellFromPointer(
        el,
        event.clientX,
        event.clientY,
        board.rows,
        board.cols,
      );
      startTimer();
      setDrag({
        pointerId: event.pointerId,
        startRow: row,
        startCol: col,
        endRow: row,
        endCol: col,
      });
    },
    [board.rows, board.cols, gameOver, startTimer],
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!drag || event.pointerId !== drag.pointerId) return;
      const el = gridRef.current;
      if (!el) return;
      const { row, col } = cellFromPointer(
        el,
        event.clientX,
        event.clientY,
        board.rows,
        board.cols,
      );
      if (row === drag.endRow && col === drag.endCol) return;
      setDrag({ ...drag, endRow: row, endCol: col });
    },
    [drag, board.rows, board.cols],
  );

  const finishDrag = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!drag || event.pointerId !== drag.pointerId) return;
      const rect: FruitBoxRect = {
        r1: drag.startRow,
        c1: drag.startCol,
        r2: drag.endRow,
        c2: drag.endCol,
      };
      applyRect(rect);
      setDrag(null);
    },
    [drag, applyRect],
  );

  useEffect(() => {
    if (!drag) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrag(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drag]);

  const selectionRect = drag
    ? normalizeRect({
        r1: drag.startRow,
        c1: drag.startCol,
        r2: drag.endRow,
        c2: drag.endCol,
      })
    : null;
  const selectionSum = selectionRect ? sumRect(board, selectionRect) : 0;
  const isTen = selectionSum === TARGET_SUM;

  return (
    <div className="flex w-full flex-col items-center gap-2 select-none">
      <div className="w-full max-w-[min(96vw,820px)] rounded-card bg-fg/5 p-2 dark:bg-surface-warm/60">
        <div
          ref={gridRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          className="relative grid h-full w-full touch-none gap-[2px]"
          style={{
            gridTemplateColumns: `repeat(${board.cols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${board.rows}, minmax(0, 1fr))`,
            aspectRatio: `${board.cols} / ${board.rows}`,
          }}
        >
          {board.cells.map((value, i) => {
            const row = Math.floor(i / board.cols);
            const col = i % board.cols;
            const inSelection =
              selectionRect !== null &&
              row >= selectionRect.r1 &&
              row <= selectionRect.r2 &&
              col >= selectionRect.c1 &&
              col <= selectionRect.c2;
            const cleared = value === 0;
            return (
              <div
                key={i}
                style={{ gridColumn: col + 1, gridRow: row + 1 }}
                className="flex items-center justify-center"
              >
                {!cleared && (
                  <div
                    className={cn(
                      "flex h-[86%] w-[86%] items-center justify-center rounded-full font-display text-[clamp(0.7rem,1.6vw,1rem)] font-semibold transition-colors duration-150",
                      inSelection && isTen
                        ? "bg-accent text-accent-fg dark:bg-accent dark:text-accent-fg"
                        : "bg-peach text-fg dark:bg-accent-soft dark:text-peach",
                    )}
                  >
                    {value}
                  </div>
                )}
              </div>
            );
          })}

          {selectionRect && (
            <div
              aria-hidden
              className={cn(
                "pointer-events-none rounded-tile border-2 transition-colors",
                isTen
                  ? "border-accent bg-accent/10"
                  : "border-fg/20 bg-fg/[0.04]",
              )}
              style={{
                gridColumn: `${selectionRect.c1 + 1} / span ${
                  selectionRect.c2 - selectionRect.c1 + 1
                }`,
                gridRow: `${selectionRect.r1 + 1} / span ${
                  selectionRect.r2 - selectionRect.r1 + 1
                }`,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
