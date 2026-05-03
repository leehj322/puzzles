"use client";

import { useEffect } from "react";

import { useFruitBoxStore } from "../model/fruit-box-store";

import { FruitBoxBoard } from "./board";
import { FruitBoxGameOverModal } from "./game-over-modal";
import { FruitBoxHud } from "./hud";

export function FruitBoxPlayView() {
  const newGame = useFruitBoxStore((s) => s.newGame);

  useEffect(() => {
    newGame();
  }, [newGame]);

  return (
    <main className="px-4 pt-4 pb-8 sm:pt-6 sm:pb-12">
      <div className="mx-auto flex flex-col items-center gap-4">
        <FruitBoxHud />
        <FruitBoxBoard />
      </div>
      <FruitBoxGameOverModal />
    </main>
  );
}
