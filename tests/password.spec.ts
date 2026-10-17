import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/register')
  await page.getByLabel('Nome', { exact: true }).fill('Colecionador Senha')
  await page.getByLabel('E-mail').fill('password@kurio.com')
  await page.getByLabel('Senha', { exact: true }).fill('123456')
  await page.getByLabel('Confirmar senha').fill('123456')
  await page.getByRole('button', { name: /^criar conta$/i }).click()
  await expect(page).toHaveURL(/\/$/)
  await page.goto('/profile')
  await expect(page.getByRole('form', { name: 'Alterar senha' })).toBeVisible()
})

test('deve rejeitar a senha atual incorreta sem alterar a conta ou sessão', async ({ page }) => {
  const original = await page.evaluate(() => ({
    accounts: localStorage.getItem('kurio-mock-accounts'),
    session: localStorage.getItem('kurio-user'),
  }))
  const form = page.getByRole('form', { name: 'Alterar senha' })

  await form.getByLabel('Senha atual', { exact: true }).fill('incorreta')
  await form.getByLabel('Nova senha', { exact: true }).fill('nova-senha-456')
  await form.getByLabel('Confirmar nova senha').fill('nova-senha-456')
  await form.getByRole('button', { name: 'Alterar senha' }).click()

  await expect(form.getByRole('alert')).toHaveText('Senha atual incorreta.')
  await expect(form.getByLabel('Senha atual', { exact: true })).toHaveAttribute('aria-invalid', 'true')
  await expect(form.getByRole('button', { name: 'Alterar senha' })).toBeEnabled()
  expect(await page.evaluate(() => ({
    accounts: localStorage.getItem('kurio-mock-accounts'),
    session: localStorage.getItem('kurio-user'),
  }))).toEqual(original)
})

test('deve validar campos vazios, tamanho mínimo e confirmação divergente sem enviar à API', async ({ page }) => {
  const form = page.getByRole('form', { name: 'Alterar senha' })
  let requests = 0
  page.on('request', (request) => {
    if (request.url().endsWith('/api/auth/password')) requests += 1
  })

  await form.getByRole('button', { name: 'Alterar senha' }).click()
  await expect(form.getByRole('alert')).toHaveText('Informe a senha atual.')

  await form.getByLabel('Senha atual', { exact: true }).fill('123456')
  await form.getByLabel('Nova senha', { exact: true }).fill('12345')
  await form.getByRole('button', { name: 'Alterar senha' }).click()
  await expect(form.getByRole('alert')).toHaveText('A nova senha precisa ter pelo menos 6 caracteres.')

  await form.getByLabel('Nova senha', { exact: true }).fill('nova-senha-456')
  await form.getByLabel('Confirmar nova senha').fill('senha-diferente')
  await form.getByRole('button', { name: 'Alterar senha' }).click()
  await expect(form.getByRole('alert')).toHaveText('As senhas não coincidem.')
  await expect(form.getByLabel('Confirmar nova senha')).toHaveAttribute('aria-invalid', 'true')
  await expect(form.getByLabel('Confirmar nova senha')).toHaveAttribute('aria-describedby', 'password-error')
  expect(requests).toBe(0)
})

test('deve alterar somente o hash, preservar dados e aceitar apenas a nova senha após logout', async ({ page }) => {
  const consoleValues: Promise<unknown>[] = []
  page.on('console', (message) => {
    for (const argument of message.args()) {
      consoleValues.push(argument.jsonValue().catch(() => null))
    }
  })

  await page.goto('/nft/1')
  await page.getByRole('button', { name: /adicionar ao carrinho/i }).click()
  await page.goto('/profile')

  const original = await page.evaluate(() => {
    const accounts = JSON.parse(localStorage.getItem('kurio-mock-accounts')!)
    accounts.push({ ...accounts[0], email: 'outra-conta@kurio.com' })
    localStorage.setItem('kurio-mock-accounts', JSON.stringify(accounts))
    localStorage.setItem('kurio-orders', JSON.stringify([{
      orderId: 'pedido-existente',
      ownerEmail: 'password@kurio.com',
      nftIds: ['2'],
      status: 'confirmed',
      createdAt: '2026-10-17T12:00:00.000Z',
    }]))

    return {
      accounts,
      session: localStorage.getItem('kurio-user'),
      cart: localStorage.getItem('kurio-cart:password@kurio.com'),
      orders: localStorage.getItem('kurio-orders'),
    }
  })
  const form = page.getByRole('form', { name: 'Alterar senha' })

  await form.getByLabel('Senha atual', { exact: true }).fill('123456')
  await form.getByLabel('Nova senha', { exact: true }).fill('nova-senha-456')
  await form.getByLabel('Confirmar nova senha').fill('nova-senha-456')
  const response = page.waitForResponse((response) =>
    response.url().endsWith('/api/auth/password') && response.request().method() === 'PATCH',
  )
  await form.getByRole('button', { name: 'Alterar senha' }).click()
  expect((await response).status()).toBe(200)
  await expect(form.getByRole('status')).toHaveText('Senha alterada com sucesso.')
  await expect(form.getByLabel('Senha atual', { exact: true })).toHaveValue('')
  await expect(form.getByLabel('Nova senha', { exact: true })).toHaveValue('')
  await expect(form.getByLabel('Confirmar nova senha')).toHaveValue('')

  const saved = await page.evaluate(() => ({
    accounts: JSON.parse(localStorage.getItem('kurio-mock-accounts')!),
    session: localStorage.getItem('kurio-user'),
    cart: localStorage.getItem('kurio-cart:password@kurio.com'),
    orders: localStorage.getItem('kurio-orders'),
  }))
  expect(saved.accounts[0].passwordHash).toMatch(/^[a-f0-9]{64}$/)
  expect(saved.accounts[0].passwordHash).not.toBe(original.accounts[0].passwordHash)
  expect(JSON.stringify(saved)).not.toContain('nova-senha-456')
  expect(JSON.stringify(await Promise.all(consoleValues)).includes('nova-senha-456')).toBe(false)
  expect(saved).toEqual({
    ...original,
    accounts: [
      { ...original.accounts[0], passwordHash: saved.accounts[0].passwordHash },
      original.accounts[1],
    ],
  })

  await page.reload()
  await expect(page.getByLabel('Nome de exibição')).toHaveValue('Colecionador Senha')
  await page.getByRole('button', { name: 'Sair', exact: true }).first().click()
  await expect(page).toHaveURL(/\/$/)
  await page.goto('/login')
  await page.getByLabel('E-mail').fill('password@kurio.com')
  await page.getByLabel('Senha', { exact: true }).fill('123456')
  await page.getByRole('button', { name: /^entrar$/i }).click()
  await expect(page.getByRole('alert')).toContainText('E-mail ou senha inválidos')
  expect(await page.evaluate(() => localStorage.getItem('kurio-user'))).toBeNull()

  await page.getByLabel('Senha', { exact: true }).fill('nova-senha-456')
  await page.getByRole('button', { name: /^entrar$/i }).click()
  await expect(page).toHaveURL(/\/$/)
  await page.goto('/profile')
  await expect(page.getByLabel('Nome de exibição')).toHaveValue('Colecionador Senha')
})

test('endpoint deve rejeitar nova senha curta e exigir sessão autenticada', async ({ page }) => {
  const originalAccounts = await page.evaluate(() => localStorage.getItem('kurio-mock-accounts'))
  const invalidStatus = await page.evaluate(async () => {
    const response = await fetch('/api/auth/password', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword: '123456', newPassword: '12345' }),
    })
    return response.status
  })
  expect(invalidStatus).toBe(400)

  await page.getByRole('button', { name: 'Sair', exact: true }).first().click()
  await expect(page).toHaveURL(/\/$/)
  const unauthorizedStatus = await page.evaluate(async () => {
    const response = await fetch('/api/auth/password', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword: '123456', newPassword: 'nova-senha-456' }),
    })
    return response.status
  })
  expect(unauthorizedStatus).toBe(401)
  expect(await page.evaluate(() => localStorage.getItem('kurio-mock-accounts'))).toBe(originalAccounts)
})
