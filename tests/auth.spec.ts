
import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => localStorage.clear())
  await page.reload()
})

test('deve cadastrar um usuário e manter a sessão após atualizar', async ({ page }) => {
  await page.goto('/register')

  await page.getByLabel('Nome').fill('Colecionador Teste')
  await page.getByLabel('E-mail').fill('auth@kurio.com')
  await page.getByLabel('Senha', { exact: true }).fill('123456')
  await page.getByLabel('Confirmar senha').fill('123456')

  await page.getByRole('button', {
    name: /^criar conta$/i,
  }).click()

  await expect(page).toHaveURL(/\/$/)

  await page.reload()

  const storedUser = await page.evaluate(() =>
    localStorage.getItem('kurio-user'),
  )

  expect(storedUser).not.toBeNull()
})

test('deve rejeitar login com senha incorreta', async ({ page }) => {
  await page.goto('/register')

  await page.getByLabel('Nome').fill('Colecionador Teste')
  await page.getByLabel('E-mail').fill('wrong@kurio.com')
  await page.getByLabel('Senha', { exact: true }).fill('123456')
  await page.getByLabel('Confirmar senha').fill('123456')

  await page.getByRole('button', {
    name: /^criar conta$/i,
  }).click()

  await expect(page).toHaveURL(/\/$/)

  await page.evaluate(() => localStorage.removeItem('kurio-user'))
  await page.reload()
  await page.goto('/login')

  await page.getByLabel('E-mail').fill('wrong@kurio.com')
  await page.getByLabel('Senha').fill('senha-errada')

  await page.getByRole('button', {
    name: /^entrar$/i,
  }).click()

  await expect(
    page.getByRole('alert'),
  ).toContainText('E-mail ou senha inválidos')

  await expect(page).toHaveURL(/\/login$/)
})

test('deve rejeitar cadastro com e-mail duplicado', async ({ page }) => {
  await page.goto('/register')

  await page.getByLabel('Nome').fill('Primeiro Usuário')
  await page.getByLabel('E-mail').fill('duplicate@kurio.com')
  await page.getByLabel('Senha', { exact: true }).fill('123456')
  await page.getByLabel('Confirmar senha').fill('123456')

  await page.getByRole('button', {
    name: /^criar conta$/i,
  }).click()

  await expect(page).toHaveURL(/\/$/)

  await page.goto('/register')

  await page.getByLabel('Nome').fill('Segundo Usuário')
  await page.getByLabel('E-mail').fill('duplicate@kurio.com')
  await page.getByLabel('Senha', { exact: true }).fill('654321')
  await page.getByLabel('Confirmar senha').fill('654321')

  await page.getByRole('button', {
    name: /^criar conta$/i,
  }).click()

  await expect(
    page.getByRole('alert'),
  ).toContainText('Não foi possível criar a conta')
})
