import { test, expect } from '@playwright/test'

test('deve exibir o catálogo de NFTs', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByText('Emerald Ape'),
  ).toBeVisible()

  await expect(
  page.getByText('Sage Nomad'),
).toBeVisible()
})

test('deve permitir abrir os detalhes de um NFT', async ({ page }) => {
  await page.goto('/')

  await page.getByText('Emerald Ape').first().click()

  await expect(page).toHaveURL(/\/nft\/1$/)
  await expect(
    page.getByText('Emerald Ape'),
  ).toBeVisible()
})