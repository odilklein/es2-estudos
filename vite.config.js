import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Engenharia de Software 2: Plataforma de Estudos',
        short_name: 'ES2 Estudos',
        description:
          'Teoria, resumos, diagramas e questões de Engenharia de Software 2. Funciona offline.',
        lang: 'pt-BR',
        theme_color: '#3a6660',
        background_color: '#f4f2ed',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff,woff2}'],
        globIgnores: [
          '**/*.m4a',
          // Layouts e recursos do Mermaid que os diagramas do site não usam.
          // Continuam disponíveis via cache sob demanda (runtimeCaching abaixo).
          '**/elk-*.js',
          '**/cytoscape.esm-*.js',
          '**/katex-*.js',
          '**/cose-bilkent-*.js',
        ],
        navigateFallback: 'index.html',
        cleanupOutdatedCaches: true,
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: /\.m4a$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'podcast-audio',
              rangeRequests: true,
              expiration: { maxEntries: 8, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200, 206] },
            },
          },
          {
            urlPattern: /\/assets\/(elk|cytoscape\.esm|katex|cose-bilkent)-.*\.js$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'mermaid-optional',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 180 },
            },
          },
          {
            urlPattern: /^https:\/\/api\.iconify\.design\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'iconify-api',
              expiration: { maxEntries: 300, maxAgeSeconds: 60 * 60 * 24 * 60 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  assetsInclude: ['**/*.m4a', '**/*.mp3'],
})
