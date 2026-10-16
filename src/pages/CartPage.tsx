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
    <main className="min-h-screen bg-[#140e0c] text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Navegação"
          className="mb-8 text-sm text-white/50"
        >
          <Link
            to="/"
            className="transition hover:text-orange-400"
          >
            Mercado
          </Link>

          <span className="mx-3">/</span>

          <span className="text-orange-400">Meu carrinho</span>
        </nav>

        {/* Cabeçalho */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
              Sua seleção
            </p>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Meu carrinho
            </h1>

            <p className="mt-3 text-sm text-white/50">
              {items.length === 1
                ? '1 NFT selecionado'
                : `${items.length} NFTs selecionados`}
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-orange-400 transition hover:text-orange-300"
          >
            ← Continuar explorando
          </Link>
        </div>

        {items.length === 0 ? (
          /* Carrinho vazio */
          <div className="rounded-2xl border border-[#493025] bg-[#211713] px-6 py-16 text-center">
            <div
              aria-hidden="true"
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-orange-500/20 bg-orange-500/10 text-3xl"
            >
              ◇
            </div>

            <h2 className="mt-6 text-xl font-bold">
              Seu carrinho está vazio
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/50">
              Explore o marketplace e encontre um NFT para começar
              sua coleção.
            </p>

            <Link
              to="/"
              className="mt-7 inline-flex items-center justify-center rounded-xl bg-orange-500 px-6 py-3 font-bold text-[#1b100b] transition hover:bg-orange-400"
            >
              Explorar NFTs →
            </Link>
          </div>
        ) : (
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            {/* Lista de NFTs */}
            <section
              aria-label="Itens do carrinho"
              className="space-y-4"
            >
              {items.map((nft) => (
                <article
                  key={nft.id}
                  className="rounded-2xl border border-[#493025] bg-[#211713] p-4 transition hover:border-[#704630] sm:p-5"
                >
                  <div className="flex gap-4 sm:gap-5">
                    <Link
                      to="/nft/$nftId"
                      params={{ nftId: nft.id }}
                      aria-label={`Ver detalhes de ${nft.name}`}
                      className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#35251e] sm:h-32 sm:w-32"
                    >
                      <img
                        src={nft.imageUrl}
                        alt={`Arte do NFT ${nft.name}`}
                        className="h-full w-full object-cover"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-orange-400">
                            {nft.category}
                          </p>

                          <h2 className="mt-1 text-lg font-bold sm:text-xl">
                            <Link
                              to="/nft/$nftId"
                              params={{ nftId: nft.id }}
                              className="transition hover:text-orange-400"
                            >
                              {nft.name}
                            </Link>
                          </h2>

                          <p className="mt-1 text-xs text-white/50 sm:text-sm">
                            Criado por {nft.creator}
                          </p>
                        </div>
                      </div>

                      <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4">
                        <div>
                          <p className="text-xs text-white/40">
                            Preço
                          </p>

                          <p className="mt-1 text-lg font-extrabold text-orange-400 sm:text-xl">
                            {nft.price.toFixed(2)}{' '}
                            <span className="text-sm">
                              {nft.currency}
                            </span>
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(nft.id)}
                          aria-label={`Remover ${nft.name} do carrinho`}
                          className="rounded-lg border border-red-400/30 px-3 py-2 text-xs font-semibold text-red-300 transition hover:border-red-400/60 hover:bg-red-400/10 sm:text-sm"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              <div className="rounded-xl border border-[#493025] bg-[#211713] p-4">
                <p className="text-sm leading-relaxed text-white/50">
                  Os preços exibidos são demonstrativos e podem ser
                  atualizados durante a navegação.
                </p>
              </div>
            </section>

            {/* Resumo do pedido */}
            <aside className="rounded-2xl border border-[#67412c] bg-[#281b15] p-5 lg:sticky lg:top-24 sm:p-6">
              <h2 className="text-xl font-extrabold">
                Resumo do pedido
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-white/60">
                    Itens
                  </span>

                  <span className="font-semibold">
                    {items.length}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-white/60">
                    Subtotal
                  </span>

                  <span className="font-semibold">
                    {total.toFixed(2)} ETH
                  </span>
                </div>

                <div className="border-t border-white/10 pt-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-bold">
                      Total estimado
                    </span>

                    <span className="text-2xl font-extrabold text-orange-400">
                      {total.toFixed(2)} ETH
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                className="mt-7 w-full rounded-xl bg-orange-500 px-4 py-4 font-bold text-[#1b100b] transition hover:bg-orange-400"
              >
                Ir para pagamento →
              </button>

              <p className="mt-4 text-center text-xs leading-relaxed text-white/40">
                Checkout demonstrativo. Nenhuma criptomoeda
                será transferida.
              </p>

              <Link
                to="/"
                className="mt-5 block text-center text-sm font-semibold text-orange-400 hover:underline"
              >
                Continuar comprando
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}