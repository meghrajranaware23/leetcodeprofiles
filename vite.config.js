import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';

/** Dev-server rewrites mirroring firebase.json clean URLs. */
function cleanUrlDevPlugin() {
  const rewrites = {
    '/packs': '/packs.html',
    '/home': '/packs.html',
    '/profile': '/profile.html',
    '/sign-in': '/sign-in.html',
    '/pricing': '/pricing.html',
    '/ranks': '/ranks.html',
    '/how-it-works': '/how-it-works.html',
    '/starter': '/starter-reader.html',
  };

  return {
    name: 'clean-url-dev',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (!req.url) return next();
        const [pathname, query = ''] = req.url.split('?');
        const target = rewrites[pathname];
        if (target) {
          req.url = query ? `${target}?${query}` : target;
        }
        next();
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiTarget = env.VITE_API_URL || 'http://localhost:3001';

  return {
    plugins: [cleanUrlDevPlugin()],
    server: {
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
        },
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          courseReader: resolve(__dirname, 'course-reader.html'),
          treesReader: resolve(__dirname, 'trees-reader.html'),
          graphsReader: resolve(__dirname, 'graphs-reader.html'),
          recursionReader: resolve(__dirname, 'recursion-reader.html'),
          dpReader: resolve(__dirname, 'dp-reader.html'),
          starterReader: resolve(__dirname, 'starter-reader.html'),
          packs: resolve(__dirname, 'packs.html'),
          profile: resolve(__dirname, 'profile.html'),
          signIn: resolve(__dirname, 'sign-in.html'),
          pricing: resolve(__dirname, 'pricing.html'),
          ranks: resolve(__dirname, 'ranks.html'),
          howItWorks: resolve(__dirname, 'how-it-works.html'),
        },
      },
    },
  };
});
