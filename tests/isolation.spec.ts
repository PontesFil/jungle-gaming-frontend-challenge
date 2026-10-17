
import { test, expect } from '@playwright/test'

test('não deve exibir pedido de outra conta ou visitante', async ({
  page,
}) => {
  await page.goto('/')

  await page.evaluate(() => localStorage.clear())
  await page.reload()

  // Cadastra a conta A.
  await page.goto('/register')

  await page.getByLabel('Nome').fill('Colecionador A')
  await page.getByLabel('E-mail').fill('conta-a@kurio.com')
  await page.getByLabel('Senha', { exact: true }).fill('123456')
  await page.getByLabel('Confirmar senha').fill('123456')

  await page.getByRole('button', {
    name: /^criar conta$/i,
  }).click()

  await expect(page).toHaveURL(/\/$/)

  // Realiza a compra pela interface.
  await page.goto('/nft/1')

  await expect(
    page.getByRole('heading', {
      name: 'Emerald Ape',
      exact: true,
    }),
  ).toBeVisible()

  await page.getByRole('button', {
    name: /adicionar ao carrinho/i,
  }).click()

  await page.getByRole('link', {
    name: 'Ver carrinho →',
    exact: true,
  }).click()

  await page.getByRole('button', {
    name: /ir para pagamento/i,
  }).click()

  await expect(page).toHaveURL(/\/checkout$/)

  await page.getByLabel('Nome completo').fill('Colecionador A')
  await page.getByLabel('E-mail').fill('conta-a@kurio.com')
  await page.getByRole('checkbox').check()

  await page.getByRole('button', {
    name: /confirmar pedido/i,
  }).click()

  await expect(page).toHaveURL(/\/confirmation\?/)

  await expect(
    page.getByText('Compra confirmada!'),
  ).toBeVisible()

  const orderUrl = page.url()

  // Troca para a conta B.
  await page.evaluate(() => {
    localStorage.setItem(
      'kurio-user',
      JSON.stringify({
        name: 'Colecionador B',
        email: 'conta-b@kurio.com',
      }),
    )
  })

  await page.reload()

  await expect(
    page.getByText('Pedido não encontrado para esta conta.'),
  ).toBeVisible()

  await expect(
    page.getByText('Compra confirmada!'),
  ).not.toBeVisible()

  // Remove a sessão e tenta acessar o mesmo pedido.
  await page.evaluate(() => {
    localStorage.removeItem('kurio-user')
  })

  await page.goto(orderUrl)
  await page.reload()

  await expect(
    page.getByRole('heading', {
      name: 'Entre para consultar seu pedido',
    }),
  ).toBeVisible()

  await expect(
    page.getByText('Compra confirmada!'),
  ).not.toBeVisible()
})
