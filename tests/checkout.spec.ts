
import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => localStorage.clear())
})

test('deve exigir login antes de finalizar a compra', async ({ page }) => {
  await page.goto('/')

  await page.getByText('Emerald Ape').first().click()

  await page.getByRole('button', {
    name: /adicionar ao carrinho/i,
  }).click()

  await page.getByRole('link', {
    name: /carrinho/i,
  }).click()

  await expect(page.getByText('Emerald Ape')).toBeVisible()

  await page.getByRole('button', {
    name: /ir para pagamento/i,
  }).click()

  await expect(page).toHaveURL(/\/login$/)
})

test('deve permitir finalizar a compra após login', async ({ page }) => {
  await page.goto('/login')

  await page.getByLabel('E-mail').fill('teste@kurio.com')
  await page.getByLabel('Senha').fill('123456')

  await page.getByRole('button', {
    name: /^entrar$/i,
  }).click()

  await page.goto('/')

  await page.getByText('Emerald Ape').first().click()

  await page.getByRole('button', {
    name: /adicionar ao carrinho/i,
  }).click()

  await page.getByRole('link', {
    name: /carrinho/i,
  }).click()

  await page.getByRole('button', {
    name: /ir para pagamento/i,
  }).click()

  await expect(page).toHaveURL(/\/checkout$/)

  await expect(
    page.getByRole('heading', { name: /finalizar pagamento/i }),
  ).toBeVisible()

  const confirmButton = page.getByRole('button', {
    name: /confirmar pedido/i,
  })

  // A compra não pode ser enviada antes da revisão.
  await expect(confirmButton).toBeDisabled()

  await page.getByLabel('Nome completo').fill('Colecionador Teste')
  await page.getByLabel('E-mail').fill('teste@kurio.com')

  await page.getByLabel('Carteira').selectOption('metamask')
  await page.getByLabel('Rede').selectOption('ethereum')

  await page.getByRole('checkbox').check()

  await expect(confirmButton).toBeEnabled()

  await confirmButton.click()

  await expect(page).toHaveURL(/\/confirmation\?/)

  await expect(
    page.getByText('Compra confirmada!'),
  ).toBeVisible()
})
