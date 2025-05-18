import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          lucide: ['lucide-react']
        }
      }
    },
    assetsInlineLimit: 0  // Evita que Vite incruste recursos pequeños como base64
  },
  base: './', // Esto asegura que las rutas sean relativas
  publicDir: 'public' // Asegura que los activos públicos se incluyan en la compilación
});
