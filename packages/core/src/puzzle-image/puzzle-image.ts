export type PuzzleImage = {
  id: string;
  titleKey: string;
  src: string;
};

const SLIDING_15: readonly PuzzleImage[] = [1, 2, 3, 4].map((i) => ({
  id: `img-${i}`,
  titleKey: `puzzleList.images.img${i}`,
  src: `https://picsum.photos/seed/puzzles-${i}/1024`,
}));

const PUZZLE_IMAGES_BY_TYPE: Record<string, readonly PuzzleImage[]> = {
  "sliding-15": SLIDING_15,
};

export const getPuzzleImages = (
  typeId: string,
): readonly PuzzleImage[] | null => PUZZLE_IMAGES_BY_TYPE[typeId] ?? null;

export const getPuzzleImage = (
  typeId: string,
  imageId: string,
): PuzzleImage | null => {
  const list = PUZZLE_IMAGES_BY_TYPE[typeId];
  if (!list) return null;
  return list.find((img) => img.id === imageId) ?? null;
};
