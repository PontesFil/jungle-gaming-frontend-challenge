import { Link } from '@tanstack/react-router'
import { useCart } from '../contexts/CartContext'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { createCheckout } from '../services/checkoutService'

export default function CartPage() {
  const { items, removeItem, clearCart } = useCart()

  const total = items.reduce((sum, nft) => sum + nft.price, 0)

  const navigate = useNavigate()

const [idempotencyKey, setIdempotencyKey] = useState(() =>
  crypto.randomUUID(),
)

const checkoutMutation = useMutation({
  mutationFn: createCheckout,

  onSuccess: (response) => {
    clearCart()
    setIdempotencyKey(crypto.randomUUID())

    navigate({
      to: '/confirmation',
      search: { orderId: response.orderId },
    })
  },
})

function handleCheckout() {
  if (items.length === 0 || checkoutMutation.isPending) {
    return
  }

  checkoutMutation.mutate({
    nftIds: items.map((nft) => nft.id),
    idempotencyKey,
  })
}

  return (
    <main className="min-h-screen bg-[#140e0c] px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-3xl font-bold">Meu carrinho</h1>

        {items.length === 0 ? (
          <div className="rounded-xl border border-white/10 p-8 text-center">
            <p className="mb-4 text-white/60">
              Seu carrinho está vazio.
            </p>

            <Link to="/" className="text-orange-400 hover:underline">
              Explorar NFTs
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-[1fr_300px]">
            <section className="space-y-4">
              {items.map((nft) => (
                <article
                  key={nft.id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#211714] p-4"
                >
                  <div>
                    <h2 className="font-bold">{nft.name}</h2>
                    <p className="text-sm text-white/60">{nft.creator}</p>
                    <p className="mt-2 text-orange-400">
                      {nft.price} {nft.currency}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(nft.id)}
                    className="rounded border border-red-400/40 px-3 py-2 text-sm text-red-300 hover:bg-red-400/10"
                  >
                    Remover
                  </button>
                </article>
              ))}
            </section>

            <aside className="h-fit rounded-xl border border-white/10 bg-[#211714] p-6">
              <h2 className="mb-6 text-xl font-bold">Resumo do pedido</h2>

              <div className="flex justify-between">
                <span className="text-white/60">Itens</span>
                <span>{items.length}</span>
              </div>

              <div className="mt-4 flex justify-between border-t border-white/10 pt-4">
                <span className="font-bold">Total</span>
                <span className="font-bold text-orange-400">
                  {total.toFixed(2)} ETH
                </span>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                disabled={checkoutMutation.isPending}
                className="mt-6 w-full rounded-lg bg-orange-500 px-4 py-3 font-bold text-black disabled:cursor-not-allowed disabled:opacity-50"
                >
                {checkoutMutation.isPending ? 'Processando...' : 'Finalizar compra'}
                </button>

{checkoutMutation.isError && (
  <p role="alert" className="mt-3 text-sm text-red-400">
    Não foi possível finalizar a compra. Tente novamente.
  </p>
)}
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}