import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import neon from './neon-vite-plugin.ts'
import devMockApi from './vite-dev-mock-api'

const config = defineConfig({
  // Configure dev server proxy so /api requests are forwarded to the backend
  // This avoids CORS and prevents accidental navigation to backend origin.
  server: {
    proxy: {
      '/api': {
        target: (process.env.VITE_API_PROXY_TARGET as string) || 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        // Preserve cookie host for local dev
        cookieDomainRewrite: 'localhost',
      },
    },
  },
  plugins: [
    // Development-only mock API (enabled when VITE_USE_MOCKS=true)
    devMockApi(),
    neon,
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'], 
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
})

export default config
