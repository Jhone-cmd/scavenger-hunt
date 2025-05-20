import { defineConfig } from "vitest/config.js";
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    test: {
    globals: true,
    root: './',
  },
    plugins: [tsconfigPaths()]
}) 