import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' 

export default defineConfig({
  plugins: [vue()],
  server: {
    host: true, 
    port: 5173, 
    open: true, 
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].[hash].[ext]`,
      },
    },
  },
})
