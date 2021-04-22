import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/api',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
    }
  },
  plugins: [
    reactRefresh()
  ]
})
