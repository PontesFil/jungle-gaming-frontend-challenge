import { http, HttpResponse, delay } from 'msw'
import { mockNfts } from '../data/mockNfts'

interface CheckoutRequest {
  nftIds: string[]
  idempotencyKey: string
}

const completedOrders = new Map<string, string>()

export const handlers = [
  http.get('/api/nfts', () => {
    return HttpResponse.json(mockNfts)
  }),

  http.post('/api/checkout', async ({ request }) => {
    await delay(700)

    const body = (await request.json()) as CheckoutRequest
    const { nftIds, idempotencyKey } = body

    if (!idempotencyKey || !Array.isArray(nftIds) || nftIds.length === 0) {
      return HttpResponse.json(
        { message: 'Pedido inválido.' },
        { status: 400 },
      )
    }

    const existingOrderId = completedOrders.get(idempotencyKey)

    if (existingOrderId) {
      return HttpResponse.json({
        orderId: existingOrderId,
        status: 'confirmed',
      })
    }

    const validItems = nftIds.every((id) =>
      mockNfts.some((nft) => nft.id === id),
    )

    if (!validItems) {
      return HttpResponse.json(
        { message: 'O pedido contém NFTs inválidos.' },
        { status: 400 },
      )
    }

    const orderId = crypto.randomUUID()
    completedOrders.set(idempotencyKey, orderId)

    return HttpResponse.json({
      orderId,
      status: 'confirmed',
    })
  }),
]