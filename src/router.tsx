import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router'

import HomePage from './pages/Homepage'
import Header from './components/layout/Header'

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Header />
      <Outlet />
    </>
  ),
})

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

const routeTree = rootRoute.addChildren([homeRoute])

export const router = createRouter({
  routeTree,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}