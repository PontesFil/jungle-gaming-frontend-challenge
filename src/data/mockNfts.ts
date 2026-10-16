import type { NFT } from '../types/nft'

export const mockNfts: NFT[] = [
  {
    id: '1',
    name: 'Emerald Ape',
    imageUrl: '/images/ape-green.png',
    price: 1.19,
    currency: 'ETH',
    category: 'Arte digital',
    creator: 'Kurio Studio',
  },{
    id: '2',
    name: 'Sage Nomad',
    imageUrl: '/images/ape-purple.png',
    price: 1.20,
    currency: 'ETH',
    category: 'Arte digital',
    creator: 'Kurio Studio',
  },
]