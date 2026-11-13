import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/',
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: true,   // Clave para detectar cambios dentro de volúmenes Docker
      interval: 100,      // Intervalo de comprobación en ms
    },
    hmr: {
      clientPort: 5173,   // Puerto al que el navegador conecta el WebSocket de HMR
    },
  },
})
