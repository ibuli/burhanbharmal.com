import { defineConfig } from 'vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { cloudflare } from '@cloudflare/vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { compileContent } from './scripts/content.ts';

export default defineConfig({
  plugins: [
    {
      name: 'portfolio-markdown',
      async buildStart() {
        await compileContent();
      },
      configureServer(server) {
        server.watcher.add('content/');
        server.watcher.on('all', async (_event, file) => {
          if (!file.includes('content/') || !file.endsWith('.md')) return;
          try {
            await compileContent();
            server.ws.send({ type: 'full-reload' });
          } catch (error) {
            server.config.logger.error(String(error));
          }
        });
      },
    },
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tailwindcss(),
    tanstackStart(),
    react(),
  ],
  server: { port: 4173, strictPort: true },
});
