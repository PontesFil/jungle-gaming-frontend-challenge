
import {
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
  Outlet,
  useRouterState,
} from '@tanstack/react-router'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import { useRealtimePrices } from './hooks/useRealtimePrices'


function RootLayout() {
  useRealtimePrices()

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  const isFocusedPage =
    pathname === '/login' ||
    pathname === '/register' ||
    pathname === '/checkout'

  return (
    <div className="flex min-h-screen flex-col bg-[#140e0c]">
      <div className={isFocusedPage ? 'hidden md:block' : ''}>
        <Header />
      </div>

      <div className="flex-1">
        <Outlet />
      </div>

      <div className={isFocusedPage ? 'hidden md:block' : ''}>
        <Footer />
      </div>

      <div
        aria-hidden="true"
        className={
          isFocusedPage ? 'hidden' : 'h-20 md:hidden'
        }
      />
    </div>
  )
}

const rootRoute = createRootRoute({
  component: RootLayout,
})

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: lazyRouteComponent(
    () => import('./pages/Homepage'),
  ),
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
  component: lazyRouteComponent(
    () => import('./pages/CartPage'),
  ),
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
  component: lazyRouteComponent(
    () => import('./pages/LoginPage'),
  ),
})

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: lazyRouteComponent(
    () => import('./pages/RegisterPage'),
  ),
})

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: lazyRouteComponent(
    () => import('./pages/ProfilePage'),
  ),
})

const walletRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/wallet',
  component: lazyRouteComponent(
    () => import('./pages/WalletPage'),
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
  profileRoute,
  walletRoute,
])

export const router = createRouter({
  routeTree,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
