
import { test, expect } from '@playwright/test'

test('deve reutilizar o pedido apenas com os mesmos itens e preços', async ({
  page,
}) => {
  await page.goto('/')

  await page.evaluate(() => {
    localStorage.clear()

    localStorage.setItem(
      'kurio-user',
      JSON.stringify({
        id: 'test-user',
        name: 'Usuário Teste',
        email: 'idempotency@kurio.com',
      }),
    )
  })

  await page.reload()

await page.waitForFunction(
  () => navigator.serviceWorker.controller !== null,
  { timeout: 10000 },
)

const key = crypto.randomUUID()

  const checkout = async (
    nftIds: string[],
    expectedPrices: Record<string, number>,
  ) => {
    return page.evaluate(
      async ({ nftIds, expectedPrices, key }) => {
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nftIds,
            expectedPrices,
            idempotencyKey: key,
          }),
        })

        
const responseText = await response.text()

return {
  status: response.status,
  contentType: response.headers.get('content-type'),
  body: responseText ? JSON.parse(responseText) : null,
}

      },
      { nftIds, expectedPrices, key },
    )
  }

  const first = await checkout(['1'], { '1': 1.19 })
  console.log('Primeira resposta do checkout:', first)
  expect(first.status).toBe(200)

  const repeated = await checkout(['1'], { '1': 1.19 })
  expect(repeated.status).toBe(200)
  expect(repeated.body.orderId).toBe(first.body.orderId)

  const changedPrice = await checkout(['1'], { '1': 1.5 })
  expect(changedPrice.status).toBe(409)

  const changedItem = await checkout(['2'], { '2': 1.19 })
  expect(changedItem.status).toBe(409)
})
