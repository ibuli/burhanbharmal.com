import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { PendingView } from './components/Layout';
export function getRouter() {
  return createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPendingMs: 150,
    defaultPendingComponent: PendingView,
  });
}
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
