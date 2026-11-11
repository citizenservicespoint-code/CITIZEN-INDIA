import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import crypto from 'crypto';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import {createApiMiddleware} from './netlify/functions/api';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  const localDevEnv =
    mode === 'development' && !env.CAPTCHA_SECRET_KEY
      ? {...env, CAPTCHA_SECRET_KEY: crypto.randomBytes(32).toString('hex')}
      : env;
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'citizen-india-secure-api',
        configureServer(server) {
          server.middlewares.use(createApiMiddleware(localDevEnv));
        },
        configurePreviewServer(server) {
          server.middlewares.use(createApiMiddleware(env));
        },
      },
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
