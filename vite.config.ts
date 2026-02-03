import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 5173, // Standard Vite port
        host: '0.0.0.0',
        open: true, // Auto-open browser
      },
      plugins: [react()],
      define: {
        // Support both naming conventions
        'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY || env.GEMINI_API_KEY),
        'process.env.VITE_API_KEY': JSON.stringify(env.VITE_API_KEY || env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.VITE_API_KEY || env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        outDir: 'dist',
        sourcemap: false, // Disable for production
        rollupOptions: {
          output: {
            manualChunks: {
              'react-vendor': ['react', 'react-dom'],
            }
          }
        }
      },
      optimizeDeps: {
        include: ['react', 'react-dom']
      }
    };
});
