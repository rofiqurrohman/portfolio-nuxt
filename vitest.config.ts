import { defineConfig } from 'vitest/config'
import { defineVitestProject } from '@nuxt/test-utils/config'

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          environment: 'node',
          include: [
            'shared/**/*.test.ts',
            'server/utils/**/*.test.ts',
            'scripts/**/*.test.ts',
            'app/utils/**/*.test.ts',
          ],
        },
      },
      await defineVitestProject({
        test: {
          name: 'nuxt',
          environment: 'nuxt',
          include: [
            'app/components/**/*.test.ts',
            'app/composables/**/*.test.ts',
            'app/pages/**/*.test.ts',
          ],
        },
      }),
      {
        test: {
          name: 'e2e',
          environment: 'node',
          include: ['server/api/**/*.test.ts', 'tests/e2e/**/*.test.ts'],
          testTimeout: 120_000,
          hookTimeout: 300_000,
        },
      },
    ],
  },
})
