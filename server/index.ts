
import { createServer } from 'node:http'
import { Server } from 'socket.io'

const port = Number(process.env.PORT || 3001)

const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  ...(process.env.FRONTEND_URL
    ? [process.env.FRONTEND_URL]
    : []),
]

const httpServer = createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    })

    res.end(
      JSON.stringify({
        status: 'ok',
        service: 'kurio-socket',
      }),
    )

    return
  }

  res.writeHead(404)
  res.end('Not found')
})

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
  },
})

const prices = new Map<string, number>([
  ['1', 1.19],
  ['2', 1.20],
])

io.on('connection', (socket) => {
  console.log(`Cliente conectado: ${socket.id}`)

  socket.emit(
    'prices:snapshot',
    Object.fromEntries(prices),
  )

  socket.on('disconnect', () => {
    console.log(`Cliente desconectado: ${socket.id}`)
  })
})

setInterval(() => {
  const ids = [...prices.keys()]
  const id = ids[Math.floor(Math.random() * ids.length)]

  const currentPrice = prices.get(id)

  if (currentPrice === undefined) return

  const variation = Math.random() > 0.5 ? 0.01 : -0.01

  const newPrice = Math.max(
    0.01,
    Number((currentPrice + variation).toFixed(2)),
  )

  prices.set(id, newPrice)

  io.emit('nft:price-updated', {
    id,
    price: newPrice,
  })

  console.log(`NFT ${id}: ${newPrice} ETH`)
}, 10_000)

httpServer.listen(port, '0.0.0.0', () => {
  console.log(`Socket.IO rodando na porta ${port}`)
})
