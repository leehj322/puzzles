export type PuzzleImage = {
  id: string;
  titleKey: string;
  src: string;
  size: number;
};

const SLIDING: readonly PuzzleImage[] = [
  { id: "img-1", titleKey: "puzzleList.images.img1", src: "https://picsum.photos/seed/puzzles-1/1024", size: 3 },
  { id: "img-2", titleKey: "puzzleList.images.img2", src: "https://picsum.photos/seed/puzzles-2/1024", size: 4 },
  { id: "img-3", titleKey: "puzzleList.images.img3", src: "https://picsum.photos/seed/puzzles-3/1024", size: 5 },
  { id: "img-4", titleKey: "puzzleList.images.img4", src: "https://picsum.photos/seed/puzzles-4/1024", size: 6 },
];

const PUZZLE_IMAGES_BY_TYPE: Record<string, readonly PuzzleImage[]> = {
  sliding: SLIDING,
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
