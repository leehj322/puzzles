import { resolve } from "path";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@/app": resolve(__dirname, "src/app"),
      "@/pages": resolve(__dirname, "src/pages"),
      "@/widgets": resolve(__dirname, "src/widgets"),
      "@/features": resolve(__dirname, "src/features"),
      "@/entities": resolve(__dirname, "src/entities"),
      "@/shared": resolve(__dirname, "src/shared"),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
});
