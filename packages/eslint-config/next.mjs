import { baseConfig } from "./base.mjs";

/**
 * Next.js-specific ESLint config. Currently identical to base; reserved for
 * future Next-specific rules (e.g. next/core-web-vitals plugin).
 *
 * @param {{ tsconfigPath?: string }} [options]
 */
export const nextConfig = (options = {}) => [...baseConfig(options)];

export default nextConfig;
