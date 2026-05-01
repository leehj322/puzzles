"use client";

import { useEffect } from "react";

import { useLightsOutStore } from "../model/lights-out-store";

import { LightsOutBoard } from "./board";
import { LightsOutHud } from "./hud";
import { LightsOutWinModal } from "./win-modal";

export function LightsOutPlayView() {
  const newGame = useLightsOutStore((s) => s.newGame);

  useEffect(() => {
    newGame();
  }, [newGame]);

  return (
    <main className="px-4 pt-4 pb-8 sm:pt-6 sm:pb-12">
      <div className="mx-auto flex flex-col items-center gap-6">
        <LightsOutHud />
        <LightsOutBoard />
      </div>
      <LightsOutWinModal />
    </main>
  );
}
