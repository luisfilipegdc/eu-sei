import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * A raiz do site é a apresentação antiga: `public/index.html`, arquivo único
 * com as fontes embutidas, que a Vercel serve como está. Por isso a entrada do
 * app React fica em `telao/index.html` e sai em `dist/telao/` — se o build
 * emitisse `dist/index.html`, ele sobrescreveria a apresentação.
 */
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: { telao: './telao/index.html' },
    },
  },
})
