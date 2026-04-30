import { baseConfig } from "@puzzles/eslint-config/base";

export default baseConfig({
  tsconfigPath: "./tsconfig.json",
  tsconfigRootDir: import.meta.dirname,
});
