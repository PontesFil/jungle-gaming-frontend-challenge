import { test, expect } from '@playwright/test'

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
    name: /finalizar compra/i,
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
    name: /finalizar compra/i,
  }).click()

  await expect(page).toHaveURL(/\/confirmation\?/)
  await expect(
    page.getByText('Compra confirmada!'),
  ).toBeVisible()
})