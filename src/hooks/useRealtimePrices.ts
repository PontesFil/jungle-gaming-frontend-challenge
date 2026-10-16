import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { socket } from '../services/socket'
import type { NFT } from '../types/nft'

interface PriceUpdate {
  id: string
  price: number
}

type PriceSnapshot = Record<string, number>

export function useRealtimePrices() {
  const queryClient = useQueryClient()

  useEffect(() => {
    function updatePrice({ id, price }: PriceUpdate) {
      queryClient.setQueryData<NFT[]>(['nfts'], (oldNfts) => {
        if (!oldNfts) return oldNfts

        return oldNfts.map((nft) =>
          nft.id === id ? { ...nft, price } : nft,
        )
      })
    }

    function updateSnapshot(prices: PriceSnapshot) {
      queryClient.setQueryData<NFT[]>(['nfts'], (oldNfts) => {
        if (!oldNfts) return oldNfts

        return oldNfts.map((nft) => {
          const price = prices[nft.id]

          return price === undefined
            ? nft
            : { ...nft, price }
        })
      })
    }

    socket.on('nft:price-updated', updatePrice)
    socket.on('prices:snapshot', updateSnapshot)

    socket.connect()

    return () => {
      socket.off('nft:price-updated', updatePrice)
      socket.off('prices:snapshot', updateSnapshot)
      socket.disconnect()
    }
  }, [queryClient])
}