import react from '@vitejs/plugin-react-swc'
import Unfonts from 'unplugin-fonts/vite'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),Unfonts({
    custom:{
      families:[
        {
          name:'Geist',
          src: './src/assets/fonts/*.woff2',
        }
      ]
    }
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://YOUR_API_SERVER:PORT',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
