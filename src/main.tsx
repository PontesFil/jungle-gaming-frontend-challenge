
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { router } from './router'
import { CartProvider } from './contexts/CartContext'
import { AuthProvider } from './contexts/AuthContext'

import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
      refetchOnWindowFocus: true,
    },
  },
})

async function enableMocking() {
  const enabled = import.meta.env.VITE_ENABLE_MOCKS !== 'false'

  if (!enabled) return

  const { worker } = await import('./mocks/browser')

  // Evita expor credenciais nos logs automáticos dos mocks.
  await worker.start({ quiet: true })
}

async function startApp() {
  try {
    await enableMocking()
  } catch (error) {
    console.error('Falha ao iniciar os mocks:', error)
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </AuthProvider>
      </QueryClientProvider>
    </StrictMode>,
  )
}

startApp()
