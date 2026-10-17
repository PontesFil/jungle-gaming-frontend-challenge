
import { Link, useNavigate } from '@tanstack/react-router'
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react'

import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'

export default function CartPage() {
  const { items, removeItem } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const total = items.reduce(
    (sum, nft) => sum + nft.price,
    0,
  )

  function handleCheckout() {
    if (items.length === 0) return

    if (!user) {
      navigate({ to: '/login' })
      return
    }

    navigate({ to: '/checkout' })
  }

  return (
    <main className="min-h-[60vh] bg-[#140e0c] pb-28 text-[#f5eee7] md:pb-24">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        {/* Cabeçalho mobile */}
        <div className="relative mb-7 flex items-center justify-center md:hidden">
          <Link
            to="/"
            aria-label="Voltar ao mercado"
            className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full border border-[#493025] bg-[#241713] text-[#e9a15c] transition hover:bg-[#352219]"
          >
            <ArrowLeft size={19} />
          </Link>

          <h1 className="font-mono text-lg font-extrabold">
            Carrinho de NFTs
          </h1>
        </div>

        {/* Breadcrumb desktop */}
        <nav
          aria-label="Navegação estrutural"
          className="mb-10 hidden items-center gap-3 font-mono text-xs md:flex"
        >
          <Link
            to="/"
            className="text-[#b99674] transition hover:text-[#e9a15c]"
          >
            Início
          </Link>

          <span className="text-[#70503e]">/</span>

          <Link
            to="/"
            hash="explorar"
            className="text-[#b99674] transition hover:text-[#e9a15c]"
          >
            Mercado
          </Link>

          <span className="text-[#70503e]">/</span>

          <span className="text-[#e9a15c]">
            Meu carrinho
          </span>
        </nav>

        {/* Cabeçalho desktop */}
        <div className="mb-10 hidden flex-wrap items-end justify-between gap-5 border-b border-[#493025] pb-7 md:flex">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#d9914d]">
              Sua coleção começa aqui
            </p>

            <h1 className="mt-3 font-mono text-3xl font-extrabold tracking-tight sm:text-4xl">
              Meu carrinho
            </h1>

            <p className="mt-3 text-sm text-[#b99674]">
              {items.length === 1
                ? '1 NFT selecionado'
                : `${items.length} NFTs selecionados`}
            </p>
          </div>

          <Link
            to="/"
            hash="explorar"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#e9a15c] transition hover:text-[#f4b97d]"
          >
            <ArrowLeft size={15} />
            Continuar explorando
          </Link>
        </div>

        {items.length === 0 ? (
          /* Carrinho vazio */
          <section className="mx-auto flex max-w-2xl flex-col items-center py-12 text-center sm:py-24">
            <div
              aria-hidden="true"
              className="flex h-20 w-20 items-center justify-center rounded-full border border-[#67412c] bg-[#281914] text-[#d9914d]"
            >
              <ShoppingBag size={34} strokeWidth={1.5} />
            </div>

            <h2 className="mt-7 font-mono text-2xl font-extrabold sm:text-3xl">
              Seu carrinho está vazio
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-[#b99674]">
              Sua próxima descoberta está esperando por você.
              Explore nossa seleção de arte digital e encontre
              um NFT para começar sua coleção.
            </p>

            <Link
              to="/"
              hash="explorar"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#d9914d] px-7 py-3.5 font-mono text-xs font-extrabold text-[#1a100d] transition hover:bg-[#efaa67] md:rounded-md"
            >
              Explorar NFTs
              <ArrowRight size={16} />
            </Link>
          </section>
        ) : (
          <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_350px] lg:gap-12">
            {/* Lista de itens */}
            <section aria-label="Itens do carrinho">
              <div className="mb-4 flex items-center justify-between md:mb-5">
                <h2 className="font-mono text-xs font-bold text-[#b99674] md:text-sm md:text-[#f5eee7]">
                  Itens selecionados
                </h2>

                <span className="font-mono text-xs text-[#a98a70]">
                  {items.length}{' '}
                  {items.length === 1 ? 'item' : 'itens'}
                </span>
              </div>

              <div className="space-y-3 md:space-y-0 md:divide-y md:divide-[#493025] md:border-y md:border-[#493025]">
                {items.map((nft) => (
                  <article
                    key={nft.id}
                    className="flex min-w-0 gap-3 rounded-2xl bg-[#281914] p-3 sm:gap-4 md:gap-6 md:rounded-none md:bg-transparent md:px-0 md:py-6"
                  >
                    {/* Imagem */}
                    <Link
                      to="/nft/$nftId"
                      params={{ nftId: nft.id }}
                      aria-label={`Ver detalhes de ${nft.name}`}
                      className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#35251e] sm:h-28 sm:w-28 md:h-36 md:w-36 md:rounded-lg"
                    >
                      <img
                        src={nft.imageUrl}
                        alt={`Arte do NFT ${nft.name}`}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </Link>

                    {/* Informações */}
                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
                      <div>
                        <p className="font-mono text-[9px] font-semibold uppercase tracking-wide text-[#d9914d] md:text-[11px]">
                          {nft.category}
                        </p>

                        <h3 className="mt-1 truncate font-mono text-xs font-extrabold sm:text-base md:mt-2 md:text-lg">
                          <Link
                            to="/nft/$nftId"
                            params={{ nftId: nft.id }}
                            className="transition hover:text-[#e9a15c]"
                          >
                            {nft.name}
                          </Link>
                        </h3>

                        <p className="mt-1 truncate text-[10px] text-[#a98a70] sm:text-xs md:mt-2">
                          Criado por {nft.creator}
                        </p>
                      </div>

                      <div className="flex items-end justify-between gap-2">
                        <div>
                          <p className="hidden font-mono text-[11px] text-[#a98a70] md:block">
                            Preço atual
                          </p>

                          <p className="font-mono text-base font-extrabold text-[#e9a15c] sm:text-lg md:mt-1 md:text-xl">
                            {nft.price.toFixed(2)}{' '}
                            <span className="text-xs">
                              {nft.currency}
                            </span>
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(nft.id)}
                          aria-label={`Remover ${nft.name} do carrinho`}
                          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#493025] text-[#c8a18a] transition hover:border-red-400/40 hover:bg-red-400/10 hover:text-red-300 md:h-auto md:w-auto md:gap-2 md:rounded-md md:border-0 md:px-3 md:py-2"
                        >
                          <Trash2 size={16} />
                          <span className="hidden text-xs font-semibold md:inline">
                            Remover
                          </span>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Aviso */}
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#493025]/50 bg-[#241713] p-4 md:mt-6 md:rounded-lg md:border-0">
                <span
                  aria-hidden="true"
                  className="font-mono text-lg text-[#d9914d]"
                >
                  ◇
                </span>

                <p className="text-xs leading-6 text-[#b99674]">
                  Os preços são demonstrativos e podem ser
                  atualizados durante a navegação. O total
                  exibido acompanha os valores dos itens
                  no carrinho.
                </p>
              </div>
            </section>

            {/* Resumo do pedido */}
            <aside className="rounded-[28px] bg-[#241713] p-5 sm:p-7 lg:sticky lg:top-24 lg:rounded-none">
              <div className="border-b border-[#493025] pb-5">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#d9914d] md:text-xs">
                  Finalizar seleção
                </p>

                <h2 className="mt-2 font-mono text-lg font-extrabold md:text-xl">
                  Resumo do pedido
                </h2>
              </div>

              <div className="space-y-5 py-6">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-[#b99674]">
                    Quantidade de NFTs
                  </span>

                  <span className="font-mono font-semibold">
                    {items.length}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-[#b99674]">
                    Subtotal
                  </span>

                  <span className="font-mono font-semibold">
                    {total.toFixed(2)} ETH
                  </span>
                </div>
              </div>

              <div className="border-t border-[#493025] pt-6">
                <p className="font-mono text-xs text-[#b99674]">
                  Total estimado
                </p>

                <p className="mt-2 font-mono text-3xl font-extrabold text-[#e9a15c]">
                  {total.toFixed(2)}{' '}
                  <span className="text-lg">ETH</span>
                </p>

                <button
                  type="button"
                  onClick={handleCheckout}
                  className="mt-7 flex min-h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#d9914d] px-4 py-4 font-mono text-xs font-extrabold text-[#1a100d] transition hover:bg-[#efaa67] md:min-h-0 md:rounded-md"
                >
                  Ir para pagamento
                  <ArrowRight size={16} />
                </button>

                <p className="mt-4 text-center text-xs leading-6 text-[#96755f]">
                  Checkout demonstrativo. Nenhuma
                  criptomoeda será transferida.
                </p>

                <Link
                  to="/"
                  hash="explorar"
                  className="mt-6 block text-center font-mono text-xs font-semibold text-[#e9a15c] transition hover:underline"
                >
                  Continuar comprando
                </Link>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}
