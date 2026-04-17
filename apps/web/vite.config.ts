import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import adonisjs from '@adonisjs/vite/client'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    adonisjs({
      entrypoints: ['resources/js/app.js', 'app/core/ui/app/app.tsx'],
      reload: ['resources/views/**/*.edge'],
    }),
  ],

  /**
   * Define aliases for importing modules from
   * your frontend code
   */
  server: {
    allowedHosts: ['2235ce351f19.ngrok-free.app'],
  },
  resolve: {
    alias: {
      '~/': `${import.meta.dirname}/app/core/ui/`,
      'config/ssr': `${import.meta.dirname}/config/ssr.ts`,
    },
  },
})
