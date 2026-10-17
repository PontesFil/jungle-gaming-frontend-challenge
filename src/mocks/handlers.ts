
import { http, HttpResponse, delay } from 'msw'
import { mockNfts } from '../data/mockNfts'


interface CheckoutRequest {
  nftIds: string[]
  idempotencyKey: string
  expectedPrices: Record<string, number>
}


interface StoredOrder {
  orderId: string
  ownerEmail: string
  nftIds: string[]
  status: 'confirmed'
  createdAt: string
}

const STORAGE_KEY = 'kurio-orders'


interface MockAccount {
  name: string
  email: string
  passwordHash: string
}

interface AuthRequest {
  email: string
  password: string
  name?: string
}

const ACCOUNTS_KEY = 'kurio-mock-accounts'

function getAccounts(): MockAccount[] {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY)
    return raw ? (JSON.parse(raw) as MockAccount[]) : []
  } catch {
    return []
  }
}

function saveAccounts(accounts: MockAccount[]) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
}

async function hashPassword(password: string): Promise<string> {
  const bytes = new TextEncoder().encode(password)
  const digest = await crypto.subtle.digest('SHA-256', bytes)

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}


function getCurrentEmail(): string | null {
  try {
    const raw = localStorage.getItem('kurio-user')
    if (!raw) return null

    const user = JSON.parse(raw) as { email?: string }
    return user.email?.trim().toLowerCase() || null
  } catch {
    return null
  }
}

function getOrders(): StoredOrder[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as StoredOrder[]) : []
  } catch {
    return []
  }
}

export const handlers = [
  http.get('/api/nfts', () => {
    return HttpResponse.json(mockNfts)
  }),

  
  http.post('/api/auth/register', async ({ request }) => {
    await delay(300)

    let body: AuthRequest

    try {
      body = (await request.json()) as AuthRequest
    } catch {
      return HttpResponse.json(
        { message: 'Dados inválidos.' },
        { status: 400 },
      )
    }

    const name = typeof body?.name === 'string'
      ? body.name.trim()
      : ''

    const email = typeof body?.email === 'string'
      ? body.email.trim().toLowerCase()
      : ''

    const password = body?.password

    if (
      !name ||
      !email.includes('@') ||
      typeof password !== 'string' ||
      password.length < 6
    ) {
      return HttpResponse.json(
        { message: 'Nome, e-mail ou senha inválidos.' },
        { status: 400 },
      )
    }

    const accounts = getAccounts()

    if (accounts.some((account) => account.email === email)) {
      return HttpResponse.json(
        { message: 'Este e-mail já está cadastrado.' },
        { status: 409 },
      )
    }

    const passwordHash = await hashPassword(password)

    saveAccounts([
      ...accounts,
      { name, email, passwordHash },
    ])

    return HttpResponse.json(
      { user: { name, email } },
      { status: 201 },
    )
  }),

  http.post('/api/auth/login', async ({ request }) => {
    await delay(300)

    let body: AuthRequest

    try {
      body = (await request.json()) as AuthRequest
    } catch {
      return HttpResponse.json(
        { message: 'Dados inválidos.' },
        { status: 400 },
      )
    }

    const email = typeof body?.email === 'string'
      ? body.email.trim().toLowerCase()
      : ''

    const password = body?.password

    if (!email || typeof password !== 'string' || !password) {
      return HttpResponse.json(
        { message: 'Informe e-mail e senha.' },
        { status: 400 },
      )
    }

    const account = getAccounts().find(
      (item) => item.email === email,
    )

    if (
      !account ||
      account.passwordHash !== await hashPassword(password)
    ) {
      return HttpResponse.json(
        { message: 'E-mail ou senha inválidos.' },
        { status: 401 },
      )
    }

    return HttpResponse.json({
      user: {
        name: account.name,
        email: account.email,
      },
    })
  }),


  http.post('/api/checkout', async ({ request }) => {
    await delay(700)

    const ownerEmail = getCurrentEmail()

    if (!ownerEmail) {
      return HttpResponse.json(
        { message: 'Faça login para finalizar o pedido.' },
        { status: 401 },
      )
    }

    let body: CheckoutRequest

    try {
      body = (await request.json()) as CheckoutRequest
    } catch {
      return HttpResponse.json(
        { message: 'Dados inválidos.' },
        { status: 400 },
      )
    }

    const { nftIds, idempotencyKey, expectedPrices } = body

    if (
      typeof idempotencyKey !== 'string' ||
      !idempotencyKey.trim() ||
      !Array.isArray(nftIds) ||
      nftIds.length === 0 ||
      !expectedPrices ||
typeof expectedPrices !== 'object' ||
Array.isArray(expectedPrices) ||
      !nftIds.every((id) => typeof id === 'string')
    ) {
      return HttpResponse.json(
        { message: 'Pedido inválido.' },
        { status: 400 },
      )
    }
    
    
const invalidItems = nftIds.some((id) => {
  const nftExists = mockNfts.some((nft) => nft.id === id)
  const expectedPrice = expectedPrices[id]

  return (
    !nftExists ||
    typeof expectedPrice !== 'number' ||
    !Number.isFinite(expectedPrice) ||
    expectedPrice <= 0
  )
})

if (invalidItems) {
  return HttpResponse.json(
    {
      message: 'O pedido contém NFTs ou preços inválidos.',
    },
    { status: 400 },
  )
}

    const orders = getOrders()

    const existingOrder = orders.find(
      (order) =>
        order.ownerEmail === ownerEmail &&
        order.orderId !== '' &&
        orderKey(order) === idempotencyKey,
    )

    if (existingOrder) {
      return HttpResponse.json({
        orderId: existingOrder.orderId,
        status: existingOrder.status,
      })
    }

     const order: StoredOrder = {
      orderId: crypto.randomUUID(),
      ownerEmail,
      nftIds,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    }

    const orderWithKey = {
      ...order,
      idempotencyKey,
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([...orders, orderWithKey]),
    )

    return HttpResponse.json({
      orderId: order.orderId,
      status: order.status,
    })
  }),

  http.get('/api/orders/:orderId', async ({ params }) => {
    await delay(250)

    const ownerEmail = getCurrentEmail()

    if (!ownerEmail) {
      return HttpResponse.json(
        { message: 'Faça login para consultar o pedido.' },
        { status: 401 },
      )
    }

    const order = getOrders().find(
      (item) => item.orderId === params.orderId,
    )

    if (!order || order.ownerEmail !== ownerEmail) {
      return HttpResponse.json(
        { message: 'Pedido não encontrado.' },
        { status: 404 },
      )
    }

    return HttpResponse.json({
      orderId: order.orderId,
      status: order.status,
      nftIds: order.nftIds,
      createdAt: order.createdAt,
    })
  }),
]

function orderKey(order: StoredOrder): string | undefined {
  return (
    order as StoredOrder & { idempotencyKey?: string }
  ).idempotencyKey
}

