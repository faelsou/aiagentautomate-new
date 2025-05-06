//import { defineConfig } from 'vite';
//import react from '@vitejs/plugin-react';
//
//// https://vitejs.dev/config/
//export default defineConfig({
//  plugins: [react()],
//  optimizeDeps: {
//    exclude: ['lucide-react'],
//  },
//});
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5678', // URL do backend (n8n)
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove '/api' do caminho
      },
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
