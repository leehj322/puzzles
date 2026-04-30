import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { baseConfig } from "@puzzles/eslint-config/base";

export default baseConfig({
  tsconfigPath: "./tsconfig.json",
  tsconfigRootDir: dirname(fileURLToPath(import.meta.url)),
});
