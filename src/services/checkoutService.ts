
import axios from 'axios'

interface CheckoutPayload {
  nftIds: string[]
  idempotencyKey: string
  expectedPrices: Record<string, number>
}

interface CheckoutResponse {
  orderId: string
  status: 'confirmed'
}

export interface OrderResponse {
  orderId: string
  status: 'confirmed'
  nftIds: string[]
  createdAt: string
}

export async function createCheckout(
  payload: CheckoutPayload,
): Promise<CheckoutResponse> {
  const response = await axios.post<CheckoutResponse>(
    '/api/checkout',
    payload,
  )

  return response.data
}

export async function getOrder(
  orderId: string,
): Promise<OrderResponse> {
  const response = await axios.get<OrderResponse>(
    `/api/orders/${encodeURIComponent(orderId)}`,
  )

  return response.data
}
