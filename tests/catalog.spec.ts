import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => localStorage.clear())
  await page.reload()
})

test('deve exibir o catálogo de NFTs', async ({ page }) => {
  await expect(
    page.getByRole('heading', {
      name: 'Explore NFTs',
    }),
  ).toBeVisible()

  // Seleciona o card do catálogo, não o NFT em destaque.
  const emeraldApeCard = page
    .locator('a[href="/nft/1"]')
    .filter({ hasText: 'Emerald Ape' })

  await expect(emeraldApeCard).toBeVisible()
})

test('deve permitir abrir os detalhes de um NFT', async ({ page }) => {
  const emeraldApeCard = page
    .locator('a[href="/nft/1"]')
    .filter({ hasText: 'Emerald Ape' })

  await emeraldApeCard.click()

  await expect(page).toHaveURL(/\/nft\/1$/)

  await expect(
    page.getByRole('heading', {
      name: 'Emerald Ape',
      exact: true,
    }),
  ).toBeVisible()

  await expect(
    page.getByRole('button', {
      name: /adicionar ao carrinho/i,
    }),
  ).toBeVisible()
})