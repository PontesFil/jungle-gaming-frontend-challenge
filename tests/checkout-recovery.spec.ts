
import { test, expect } from '@playwright/test'

test('deve preservar o carrinho após falha e permitir nova tentativa', async ({
  page,
}) => {
  await page.goto('/')

  await page.evaluate(() => {
    localStorage.clear()
  })

  await page.reload()

  // Cria uma conta pela interface.
  await page.goto('/register')

  await page.getByLabel('Nome').fill('Colecionador Recuperação')
  await page.getByLabel('E-mail').fill('recovery@kurio.com')
  await page.getByLabel('Senha', { exact: true }).fill('123456')
  await page.getByLabel('Confirmar senha').fill('123456')

  await page.getByRole('button', {
    name: /^criar conta$/i,
  }).click()

  await expect(page).toHaveURL(/\/$/)

  // Adiciona um NFT ao carrinho.
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

  // Preenche os dados do checkout.
  await page.getByLabel('Nome completo').fill('Colecionador Recuperação')
  await page.getByLabel('E-mail').fill('recovery@kurio.com')
  await page.getByRole('checkbox').check()

  // Ativa a falha controlada no MSW.
  await page.evaluate(() => {
    localStorage.setItem('kurio-mock-scenario', 'checkout-error')
  })

  const confirmButton = page.getByRole('button', {
    name: /confirmar pedido/i,
  })

  await confirmButton.click()

  // A falha deve aparecer sem concluir a compra.
  await expect(page.getByRole('alert')).toContainText(
    'Não foi possível processar o pedido',
  )

  await expect(page).toHaveURL(/\/checkout$/)

  // O carrinho continua com o NFT selecionado.
  const storedCart = await page.evaluate(() =>
    localStorage.getItem('kurio-cart:recovery@kurio.com'),
  )

  expect(storedCart).not.toBeNull()
  expect(storedCart).toContain('Emerald Ape')

  // Desativa a falha e tenta novamente.
  await page.evaluate(() => {
    localStorage.removeItem('kurio-mock-scenario')
  })

  await confirmButton.click()

  // A compra agora deve ser confirmada pela API.
  await expect(page).toHaveURL(/\/confirmation\?/)

  await expect(
    page.getByText('Compra confirmada!'),
  ).toBeVisible()
})
