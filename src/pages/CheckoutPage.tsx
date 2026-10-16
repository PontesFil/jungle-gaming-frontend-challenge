import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { createCheckout } from '../services/checkoutService'

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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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
    })
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#140e0c] px-6 py-16 text-white">
        <div className="mx-auto max-w-xl rounded-xl border border-white/10 bg-[#211714] p-8 text-center">
          <h1 className="mb-4 text-2xl font-bold">
            Entre para continuar
          </h1>

          <p className="mb-6 text-white/60">
            Você precisa estar autenticado para acessar o pagamento.
          </p>

          <Link
            to="/login"
            className="text-orange-400 hover:underline"
          >
            Fazer login
          </Link>
        </div>
      </main>
    )
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#140e0c] px-6 py-16 text-white">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="mb-4 text-2xl font-bold">
            Seu carrinho está vazio
          </h1>

          <Link to="/cart" className="text-orange-400 hover:underline">
            Voltar ao carrinho
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#140e0c] px-4 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/cart"
          className="mb-6 inline-block text-sm text-orange-400 hover:underline"
        >
          ← Voltar ao carrinho
        </Link>

        <h1 className="mb-2 text-3xl font-bold">
          Finalizar pagamento
        </h1>

        <p className="mb-8 text-white/60">
          Revise seus dados e os NFTs antes de confirmar.
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid items-start gap-8 lg:grid-cols-[1fr_320px]"
        >
          <div className="space-y-6">
            <section className="rounded-xl border border-white/10 bg-[#211714] p-6">
              <h2 className="mb-5 text-xl font-bold">
                Dados do colecionador
              </h2>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="collector-name"
                    className="mb-2 block text-sm text-white/70"
                  >
                    Nome completo
                  </label>

                  <input
                    id="collector-name"
                    type="text"
                    required
                    minLength={3}
                    value={collectorName}
                    onChange={(event) =>
                      setCollectorName(event.target.value)
                    }
                    placeholder="Seu nome completo"
                    className="w-full rounded-lg border border-white/15 bg-[#140e0c] px-4 py-3 text-white outline-none focus:border-orange-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="collector-email"
                    className="mb-2 block text-sm text-white/70"
                  >
                    E-mail
                  </label>

                  <input
                    id="collector-email"
                    type="email"
                    required
                    value={collectorEmail}
                    onChange={(event) =>
                      setCollectorEmail(event.target.value)
                    }
                    placeholder="seu@email.com"
                    className="w-full rounded-lg border border-white/15 bg-[#140e0c] px-4 py-3 text-white outline-none focus:border-orange-400"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-white/10 bg-[#211714] p-6">
              <h2 className="mb-5 text-xl font-bold">
                Carteira e rede
              </h2>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="wallet"
                    className="mb-2 block text-sm text-white/70"
                  >
                    Carteira
                  </label>

                  <select
                    id="wallet"
                    value={wallet}
                    onChange={(event) => setWallet(event.target.value)}
                    className="w-full rounded-lg border border-white/15 bg-[#140e0c] px-4 py-3 text-white"
                  >
                    <option value="metamask">MetaMask (simulada)</option>
                    <option value="walletconnect">
                      WalletConnect (simulada)
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="network"
                    className="mb-2 block text-sm text-white/70"
                  >
                    Rede
                  </label>

                  <select
                    id="network"
                    value={network}
                    onChange={(event) => setNetwork(event.target.value)}
                    className="w-full rounded-lg border border-white/15 bg-[#140e0c] px-4 py-3 text-white"
                  >
                    <option value="ethereum">Ethereum</option>
                    <option value="polygon">Polygon</option>
                  </select>
                </div>
              </div>

              <p className="mt-4 text-xs text-white/50">
                Esta etapa utiliza dados simulados. Nenhuma carteira
                real será conectada.
              </p>
            </section>
          </div>

          <aside className="rounded-xl border border-white/10 bg-[#211714] p-6">
            <h2 className="mb-5 text-xl font-bold">
              Revisão do pedido
            </h2>

            <div className="space-y-4">
              {items.map((nft) => (
                <div
                  key={nft.id}
                  className="flex items-center justify-between gap-3 border-b border-white/10 pb-3"
                >
                  <span className="text-sm text-white/80">
                    {nft.name}
                  </span>

                  <span className="whitespace-nowrap text-sm text-orange-400">
                    {nft.price.toFixed(2)} {nft.currency}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex justify-between">
              <span className="text-white/60">Itens</span>
              <span>{items.length}</span>
            </div>

            <div className="mt-4 flex justify-between border-t border-white/10 pt-4">
              <span className="font-bold">Total estimado</span>

              <span className="font-bold text-orange-400">
                {total.toFixed(2)} ETH
              </span>
            </div>

            <p className="mt-3 text-xs text-white/50">
              Valor ilustrativo, ainda sem cotação e taxas da API.
            </p>

            <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm text-white/70">
              <input
                type="checkbox"
                checked={acceptedReview}
                onChange={(event) =>
                  setAcceptedReview(event.target.checked)
                }
                className="mt-1 accent-orange-500"
              />

              <span>
                Revisei os dados e desejo confirmar este pedido
                simulado.
              </span>
            </label>

            <button
              type="submit"
              disabled={
                checkoutMutation.isPending ||
                !acceptedReview
              }
              className="mt-6 w-full rounded-lg bg-orange-500 px-4 py-3 font-bold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {checkoutMutation.isPending
                ? 'Processando pedido...'
                : 'Confirmar pedido'}
            </button>

            {checkoutMutation.isError && (
              <p role="alert" className="mt-4 text-sm text-red-400">
                Não foi possível processar o pedido. Seus itens
                continuam no carrinho. Tente novamente.
              </p>
            )}
          </aside>
        </form>
      </div>
    </main>
  )
}