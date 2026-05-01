"use client";

import { useEffect } from "react";

import { useGame2048Store } from "../model/game-2048-store";

import { Game2048Board } from "./board";
import { Game2048OverModal } from "./game-over-modal";
import { Game2048Hud } from "./hud";

export function Game2048PlayView() {
  const init = useGame2048Store((s) => s.init);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <main className="px-4 pt-4 pb-8 sm:pt-6 sm:pb-12">
      <div className="mx-auto flex flex-col items-center gap-6">
        <Game2048Hud />
        <Game2048Board />
      </div>
      <Game2048OverModal />
    </main>
  );
}
