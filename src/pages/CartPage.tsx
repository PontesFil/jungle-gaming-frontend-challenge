import { Link, useNavigate } from '@tanstack/react-router'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'

export default function CartPage() {
  const { items, removeItem } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const total = items.reduce((sum, nft) => sum + nft.price, 0)

  function handleCheckout() {
    if (items.length === 0) return

    if (!user) {
      navigate({ to: '/login' })
      return
    }

    navigate({ to: '/checkout' })
  }

  return (
    <main className="min-h-screen bg-[#140e0c] px-4 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-3xl font-bold">
          Meu carrinho
        </h1>

        {items.length === 0 ? (
          <div className="rounded-xl border border-white/10 p-8 text-center">
            <p className="mb-4 text-white/60">
              Seu carrinho está vazio.
            </p>

            <Link
              to="/"
              className="text-orange-400 hover:underline"
            >
              Explorar NFTs
            </Link>
          </div>
        ) : (
          <div className="grid items-start gap-8 md:grid-cols-[1fr_300px]">
            <section className="space-y-4">
              {items.map((nft) => (
                <article
                  key={nft.id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#211714] p-4"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <img
                      src={nft.imageUrl}
                      alt={`Arte do NFT ${nft.name}`}
                      className="h-20 w-20 shrink-0 rounded-lg object-cover"
                    />

                    <div className="min-w-0">
                      <h2 className="font-bold">
                        {nft.name}
                      </h2>

                      <p className="text-sm text-white/60">
                        {nft.creator}
                      </p>

                      <p className="mt-2 text-orange-400">
                        {nft.price.toFixed(2)} {nft.currency}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(nft.id)}
                    className="shrink-0 rounded border border-red-400/40 px-3 py-2 text-sm text-red-300 hover:bg-red-400/10"
                  >
                    Remover
                  </button>
                </article>
              ))}
            </section>

            <aside className="rounded-xl border border-white/10 bg-[#211714] p-6">
              <h2 className="mb-6 text-xl font-bold">
                Resumo do pedido
              </h2>

              <div className="flex justify-between">
                <span className="text-white/60">Itens</span>
                <span>{items.length}</span>
              </div>

              <div className="mt-4 flex justify-between border-t border-white/10 pt-4">
                <span className="font-bold">Total estimado</span>

                <span className="font-bold text-orange-400">
                  {total.toFixed(2)} ETH
                </span>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                className="mt-6 w-full rounded-lg bg-orange-500 px-4 py-3 font-bold text-black transition hover:bg-orange-400"
              >
                Ir para pagamento
              </button>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}