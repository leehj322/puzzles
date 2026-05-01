export type PuzzleImage = {
  id: string;
  src: string;
  size: number;
};

const SIZES: readonly number[] = [3, 4, 5, 6];
const PER_SIZE = 4;

const buildSlidingImages = (): readonly PuzzleImage[] => {
  const out: PuzzleImage[] = [];
  for (const size of SIZES) {
    for (let i = 1; i <= PER_SIZE; i++) {
      const id = `s${size}-${i}`;
      out.push({
        id,
        src: `https://picsum.photos/seed/puzzles-${id}/1024`,
        size,
      });
    }
  }
  return out;
};

const SLIDING: readonly PuzzleImage[] = buildSlidingImages();

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
