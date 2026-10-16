
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

import type { NFT } from '../types/nft'
import { socket } from '../services/socket'
import { useAuth } from './AuthContext'

interface CartContextType {
  items: NFT[]
  addItem: (nft: NFT) => void
  removeItem: (id: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(
  undefined,
)

const GUEST_CART_KEY = 'kurio-cart:guest'

function readCart(key: string): NFT[] {
  try {
    const saved = localStorage.getItem(key)

    if (!saved) return []

    const parsed: unknown = JSON.parse(saved)

    return Array.isArray(parsed) ? (parsed as NFT[]) : []
  } catch {
    return []
  }
}

export function CartProvider({
  children,
}: {
  children: ReactNode
}) {
  const { user } = useAuth()

  const cartKey = user
    ? `kurio-cart:${user.email.trim().toLowerCase()}`
    : GUEST_CART_KEY

  return (
    <CartStore key={cartKey} storageKey={cartKey}>
      {children}
    </CartStore>
  )
}

function CartStore({
  children,
  storageKey,
}: {
  children: ReactNode
  storageKey: string
}) {
  const [items, setItems] = useState<NFT[]>(() => {
    const savedItems = readCart(storageKey)

    // Mantém o fluxo visitante -> login -> checkout.
    if (storageKey !== GUEST_CART_KEY) {
      const guestItems = readCart(GUEST_CART_KEY)

      if (guestItems.length > 0) {
        const merged = [...savedItems]

        for (const nft of guestItems) {
          if (!merged.some((item) => item.id === nft.id)) {
            merged.push(nft)
          }
        }

        localStorage.setItem(
          storageKey,
          JSON.stringify(merged),
        )
        localStorage.removeItem(GUEST_CART_KEY)

        return merged
      }
    }

    return savedItems
  })

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items))
  }, [items, storageKey])

  useEffect(() => {
    function handlePriceUpdate({
      id,
      price,
    }: {
      id: string
      price: number
    }) {
      setItems((currentItems) =>
        currentItems.map((nft) =>
          nft.id === id ? { ...nft, price } : nft,
        ),
      )
    }

    function handleSnapshot(
      prices: Record<string, number>,
    ) {
      setItems((currentItems) =>
        currentItems.map((nft) => {
          const price = prices[nft.id]

          return price === undefined
            ? nft
            : { ...nft, price }
        }),
      )
    }

    socket.on('nft:price-updated', handlePriceUpdate)
    socket.on('prices:snapshot', handleSnapshot)

    return () => {
      socket.off('nft:price-updated', handlePriceUpdate)
      socket.off('prices:snapshot', handleSnapshot)
    }
  }, [])

  function addItem(nft: NFT) {
    setItems((currentItems) => {
      const alreadyExists = currentItems.some(
        (item) => item.id === nft.id,
      )

      if (alreadyExists) return currentItems

      return [...currentItems, nft]
    })
  }

  function removeItem(id: string) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== id),
    )
  }

  function clearCart() {
    setItems([])
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error(
      'useCart deve ser usado dentro de CartProvider',
    )
  }

  return context
}
