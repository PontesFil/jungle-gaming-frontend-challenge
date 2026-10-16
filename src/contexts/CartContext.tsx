import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

import type { NFT } from '../types/nft'

interface CartContextType {
  items: NFT[]
  addItem: (nft: NFT) => void
  removeItem: (id: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<NFT[]>(() => {
    try {
      const savedCart = localStorage.getItem('kurio-cart')

      return savedCart ? JSON.parse(savedCart) as NFT[] : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('kurio-cart', JSON.stringify(items))
  }, [items])

  function addItem(nft: NFT) {
    setItems((currentItems) => {
      const alreadyExists = currentItems.some((item) => item.id === nft.id)

      if (alreadyExists) {
        return currentItems
      }

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
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart deve ser usado dentro de CartProvider')
  }

  return context
}