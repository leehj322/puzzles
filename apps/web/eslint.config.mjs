import { nextConfig } from "@puzzles/eslint-config/next";

export default nextConfig({
  tsconfigPath: "./tsconfig.json",
  tsconfigRootDir: import.meta.dirname,
});
