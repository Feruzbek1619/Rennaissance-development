import { defineConfig } from '@playwright/test'

// Dedicated audit config: bundled Chromium (no Chrome-channel dependency),
// single project — the audit spec loops viewports itself.
export default defineConfig({
  testDir: './tests',
  testMatch: ['audit.spec.ts', 'interaction.spec.ts', 'verify.spec.ts', 'anim.spec.ts'],
  timeout: 60_000,
  fullyParallel: true,
  workers: 4,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
    timeout: 30_000,
  },
})
