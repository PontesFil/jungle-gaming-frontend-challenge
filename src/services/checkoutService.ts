import axios from 'axios'

interface CheckoutPayload {
  nftIds: string[]
  idempotencyKey: string
}

interface CheckoutResponse {
  orderId: string
  status: 'confirmed'
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