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
          lucide: ['lucide-react'],
          router: ['react-router-dom']
        }
      }
    },
    assetsInlineLimit: 0  // Evita que Vite incruste recursos pequeños como base64
  },
  base: '/', // Usar rutas absolutas desde la raíz del sitio
  publicDir: 'public', // Asegura que los activos públicos se incluyan en la compilación
  server: {
    port: 3000,
    strictPort: true,
    host: true
  },
  preview: {
    // Configuración para vista previa de producción
    port: 4173,
    strictPort: true,
    host: true
  }
});
