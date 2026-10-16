import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

import type { NFT } from '../types/nft'
import { socket } from '../services/socket'

interface CartContextType {
  items: NFT[]
  addItem: (nft: NFT) => void
  removeItem: (id: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  // 1. Recupera o carrinho salvo no navegador
  const [items, setItems] = useState<NFT[]>(() => {
    try {
      const savedCart = localStorage.getItem('kurio-cart')

      return savedCart ? (JSON.parse(savedCart) as NFT[]) : []
    } catch {
      return []
    }
  })

  // 2. Salva o carrinho sempre que os itens mudarem
  useEffect(() => {
    localStorage.setItem('kurio-cart', JSON.stringify(items))
  }, [items])

  // 3. Atualiza os preços do carrinho via Socket.IO
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

    function handleSnapshot(prices: Record<string, number>) {
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

  // 4. Adiciona um NFT sem permitir duplicatas
  function addItem(nft: NFT) {
    setItems((currentItems) => {
      const alreadyExists = currentItems.some(
        (item) => item.id === nft.id,
      )

      if (alreadyExists) {
        return currentItems
      }

      return [...currentItems, nft]
    })
  }

  // 5. Remove um NFT
  function removeItem(id: string) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== id),
    )
  }

  // 6. Limpa o carrinho
  function clearCart() {
    setItems([])
  }

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart }}
    >
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