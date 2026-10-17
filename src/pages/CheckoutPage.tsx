
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { ArrowLeft, ArrowRight, Check, LockKeyhole, ShieldCheck, ShoppingBag } from 'lucide-react'
import axios from 'axios'

import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { createCheckout } from '../services/checkoutService'
import { Button } from '@/components/ui/button'

const inputClass =
  'w-full rounded-md border border-[#60402f] bg-[#170f0c] px-4 py-3.5 text-sm text-[#f5eee7] outline-none transition placeholder:text-[#806555] focus:border-[#d9914d] focus:ring-1 focus:ring-[#d9914d]/30'

const labelClass =
  'mb-2.5 block font-mono text-xs font-semibold text-[#e6d5c5]'

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
      <main className="bg-[#140e0c] px-4 py-20 text-[#f5eee7]">
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#67412c] bg-[#281914] text-[#d9914d]">
            <LockKeyhole size={32} strokeWidth={1.5} />
          </div>

          <h1 className="mt-7 font-mono text-2xl font-extrabold">
            Entre para continuar
          </h1>

          <p className="mt-4 max-w-md text-sm leading-7 text-[#b99674]">
            Faça login na sua conta demonstrativa para continuar
            com a finalização do pedido.
          </p>

          <Link
            to="/login"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#d9914d] px-7 py-3.5 font-mono text-xs font-extrabold text-[#1a100d] transition hover:bg-[#efaa67]"
          >
            Fazer login
            <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    )
  }

  if (items.length === 0) {
    return (
      <main className="bg-[#140e0c] px-4 py-20 text-[#f5eee7]">
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#67412c] bg-[#281914] text-[#d9914d]">
            <ShoppingBag size={32} strokeWidth={1.5} />
          </div>

          <h1 className="mt-7 font-mono text-2xl font-extrabold">
            Seu carrinho está vazio
          </h1>

          <p className="mt-4 max-w-md text-sm leading-7 text-[#b99674]">
            Adicione pelo menos um NFT à sua seleção para
            continuar com o pagamento demonstrativo.
          </p>

          <Link
            to="/cart"
            className="mt-8 inline-flex items-center gap-2 rounded-md border border-[#d9914d] px-7 py-3.5 font-mono text-xs font-bold text-[#e9a15c] transition hover:bg-[#d9914d]/10"
          >
            <ArrowLeft size={16} />
            Voltar ao carrinho
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-[#140e0c] pb-24 text-[#f5eee7]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Navegação */}
        <nav
          aria-label="Navegação estrutural"
          className="mb-10 flex flex-wrap items-center gap-3 font-mono text-xs"
        >
          <Link
            to="/"
            className="text-[#b99674] transition hover:text-[#e9a15c]"
          >
            Início
          </Link>

          <span className="text-[#70503e]">/</span>

          <Link
            to="/cart"
            className="text-[#b99674] transition hover:text-[#e9a15c]"
          >
            Carrinho
          </Link>

          <span className="text-[#70503e]">/</span>

          <span className="text-[#e9a15c]">
            Pagamento
          </span>
        </nav>

        {/* Cabeçalho */}
        <div className="mb-10 border-b border-[#493025] pb-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#d9914d]">
            Última etapa
          </p>

          <h1 className="mt-3 font-mono text-3xl font-extrabold tracking-tight sm:text-4xl">
            Finalizar pagamento
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-[#b99674]">
            Revise seus dados, confira os NFTs selecionados e
            confirme seu pedido demonstrativo.
          </p>
        </div>

        {/* Indicador de etapas */}
        <div
          aria-label="Progresso da compra"
          className="mb-10 grid grid-cols-3 gap-2 sm:gap-4"
        >
          <div className="flex items-center gap-2 border-b-2 border-[#d9914d] pb-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#d9914d] text-[#1a100d]">
              <Check size={15} strokeWidth={3} />
            </span>

            <span className="font-mono text-[11px] font-semibold text-[#e9a15c] sm:text-xs">
              Carrinho
            </span>
          </div>

          <div className="flex items-center gap-2 border-b-2 border-[#d9914d] pb-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#d9914d] font-mono text-xs font-extrabold text-[#1a100d]">
              2
            </span>

            <span className="font-mono text-[11px] font-semibold text-[#e9a15c] sm:text-xs">
              Pagamento
            </span>
          </div>

          <div className="flex items-center gap-2 border-b-2 border-[#493025] pb-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#60402f] font-mono text-xs text-[#a98a70]">
              3
            </span>

            <span className="font-mono text-[11px] text-[#a98a70] sm:text-xs">
              Confirmação
            </span>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12"
        >
          {/* Coluna esquerda */}
          <div className="space-y-10">
            {/* Dados do colecionador */}
            <section>
              <div className="mb-6 flex items-start gap-4 border-b border-[#493025] pb-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#38251d] font-mono text-sm font-extrabold text-[#d9914d]">
                  01
                </span>

                <div>
                  <h2 className="font-mono text-lg font-extrabold">
                    Dados do colecionador
                  </h2>

                  <p className="mt-2 text-sm text-[#b99674]">
                    Informe os dados para identificar seu pedido.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="collector-name"
                    className={labelClass}
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
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="collector-email"
                    className={labelClass}
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
                    className={inputClass}
                  />
                </div>
              </div>
            </section>

            {/* Carteira e rede */}
            <section>
              <div className="mb-6 flex items-start gap-4 border-b border-[#493025] pb-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#38251d] font-mono text-sm font-extrabold text-[#d9914d]">
                  02
                </span>

                <div>
                  <h2 className="font-mono text-lg font-extrabold">
                    Carteira e rede
                  </h2>

                  <p className="mt-2 text-sm text-[#b99674]">
                    Escolha as opções para simular o pagamento.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="wallet"
                    className={labelClass}
                  >
                    Carteira
                  </label>

                  <select
                    id="wallet"
                    value={wallet}
                    onChange={(event) =>
                      setWallet(event.target.value)
                    }
                    className={inputClass}
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
                    className={labelClass}
                  >
                    Rede
                  </label>

                  <select
                    id="network"
                    value={network}
                    onChange={(event) =>
                      setNetwork(event.target.value)
                    }
                    className={inputClass}
                  >
                    <option value="ethereum">Ethereum</option>
                    <option value="polygon">Polygon</option>
                  </select>
                </div>
              </div>

              <div className="mt-7 flex items-start gap-3 border-l-2 border-[#d9914d] bg-[#241713] px-5 py-4">
                <ShieldCheck
                  size={20}
                  className="mt-0.5 shrink-0 text-[#d9914d]"
                />

                <div>
                  <p className="font-mono text-xs font-bold text-[#f5eee7]">
                    Ambiente demonstrativo
                  </p>

                  <p className="mt-2 text-xs leading-6 text-[#b99674]">
                    Nenhuma carteira real será conectada e
                    nenhuma transação em blockchain será realizada.
                    As opções acima servem apenas para simular
                    a experiência de pagamento.
                  </p>
                </div>
              </div>
            </section>

            <Link
              to="/cart"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#e9a15c] transition hover:underline"
            >
              <ArrowLeft size={16} />
              Voltar ao carrinho
            </Link>
          </div>

          {/* Revisão do pedido */}
          <aside className="bg-[#241713] p-5 sm:p-7 lg:sticky lg:top-24">
            <div className="border-b border-[#493025] pb-5">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#d9914d]">
                Sua seleção
              </p>

              <h2 className="mt-2 font-mono text-xl font-extrabold">
                Revisão do pedido
              </h2>

              <p className="mt-3 text-xs leading-6 text-[#b99674]">
                Confira os itens antes de finalizar.
              </p>
            </div>

            {/* NFTs selecionados */}
            <div className="divide-y divide-[#493025]">
              {items.map((nft) => (
                <div
                  key={nft.id}
                  className="flex items-center gap-3 py-5"
                >
                  <img
                    src={nft.imageUrl}
                    alt={`Arte do NFT ${nft.name}`}
                    className="h-14 w-14 shrink-0 rounded-md object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-mono text-xs font-bold text-[#f5eee7]">
                      {nft.name}
                    </p>

                    <p className="mt-1 truncate text-[11px] text-[#a98a70]">
                      {nft.creator}
                    </p>

                    <p className="mt-2 font-mono text-xs font-bold text-[#e9a15c]">
                      {nft.price.toFixed(2)} {nft.currency}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Totais */}
            <div className="space-y-4 border-t border-[#493025] pt-6">
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

            <div className="mt-6 border-t border-[#493025] pt-6">
              <p className="font-mono text-xs text-[#b99674]">
                Total estimado
              </p>

              <p className="mt-2 font-mono text-3xl font-extrabold text-[#e9a15c]">
                {total.toFixed(2)}{' '}
                <span className="text-lg">ETH</span>
              </p>

              <p className="mt-3 text-xs leading-6 text-[#96755f]">
                Valor ilustrativo, sem cotação em moeda
                fiduciária ou taxas de rede.
              </p>
            </div>

            {/* Confirmação */}
            <label className="mt-7 flex cursor-pointer items-start gap-3 border-t border-[#493025] pt-6">
              <input
                type="checkbox"
                checked={acceptedReview}
                onChange={(event) =>
                  setAcceptedReview(event.target.checked)
                }
                className="mt-0.5 h-4 w-4 shrink-0 accent-[#d9914d]"
              />

              <span className="text-xs leading-6 text-[#c6a17b]">
                Revisei os dados e desejo confirmar este
                pedido simulado.
              </span>
            </label>

            <Button
              type="submit"
              disabled={
                checkoutMutation.isPending || !acceptedReview
              }
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-[#d9914d] px-4 py-6 font-mono text-xs font-extrabold text-[#1a100d] transition hover:bg-[#efaa67] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {checkoutMutation.isPending ? (
                'Processando pedido...'
              ) : (
                <>
                  Confirmar pedido
                  <ArrowRight size={16} />
                </>
              )}
            </Button>

            {checkoutMutation.isError && (
              <p
                role="alert"
                className="mt-5 text-sm leading-6 text-red-400"
              >
                {axios.isAxiosError(checkoutMutation.error) &&
                checkoutMutation.error.response?.status === 409
                  ? 'O preço de um ou mais NFTs mudou. Volte ao carrinho, revise os valores e tente novamente.'
                  : 'Não foi possível processar o pedido. Seus itens continuam no carrinho. Tente novamente.'}
              </p>
            )}

            <p className="mt-4 text-center text-xs leading-6 text-[#96755f]">
              Ao confirmar, você conclui apenas uma
              compra simulada.
            </p>
          </aside>
        </form>
      </div>
    </main>
  )
}
