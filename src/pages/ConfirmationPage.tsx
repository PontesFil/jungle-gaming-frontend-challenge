
import { Link, useSearch } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  LockKeyhole,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  AlertCircle,
} from 'lucide-react'
import axios from 'axios'

import { useAuth } from '../contexts/AuthContext'
import { getOrder } from '../services/checkoutService'

export default function ConfirmationPage() {
  const { orderId } = useSearch({ from: '/confirmation' })
  const { user } = useAuth()

  const { data, isPending, isError, error, refetch, isFetching } =
    useQuery({
      queryKey: ['order', user?.email, orderId],
      queryFn: () => getOrder(orderId),
      enabled: Boolean(user && orderId),
      retry: false,
    })

  const confirmed =
    Boolean(user && orderId) &&
    !isPending &&
    !isError &&
    data?.status === 'confirmed'

  let title = 'Consultar pedido'
  let message = 'Não foi possível consultar este pedido.'

  if (!user) {
    title = 'Entre para consultar seu pedido'
    message = 'Você precisa estar autenticado.'
  } else if (!orderId) {
    title = 'Pedido não informado'
    message = 'Nenhum identificador de pedido foi fornecido.'
  } else if (isPending) {
    title = 'Verificando pedido...'
    message = 'Aguarde enquanto consultamos a API simulada.'
  } else if (isError) {
    title = 'Pedido não confirmado'

    message =
      axios.isAxiosError(error) && error.response?.status === 404
        ? 'Pedido não encontrado para esta conta.'
        : 'Não foi possível verificar o pedido. Tente novamente.'
  } else if (confirmed) {
    title = 'Compra confirmada!'
    message =
      'Seu pedido foi confirmado com sucesso pela API simulada.'
  }

  const checking = Boolean(user && orderId && isPending)

  return (
    <main className="bg-[#140e0c] pb-24 text-[#f5eee7]">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Navegação estrutural"
          className="mb-10 flex items-center gap-3 font-mono text-xs"
        >
          <Link
            to="/"
            className="text-[#b99674] transition hover:text-[#e9a15c]"
          >
            Início
          </Link>

          <span className="text-[#70503e]">/</span>

          <span className="text-[#e9a15c]">
            Confirmação
          </span>
        </nav>

        {/* Progresso da compra */}
        <div
          aria-label="Progresso da compra"
          className="mx-auto mb-12 grid max-w-3xl grid-cols-3 gap-2 sm:gap-4"
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
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#d9914d] text-[#1a100d]">
              <Check size={15} strokeWidth={3} />
            </span>

            <span className="font-mono text-[11px] font-semibold text-[#e9a15c] sm:text-xs">
              Pagamento
            </span>
          </div>

          <div
            className={`flex items-center gap-2 border-b-2 pb-4 ${
              confirmed
                ? 'border-[#d9914d]'
                : 'border-[#493025]'
            }`}
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-xs font-extrabold ${
                confirmed
                  ? 'bg-[#d9914d] text-[#1a100d]'
                  : 'border border-[#60402f] text-[#a98a70]'
              }`}
            >
              {confirmed ? (
                <Check size={15} strokeWidth={3} />
              ) : (
                '3'
              )}
            </span>

            <span
              className={`font-mono text-[11px] font-semibold sm:text-xs ${
                confirmed
                  ? 'text-[#e9a15c]'
                  : 'text-[#a98a70]'
              }`}
            >
              Confirmação
            </span>
          </div>
        </div>

        <section className="mx-auto max-w-2xl">
          {/* Estado da consulta */}
          <div className="flex flex-col items-center border-b border-[#493025] pb-10 text-center">
            <div
              aria-hidden="true"
              className={`flex h-24 w-24 items-center justify-center rounded-full border ${
                confirmed
                  ? 'border-[#d9914d]/40 bg-[#d9914d]/10 text-[#e9a15c]'
                  : 'border-[#67412c] bg-[#281914] text-[#b99674]'
              }`}
            >
              {confirmed ? (
                <CheckCircle2 size={46} strokeWidth={1.5} />
              ) : checking ? (
                <Clock3
                  size={42}
                  strokeWidth={1.5}
                  className="animate-pulse"
                />
              ) : !user ? (
                <LockKeyhole size={40} strokeWidth={1.5} />
              ) : isError ? (
                <AlertCircle size={42} strokeWidth={1.5} />
              ) : (
                <ShoppingBag size={40} strokeWidth={1.5} />
              )}
            </div>

            <p className="mt-8 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#d9914d]">
              Kurio Marketplace
            </p>

            <h1
              className={`mt-3 font-mono text-3xl font-extrabold tracking-tight sm:text-4xl ${
                confirmed
                  ? 'text-[#e9a15c]'
                  : 'text-[#f5eee7]'
              }`}
            >
              {title}
            </h1>

            <p
              role={isError ? 'alert' : undefined}
              className="mt-5 max-w-md text-sm leading-7 text-[#b99674]"
            >
              {message}
            </p>
          </div>

          {/* Detalhes de um pedido confirmado */}
          {confirmed && data && (
            <div className="py-9">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="font-mono text-lg font-extrabold">
                  Detalhes do pedido
                </h2>

                <span className="inline-flex items-center gap-2 rounded-full border border-[#d9914d]/30 bg-[#d9914d]/10 px-3 py-1.5 font-mono text-[11px] font-bold text-[#e9a15c]">
                  <Check size={13} />
                  Confirmado
                </span>
              </div>

              <div className="mt-7 divide-y divide-[#493025] border-y border-[#493025]">
                <div className="py-5">
                  <p className="font-mono text-xs text-[#a98a70]">
                    Identificador do pedido
                  </p>

                  <p className="mt-2 break-all font-mono text-sm font-semibold text-[#f5eee7]">
                    {data.orderId}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4 py-5">
                  <span className="text-sm text-[#b99674]">
                    Status
                  </span>

                  <span className="font-mono text-xs font-bold text-[#e9a15c]">
                    Confirmado
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 py-5">
                  <span className="text-sm text-[#b99674]">
                    NFTs adquiridos
                  </span>

                  <span className="font-mono text-sm font-semibold">
                    {data.nftIds.length}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 py-5">
                  <span className="text-sm text-[#b99674]">
                    Data do pedido
                  </span>

                  <span className="font-mono text-xs font-semibold">
                    {new Date(data.createdAt).toLocaleString('pt-BR')}
                  </span>
                </div>
              </div>

              {/* Aviso demonstrativo */}
              <div className="mt-7 flex items-start gap-3 border-l-2 border-[#d9914d] bg-[#241713] px-5 py-4">
                <ShieldCheck
                  size={20}
                  className="mt-0.5 shrink-0 text-[#d9914d]"
                />

                <div>
                  <p className="font-mono text-xs font-bold">
                    Compra demonstrativa
                  </p>

                  <p className="mt-2 text-xs leading-6 text-[#b99674]">
                    Este pedido foi registrado na API simulada.
                    Nenhuma transferência de criptomoeda ou
                    NFT real foi realizada.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Ações */}
          <div className="border-t border-[#493025] pt-8">
            {!user && (
              <Link
                to="/login"
                className="mb-4 flex w-full items-center justify-center gap-2 rounded-md border border-[#d9914d] px-5 py-3.5 font-mono text-xs font-bold text-[#e9a15c] transition hover:bg-[#d9914d]/10"
              >
                Fazer login
                <ArrowRight size={16} />
              </Link>
            )}

            {user && orderId && !confirmed && !isPending && (
              <button
                type="button"
                onClick={() => void refetch()}
                disabled={isFetching}
                className="mb-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-[#d9914d] px-5 py-3.5 font-mono text-xs font-bold text-[#e9a15c] transition hover:bg-[#d9914d]/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <RefreshCw
                  size={16}
                  className={isFetching ? 'animate-spin' : ''}
                />

                {isFetching
                  ? 'Consultando pedido...'
                  : 'Consultar novamente'}
              </button>
            )}

            <Link
              to="/"
              className="flex w-full items-center justify-center gap-2 rounded-md bg-[#d9914d] px-6 py-4 font-mono text-xs font-extrabold text-[#1a100d] transition hover:bg-[#efaa67]"
            >
              Voltar ao catálogo
              <ArrowRight size={16} />
            </Link>

            <p className="mt-5 text-center text-xs text-[#96755f]">
              Obrigado por explorar o Kurio Marketplace.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
