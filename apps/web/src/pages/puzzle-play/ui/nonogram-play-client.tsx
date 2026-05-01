"use client";

import { useEffect } from "react";

import { type NonogramPuzzle } from "@puzzles/core";

import { useNonogramStore } from "../model/nonogram-store";

import { NonogramBoard } from "./nonogram-board";
import { NonogramHud } from "./nonogram-hud";
import { NonogramPad } from "./nonogram-pad";
import { NonogramWinModal } from "./nonogram-win-modal";

export function NonogramPlayClient({ puzzle }: { puzzle: NonogramPuzzle }) {
  const init = useNonogramStore((s) => s.init);

  useEffect(() => {
    init(puzzle);
  }, [init, puzzle]);

  return (
    <main className="px-4 pt-4 pb-8 sm:pt-6 sm:pb-12">
      <div className="mx-auto flex flex-col items-center gap-5">
        <NonogramHud
          difficulty={puzzle.difficulty}
          rows={puzzle.rows}
          cols={puzzle.cols}
        />
        <NonogramBoard />
        <NonogramPad />
      </div>
      <NonogramWinModal />
    </main>
  );
}
