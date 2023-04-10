import { defineProject } from 'vitest/config'

export default defineProject({
  test: {
    name: 'react',
    css: true,
    globals: true,
    setupFiles: './test/setup.ts',
    environment: 'jsdom'
  }
})
