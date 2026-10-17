
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  LockKeyhole,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react'
import axios from 'axios'

import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { createCheckout } from '../services/checkoutService'
import { Button } from '@/components/ui/button'

const inputClass =
  'w-full rounded-xl border border-[#60402f] bg-[#170f0c] px-4 py-3.5 text-sm text-[#f5eee7] outline-none transition placeholder:text-[#806555] focus:border-[#d9914d] focus:ring-1 focus:ring-[#d9914d]/30 md:rounded-md'

const labelClass =
  'mb-2.5 block font-mono text-xs font-semibold text-[#e6d5c5]'

const walletOptions = [
  {
    value: 'walletconnect',
    name: 'WalletConnect',
    symbol: 'W',
  },
  {
    value: 'metamask',
    name: 'MetaMask',
    symbol: 'M',
  },
]

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
      <main className="min-h-[70dvh] bg-[#140e0c] px-4 py-20 text-[#f5eee7]">
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
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#d9914d] px-7 py-3.5 font-mono text-xs font-extrabold text-[#1a100d] transition hover:bg-[#efaa67]"
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
      <main className="min-h-[70dvh] bg-[#140e0c] px-4 py-20 text-[#f5eee7]">
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
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#d9914d] px-7 py-3.5 font-mono text-xs font-bold text-[#e9a15c] transition hover:bg-[#d9914d]/10"
          >
            <ArrowLeft size={16} />
            Voltar ao carrinho
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-[100dvh] bg-[#140e0c] pb-12 text-[#f5eee7] md:min-h-0 md:pb-24">
      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-6 md:py-8 lg:px-8">
        {/* Cabeçalho mobile */}
        <div className="mb-10 flex items-center gap-5 md:hidden">
          <Link
            to="/cart"
            aria-label="Voltar ao carrinho"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#493025] bg-[#281914] text-[#d9914d]"
          >
            <ArrowLeft size={20} />
          </Link>

          <h1 className="font-mono text-xl font-extrabold leading-tight">
            Pagamento com carteira
          </h1>
        </div>

        {/* Navegação desktop */}
        <nav
          aria-label="Navegação estrutural"
          className="mb-10 hidden flex-wrap items-center gap-3 font-mono text-xs md:flex"
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

        {/* Cabeçalho desktop */}
        <div className="mb-10 hidden border-b border-[#493025] pb-8 md:block">
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

        {/* Etapas desktop */}
        <div
          aria-label="Progresso da compra"
          className="mb-10 hidden grid-cols-3 gap-2 md:grid md:gap-4"
        >
          <div className="flex items-center gap-2 border-b-2 border-[#d9914d] pb-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#d9914d] text-[#1a100d]">
              <Check size={15} strokeWidth={3} />
            </span>

            <span className="font-mono text-xs font-semibold text-[#e9a15c]">
              Carrinho
            </span>
          </div>

          <div className="flex items-center gap-2 border-b-2 border-[#d9914d] pb-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#d9914d] font-mono text-xs font-extrabold text-[#1a100d]">
              2
            </span>

            <span className="font-mono text-xs font-semibold text-[#e9a15c]">
              Pagamento
            </span>
          </div>

          <div className="flex items-center gap-2 border-b-2 border-[#493025] pb-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#60402f] font-mono text-xs text-[#a98a70]">
              3
            </span>

            <span className="font-mono text-xs text-[#a98a70]">
              Confirmação
            </span>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid items-start gap-9 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12"
        >
          <div className="space-y-9 md:space-y-10">
            {/* Dados do colecionador */}
            <section>
              <div className="mb-5 flex items-start gap-3 md:mb-6 md:gap-4 md:border-b md:border-[#493025] md:pb-6">
                <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#38251d] font-mono text-sm font-extrabold text-[#d9914d] md:flex">
                  01
                </span>

                <div>
                  <h2 className="font-mono text-lg font-extrabold">
                    Dados do colecionador
                  </h2>

                  <p className="mt-2 text-xs leading-5 text-[#b99674] md:text-sm">
                    Informe os dados para identificar seu pedido.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 md:gap-6">
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
              <div className="mb-5 flex items-start gap-3 md:mb-6 md:gap-4 md:border-b md:border-[#493025] md:pb-6">
                <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#38251d] font-mono text-sm font-extrabold text-[#d9914d] md:flex">
                  02
                </span>

                <div>
                  <h2 className="font-mono text-lg font-extrabold">
                    Carteira e rede
                  </h2>

                  <p className="mt-2 text-xs leading-5 text-[#b99674] md:text-sm">
                    Escolha as opções para simular o pagamento.
                  </p>
                </div>
              </div>

              {/* Seleção de carteira no mobile */}
              <fieldset className="space-y-3 md:hidden">
                <legend className="mb-4 font-mono text-xs font-semibold text-[#e6d5c5]">
                  Carteira
                </legend>

                {walletOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex cursor-pointer items-center gap-4 rounded-2xl border px-4 py-4 transition ${
                      wallet === option.value
                        ? 'border-[#8c5634] bg-[#2b1b16]'
                        : 'border-transparent bg-[#241713]'
                    }`}
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#493025] bg-[#321e17] font-mono text-lg font-bold text-[#d9914d]">
                      {option.symbol}
                    </span>

                    <span className="min-w-0 flex-1 font-mono text-sm font-semibold">
                      {option.name}
                    </span>

                    <input
                      type="radio"
                      name="mobile-wallet"
                      value={option.value}
                      checked={wallet === option.value}
                      onChange={() => setWallet(option.value)}
                      className="h-5 w-5 shrink-0 accent-[#d9914d]"
                    />
                  </label>
                ))}
              </fieldset>

              
{/* Carteira no desktop e rede compartilhada */}
<div className="grid gap-6 md:grid-cols-2">
  {/* Carteira: apenas desktop */}
  <div className="hidden md:block">
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

  {/* Rede: único campo para mobile e desktop */}
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


              <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#493025] bg-[#241713] px-4 py-4 md:mt-7 md:rounded-none md:border-0 md:border-l-2 md:border-l-[#d9914d] md:px-5">
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
              className="hidden items-center gap-2 font-mono text-xs font-bold text-[#e9a15c] transition hover:underline md:inline-flex"
            >
              <ArrowLeft size={16} />
              Voltar ao carrinho
            </Link>
          </div>

          {/* Revisão do pedido */}
          <aside className="rounded-2xl bg-[#241713] p-5 sm:p-7 md:rounded-none lg:sticky lg:top-24">
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

            <div className="divide-y divide-[#493025]">
              {items.map((nft) => (
                <div
                  key={nft.id}
                  className="flex items-center gap-3 py-5"
                >
                  <img
                    src={nft.imageUrl}
                    alt={`Arte do NFT ${nft.name}`}
                    className="h-14 w-14 shrink-0 rounded-lg object-cover md:rounded-md"
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
              <div className="flex flex-wrap items-baseline justify-between gap-3 md:block">
                <p className="font-mono text-sm font-bold text-[#f5eee7] md:text-xs md:font-normal md:text-[#b99674]">
                  Total:
                </p>

                <p className="font-mono text-2xl font-extrabold text-[#e9a15c] md:mt-2 md:text-3xl">
                  {total.toFixed(2)}{' '}
                  <span className="text-lg">ETH</span>
                </p>
              </div>

              <p className="mt-3 text-xs leading-6 text-[#96755f]">
                Valor ilustrativo, sem cotação em moeda
                fiduciária ou taxas de rede.
              </p>
            </div>

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
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-[#d9914d] px-4 py-7 font-mono text-sm font-extrabold text-[#1a100d] transition hover:bg-[#efaa67] disabled:cursor-not-allowed disabled:opacity-50 md:mt-6 md:rounded-md md:py-6 md:text-xs"
            >
              {checkoutMutation.isPending ? (
                'Processando pedido...'
              ) : (
                <>
                  Confirmar pedido
                  <ArrowRight
                    size={16}
                    className="hidden md:block"
                  />
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
