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
        proxy: {
          // Proxy Qdrant requests to avoid CORS issues
          '/api/qdrant': {
            target: env.VITE_QDRANT_URL || 'https://your-cluster.qdrant.io',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api\/qdrant/, ''),
            headers: {
              'api-key': env.VITE_QDRANT_API_KEY || ''
            }
          }
        }
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
          '@': path.resolve(__dirname, './src'),
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
