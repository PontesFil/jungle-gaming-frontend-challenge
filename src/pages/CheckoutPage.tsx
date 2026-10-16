import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { createCheckout } from '../services/checkoutService'
import { Button } from '@/components/ui/button'

export default function CheckoutPage() {
  const { items, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [collectorName, setCollectorName] = useState('')
  const [collectorEmail, setCollectorEmail] = useState('')
  const [wallet, setWallet] = useState('metamask')
  const [network, setNetwork] = useState('ethereum')
  const [acceptedReview, setAcceptedReview] = useState(false)

  const [idempotencyKey, setIdempotencyKey] = useState(
    () => crypto.randomUUID(),
  )

  const total = items.reduce((sum, nft) => sum + nft.price, 0)

  const checkoutMutation = useMutation({
    mutationFn: createCheckout,

    onSuccess: (response) => {
      if (response.status !== 'confirmed') {
        return
      }

      clearCart()
      setIdempotencyKey(crypto.randomUUID())

      navigate({
        to: '/confirmation',
        search: { orderId: response.orderId },
      })
    },
  })

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (
      !user ||
      items.length === 0 ||
      checkoutMutation.isPending ||
      !acceptedReview
    ) {
      return
    }

    checkoutMutation.mutate({
      nftIds: items.map((nft) => nft.id),
      idempotencyKey,
      expectedPrices: Object.fromEntries(
        items.map((nft) => [nft.id, nft.price]),
      ),
    })
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#140e0c] px-4 py-16 text-white">
        <div className="mx-auto max-w-xl rounded-2xl border border-[#493025] bg-[#211713] p-8 text-center">
          <h1 className="text-2xl font-extrabold">
            Entre para continuar
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Você precisa estar autenticado para acessar o pagamento.
          </p>

          <Link
            to="/login"
            className="mt-6 inline-flex rounded-xl bg-orange-500 px-6 py-3 font-bold text-[#1b100b] transition hover:bg-orange-400"
          >
            Fazer login
          </Link>
        </div>
      </main>
    )
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#140e0c] px-4 py-16 text-white">
        <div className="mx-auto max-w-xl rounded-2xl border border-[#493025] bg-[#211713] p-8 text-center">
          <h1 className="text-2xl font-extrabold">
            Seu carrinho está vazio
          </h1>

          <p className="mt-4 text-sm text-white/60">
            Adicione um NFT ao carrinho para continuar.
          </p>

          <Link
            to="/cart"
            className="mt-6 inline-block font-semibold text-orange-400 hover:underline"
          >
            ← Voltar ao carrinho
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#140e0c] text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Navegação */}
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

          <Link
            to="/cart"
            className="transition hover:text-orange-400"
          >
            Carrinho
          </Link>

          <span className="mx-3">/</span>

          <span className="text-orange-400">
            Pagamento
          </span>
        </nav>

        {/* Cabeçalho */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
            Última etapa
          </p>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Finalizar pagamento
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-white/50">
            Revise seus dados e os NFTs antes de confirmar seu pedido.
          </p>
        </div>

        {/* Etapas */}
        <div className="mb-8 flex flex-wrap items-center gap-3 text-xs font-semibold sm:text-sm">
          <span className="text-orange-400">
            ✓ Carrinho
          </span>

          <span className="text-white/30">—</span>

          <span className="rounded-full border border-orange-500/40 bg-orange-500/10 px-3 py-1.5 text-orange-400">
            2. Pagamento
          </span>

          <span className="text-white/30">—</span>

          <span className="text-white/40">
            3. Confirmação
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]"
        >
          <div className="space-y-6">
            {/* Dados do colecionador */}
            <section className="rounded-2xl border border-[#493025] bg-[#211713] p-5 sm:p-6">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-orange-400">
                  Etapa 01
                </p>

                <h2 className="mt-2 text-xl font-extrabold">
                  Dados do colecionador
                </h2>

                <p className="mt-2 text-sm text-white/50">
                  Informe os dados para identificar seu pedido.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="collector-name"
                    className="mb-2 block text-sm font-medium text-white/70"
                  >
                    Nome completo
                  </label>

                  <input
                    id="collector-name"
                    type="text"
                    autoComplete="name"
                    required
                    minLength={3}
                    value={collectorName}
                    onChange={(event) =>
                      setCollectorName(event.target.value)
                    }
                    placeholder="Seu nome completo"
                    className="w-full rounded-xl border border-[#493025] bg-[#140e0c] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-orange-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="collector-email"
                    className="mb-2 block text-sm font-medium text-white/70"
                  >
                    E-mail
                  </label>

                  <input
                    id="collector-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={collectorEmail}
                    onChange={(event) =>
                      setCollectorEmail(event.target.value)
                    }
                    placeholder="seu@email.com"
                    className="w-full rounded-xl border border-[#493025] bg-[#140e0c] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-orange-400"
                  />
                </div>
              </div>
            </section>

            {/* Carteira e rede */}
            <section className="rounded-2xl border border-[#493025] bg-[#211713] p-5 sm:p-6">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-orange-400">
                  Etapa 02
                </p>

                <h2 className="mt-2 text-xl font-extrabold">
                  Carteira e rede
                </h2>

                <p className="mt-2 text-sm text-white/50">
                  Selecione as opções para simular o pagamento.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="wallet"
                    className="mb-2 block text-sm font-medium text-white/70"
                  >
                    Carteira
                  </label>

                  <select
                    id="wallet"
                    value={wallet}
                    onChange={(event) =>
                      setWallet(event.target.value)
                    }
                    className="w-full rounded-xl border border-[#493025] bg-[#140e0c] px-4 py-3 text-sm text-white outline-none focus:border-orange-400"
                  >
                    <option value="metamask">
                      MetaMask (simulada)
                    </option>

                    <option value="walletconnect">
                      WalletConnect (simulada)
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="network"
                    className="mb-2 block text-sm font-medium text-white/70"
                  >
                    Rede
                  </label>

                  <select
                    id="network"
                    value={network}
                    onChange={(event) =>
                      setNetwork(event.target.value)
                    }
                    className="w-full rounded-xl border border-[#493025] bg-[#140e0c] px-4 py-3 text-sm text-white outline-none focus:border-orange-400"
                  >
                    <option value="ethereum">Ethereum</option>
                    <option value="polygon">Polygon</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-orange-500/20 bg-orange-500/5 p-4">
                <p className="text-sm leading-relaxed text-white/60">
                  Esta é uma experiência demonstrativa. Nenhuma
                  carteira real será conectada e nenhuma transação
                  em blockchain será realizada.
                </p>
              </div>
            </section>

            <Link
              to="/cart"
              className="inline-flex text-sm font-semibold text-orange-400 hover:underline"
            >
              ← Voltar ao carrinho
            </Link>
          </div>

          {/* Revisão do pedido */}
          <aside className="rounded-2xl border border-[#67412c] bg-[#281b15] p-5 sm:p-6 lg:sticky lg:top-24">
            <h2 className="text-xl font-extrabold">
              Revisão do pedido
            </h2>

            <p className="mt-2 text-sm text-white/50">
              Confira os itens antes de finalizar.
            </p>

            <div className="mt-6 space-y-4">
              {items.map((nft) => (
                <div
                  key={nft.id}
                  className="flex items-center gap-3 border-b border-white/10 pb-4"
                >
                  <img
                    src={nft.imageUrl}
                    alt={`Arte do NFT ${nft.name}`}
                    className="h-14 w-14 shrink-0 rounded-lg object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">
                      {nft.name}
                    </p>

                    <p className="mt-1 truncate text-xs text-white/50">
                      {nft.creator}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-bold text-orange-400">
                    {nft.price.toFixed(2)} {nft.currency}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-white/60">Itens</span>
                <span className="font-semibold">{items.length}</span>
              </div>

              <div className="flex justify-between gap-4 text-sm">
                <span className="text-white/60">Subtotal</span>
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

            <p className="mt-4 text-xs leading-relaxed text-white/40">
              Valor ilustrativo, sem cotação em moeda fiduciária
              ou taxas de rede.
            </p>

            <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm text-white/70">
              <input
                type="checkbox"
                checked={acceptedReview}
                onChange={(event) =>
                  setAcceptedReview(event.target.checked)
                }
                className="mt-1 h-4 w-4 accent-orange-500"
              />

              <span>
                Revisei os dados e desejo confirmar este pedido
                simulado.
              </span>
            </label>

            <Button
              type="submit"
              disabled={
                checkoutMutation.isPending || !acceptedReview
              }
              className="mt-6 w-full bg-orange-500 px-4 py-6 font-bold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {checkoutMutation.isPending
                ? 'Processando pedido...'
                : 'Confirmar pedido'}
            </Button>

            {checkoutMutation.isError && (
              <p
                role="alert"
                className="mt-4 text-sm leading-relaxed text-red-400"
              >
                {axios.isAxiosError(checkoutMutation.error) &&
                checkoutMutation.error.response?.status === 409
                  ? 'O preço de um ou mais NFTs mudou. Volte ao carrinho, revise os valores e tente novamente.'
                  : 'Não foi possível processar o pedido. Seus itens continuam no carrinho. Tente novamente.'}
              </p>
            )}

            <p className="mt-4 text-center text-xs leading-relaxed text-white/40">
              Ao confirmar, você conclui apenas uma compra simulada.
            </p>
          </aside>
        </form>
      </div>
    </main>
  )
}