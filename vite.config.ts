import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-assets',
      closeBundle() {
        const assetsDir = resolve(__dirname, 'assets');
        const distAssetsDir = resolve(__dirname, 'dist/assets');

        if (!existsSync(distAssetsDir)) {
          mkdirSync(distAssetsDir, { recursive: true });
        }

        for (let i = 1; i <= 18; i++) {
          const src = resolve(assetsDir, `image${i}.jpg`);
          const dest = resolve(distAssetsDir, `image${i}.jpg`);
          try {
            copyFileSync(src, dest);
          } catch (err) {
            console.warn(`Warning: Could not copy ${src}`);
          }

          const srcMobile = resolve(assetsDir, `image${i}-mobile.jpg`);
          const destMobile = resolve(distAssetsDir, `image${i}-mobile.jpg`);
          try {
            copyFileSync(srcMobile, destMobile);
          } catch (err) {
            console.warn(`Warning: Could not copy ${srcMobile}`);
          }
        }

        const logoFiles = ['logo.png', 'logo.svg'];
        logoFiles.forEach((file) => {
          const src = resolve(assetsDir, file);
          const dest = resolve(distAssetsDir, file);
          try {
            copyFileSync(src, dest);
          } catch (err) {
            console.warn(`Warning: Could not copy ${src}`);
          }
        });
      }
    }
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
