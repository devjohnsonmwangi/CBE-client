import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    viteReact(),
    tailwindcss(),
  ],
  // 'test' is a vite-plugin-vitest option. Some vite types in this project don't include it;
  // cast to any to avoid type errors until @types/vitest or an updated Vite is installed.
  ...( { test: { globals: true, environment: 'jsdom' } } as any ),
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
