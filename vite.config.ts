import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Charger les variables d'environnement (locales ou Vercel)
  const env = loadEnv(mode, process.cwd(), '');
  
  // On récupère la clé API en priorité de process.env (Vercel) puis du fichier .env
  const apiKey = env.API_KEY || process.env.API_KEY || '';

  return {
    plugins: [react()],
    define: {
      // Cette définition permet d'utiliser process.env.API_KEY directement dans le code React
      'process.env.API_KEY': JSON.stringify(apiKey),
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['react', 'react-dom'],
            'ai': ['@google/genai']
          }
        }
      }
    },
    server: {
      port: 3000,
      host: true
    }
  };
});
