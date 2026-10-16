import axios from 'axios'
import type { NFT } from '../types/nft'

export async function getNfts(): Promise<NFT[]> {
  const response = await axios.get<NFT[]>('/api/nfts')

  return response.data
}