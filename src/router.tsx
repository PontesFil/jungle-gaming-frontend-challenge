
import {
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
  Outlet,
} from '@tanstack/react-router'

import Header from './components/layout/Header'
import { useRealtimePrices } from './hooks/useRealtimePrices'

function RootLayout() {
  useRealtimePrices()

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

const rootRoute = createRootRoute({
  component: RootLayout,
})

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: lazyRouteComponent(() => import('./pages/Homepage')),
})

const nftDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/nft/$nftId',
  component: lazyRouteComponent(
    () => import('./pages/nftDetailsPage'),
  ),
})

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cart',
  component: lazyRouteComponent(() => import('./pages/CartPage')),
})

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/checkout',
  component: lazyRouteComponent(
    () => import('./pages/CheckoutPage'),
  ),
})

const confirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/confirmation',
  validateSearch: (search: Record<string, unknown>) => ({
    orderId:
      typeof search.orderId === 'string'
        ? search.orderId
        : '',
  }),
  component: lazyRouteComponent(
    () => import('./pages/ConfirmationPage'),
  ),
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: lazyRouteComponent(() => import('./pages/LoginPage')),
})

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: lazyRouteComponent(
    () => import('./pages/RegisterPage'),
  ),
})

const routeTree = rootRoute.addChildren([
  homeRoute,
  nftDetailsRoute,
  cartRoute,
  checkoutRoute,
  confirmationRoute,
  loginRoute,
  registerRoute,
])

export const router = createRouter({
  routeTree,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
