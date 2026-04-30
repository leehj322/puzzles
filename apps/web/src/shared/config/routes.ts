export const ROUTES = {
  home: "/",
  puzzleTypes: "/puzzles",
  puzzleList: (puzzleType: string) => `/puzzles/${puzzleType}`,
  puzzlePlay: (puzzleType: string, id: string) =>
    `/puzzles/${puzzleType}/play/${id}`,
} as const;
