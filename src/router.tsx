import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router'

import HomePage from './pages/Homepage'
import Header from './components/layout/Header'
import NftDetailsPage from './pages/nftDetailsPage'
import CartPage from './pages/CartPage'
import ConfirmationPage from './pages/ConfirmationPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
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
  component: HomePage,
})

const nftDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/nft/$nftId',
  component: NftDetailsPage,
})

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cart',
  component: CartPage,
})

const confirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/confirmation',
  validateSearch: (search: Record<string, unknown>) => ({
    orderId: typeof search.orderId === 'string' ? search.orderId : '',
  }),
  component: ConfirmationPage,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
})

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: RegisterPage,
})

const routeTree = rootRoute.addChildren([
  homeRoute,
  nftDetailsRoute,
  cartRoute,
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