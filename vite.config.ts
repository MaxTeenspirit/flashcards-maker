import {defineConfig} from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import {VitePWA} from 'vite-plugin-pwa';

export default defineConfig({
	server: {
		headers: {'cache-control': 'public, max-age=31536000'},
	},
	plugins: [
		react(),
		tsconfigPaths(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.ico', 'robots.txt', '*.png', '*.woff2', 'font.css'],
			manifest: {
				name: 'FlashFluent DE',
				short_name: 'FlashFluent DE',
				description: 'Flashcards to learn German words',
				theme_color: '#142b49',
				background_color: '#F7FCFF',
				display: 'standalone',
				start_url: '.',
				scope: '.',
				orientation: 'portrait',
				icons: [
					{
						src: 'pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable',
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable',
					},
					{
						src: 'apple-touch-icon.png',
						sizes: '180x180',
						type: 'image/png',
					},
				],
			},
			workbox: {
				runtimeCaching: [
					{
						urlPattern: ({request}) => request.destination === 'style',
						handler: 'CacheFirst',
						options: {
							cacheName: 'css-cache',
							expiration: {
								maxEntries: 20,
								maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
							},
						},
					},
					{
						urlPattern: ({request}) => request.destination === 'font',
						handler: 'CacheFirst',
						options: {
							cacheName: 'font-cache',
							expiration: {
								maxEntries: 20,
								maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
							},
						},
					},
					{
						urlPattern: ({request}) => request.destination === 'image',
						handler: 'CacheFirst',
						options: {
							cacheName: 'image-cache',
							expiration: {
								maxEntries: 50,
								maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
							},
						},
					},
				],
			},
		}),
	],
	base: '/flashcards-maker/',
});
