"use client";

export type BestRecord = { moves: number; durationMs: number };

const key = (imageId: string) => `puzzles:best:${imageId}`;

const isBetter = (candidate: BestRecord, current: BestRecord): boolean => {
  if (candidate.moves !== current.moves) return candidate.moves < current.moves;
  return candidate.durationMs < current.durationMs;
};

export const loadBest = (imageId: string): BestRecord | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key(imageId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as BestRecord;
    if (
      typeof parsed?.moves !== "number" ||
      typeof parsed?.durationMs !== "number"
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
};

export const saveBest = (
  imageId: string,
  record: BestRecord,
): { record: BestRecord; isNewBest: boolean } => {
  const existing = loadBest(imageId);
  const newBest = !existing || isBetter(record, existing);
  const winner = newBest ? record : existing;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(key(imageId), JSON.stringify(winner));
    } catch {
      // localStorage may be disabled — silently ignore
    }
  }
  return { record: winner, isNewBest: newBest };
};
