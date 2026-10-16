export interface NFT {
  id: string
  name: string
  imageUrl: string
  price: number
  currency: 'ETH' | 'SOL'
  category: string
  creator: string
}