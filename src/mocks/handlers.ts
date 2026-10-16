import { http, HttpResponse } from 'msw'
import { mockNfts } from '../data/mockNfts'

export const handlers = [
  http.get('/api/nfts', () => {
    return HttpResponse.json(mockNfts)
  }),
]