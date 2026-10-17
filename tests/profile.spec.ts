import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/register')
  await page.getByLabel('Nome', { exact: true }).fill('Colecionador Teste')
  await page.getByLabel('E-mail').fill('profile@kurio.com')
  await page.getByLabel('Senha', { exact: true }).fill('123456')
  await page.getByLabel('Confirmar senha').fill('123456')
  await page.getByRole('button', { name: /^criar conta$/i }).click()
  await expect(page).toHaveURL(/\/$/)
  await page.goto('/profile')
})

test('deve editar o nome e persistir após refresh e novo login', async ({ page }) => {
  const originalAccounts = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('kurio-mock-accounts')!),
  )

  await page.getByLabel('Nome de exibição').fill('  Colecionador Atualizado  ')
  await page.getByRole('button', { name: 'Salvar nome' }).click()

  await expect(page.getByRole('status')).toHaveText('Nome atualizado com sucesso.')
  await expect(page.getByRole('link', { name: 'Colecionador Atualizado', exact: true })).toBeVisible()

  const saved = await page.evaluate(() => ({
    user: JSON.parse(localStorage.getItem('kurio-user')!),
    accounts: JSON.parse(localStorage.getItem('kurio-mock-accounts')!),
  }))

  expect(saved.user).toEqual({ name: 'Colecionador Atualizado', email: 'profile@kurio.com' })
  expect(saved.accounts).toEqual([
    { ...originalAccounts[0], name: 'Colecionador Atualizado' },
  ])

  await page.reload()
  await expect(page.getByLabel('Nome de exibição')).toHaveValue('Colecionador Atualizado')

  await page.getByRole('button', { name: 'Sair', exact: true }).first().click()
  await expect(page).toHaveURL(/\/$/)
  await page.goto('/login')
  await page.getByLabel('E-mail').fill('profile@kurio.com')
  await page.getByLabel('Senha', { exact: true }).fill('123456')
  await page.getByRole('button', { name: /^entrar$/i }).click()
  await expect(page).toHaveURL(/\/$/)
  await page.goto('/profile')

  await expect(page.getByLabel('Nome de exibição')).toHaveValue('Colecionador Atualizado')
})

test('deve validar o nome e preservar a sessão quando a API rejeitar a alteração', async ({ page }) => {
  const original = await page.evaluate(() => ({
    user: localStorage.getItem('kurio-user'),
    accounts: localStorage.getItem('kurio-mock-accounts'),
  }))
  const nameInput = page.getByLabel('Nome de exibição')
  const saveButton = page.getByRole('button', { name: 'Salvar nome' })

  for (const name of ['', '   ', '!!!', 'a'.repeat(81)]) {
    await nameInput.fill(name)
    await saveButton.click()
    await expect(nameInput).toHaveAttribute('aria-invalid', 'true')
    await expect(nameInput).toHaveAttribute('aria-describedby', 'display-name-error')
    await expect(page.getByRole('alert')).toBeVisible()
  }

  const invalidResponse = await page.evaluate(async () => {
    const response = await fetch('/api/auth/me', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '   ' }),
    })
    return response.status
  })

  expect(invalidResponse).toBe(400)
  expect(await page.evaluate(() => ({
    user: localStorage.getItem('kurio-user'),
    accounts: localStorage.getItem('kurio-mock-accounts'),
  }))).toEqual(original)

  // A sessão sem conta correspondente deve ser rejeitada pelo mock.
  await page.evaluate(() => localStorage.removeItem('kurio-mock-accounts'))
  await nameInput.fill('Nome Rejeitado')
  await saveButton.click()
  await expect(page.getByRole('alert')).toHaveText(
    'Não foi possível atualizar seu nome. Tente novamente.',
  )
  await expect(page.getByRole('link', { name: 'Colecionador Teste', exact: true })).toBeVisible()
  await expect(saveButton).toBeEnabled()
  expect(await page.evaluate(() => localStorage.getItem('kurio-user'))).toBe(original.user)
})
