import { createServer } from 'node:http'
import { Server } from 'socket.io'

const httpServer = createServer()

const io = new Server(httpServer, {
  cors: {
    origin: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'http://localhost:4173',
    ],
  },
})

const prices = new Map([
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

httpServer.listen(3001, () => {
  console.log('Socket.IO rodando em http://localhost:3001')
})