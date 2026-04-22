import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 60000, // increase from default 30s — AngularJS sites are slow
  use: {
    actionTimeout: 15000,
    navigationTimeout: 15000,
  },
});