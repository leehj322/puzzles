import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { nextConfig } from "@puzzles/eslint-config/next";

export default nextConfig({
  tsconfigPath: "./tsconfig.json",
  tsconfigRootDir: dirname(fileURLToPath(import.meta.url)),
});
