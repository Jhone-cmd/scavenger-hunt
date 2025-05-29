import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    root: './',
    environment:
      './prisma/vitest-environment-prisma/prisma-test-environment.ts',
  },
  plugins: [tsconfigPaths()],
})
