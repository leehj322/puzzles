export const ROUTES = {
  home: "/",
  puzzleTypes: "/browse",
  puzzleList: (puzzleType: string) => `/browse/${puzzleType}`,
  puzzlePlay: (puzzleType: string, id: string) =>
    `/play/${puzzleType}/${id}`,
} as const;
