import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

function parsePort(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const port = parsePort(env.PORT, 5173);
  const pwaDev = env.SW_DEV === '1' || env.SW_DEV === 'true';

  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: [
          'favicon.png',
          'favicon-192.png',
          'apple-touch-icon.png',
          'pwa-192x192.png',
          'pwa-512x512.png',
          'pwa-512-maskable.png',
          'hero-1080x1920.png',
        ],
        manifest: {
          id: '/',
          name: 'Pub Rona',
          short_name: 'Pub Rona',
          description: 'Pub Rona progressive web app',
          theme_color: '#0b1220',
          background_color: '#0b1220',
          display: 'standalone',
          orientation: 'portrait',
          scope: '/',
          start_url: '/',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'pwa-512-maskable.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,png,svg,ico,webp}'],
          navigateFallback: 'index.html',
        },
        ...(pwaDev && mode === 'development'
          ? { devOptions: { enabled: true, suppressWarnings: true } }
          : {}),
      }),
    ],
    server: {
      port,
      host: true,
    },
    preview: {
      host: true,
      port,
    },
  };
});
