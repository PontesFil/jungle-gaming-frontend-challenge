import { Link, useSearch } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
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
    message = 'Aguarde enquanto consultamos a API.'
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

  return (
    <main className="min-h-screen bg-[#140e0c] text-white">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
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

          <span className="text-orange-400">
            Confirmação
          </span>
        </nav>

        {/* Etapas da compra */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold sm:text-sm">
          <span className="text-orange-400">
            ✓ Carrinho
          </span>

          <span className="text-white/30">—</span>

          <span className="text-orange-400">
            ✓ Pagamento
          </span>

          <span className="text-white/30">—</span>

          <span
            className={
              confirmed
                ? 'rounded-full border border-orange-500/40 bg-orange-500/10 px-3 py-1.5 text-orange-400'
                : 'rounded-full border border-white/10 px-3 py-1.5 text-white/50'
            }
          >
            3. Confirmação
          </span>
        </div>

        <section className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-[#67412c] bg-[#211713]">
          {/* Cabeçalho */}
          <div className="border-b border-white/10 px-6 py-10 text-center sm:px-10">
            <div
              aria-hidden="true"
              className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full border text-4xl ${
                confirmed
                  ? 'border-orange-500/30 bg-orange-500/10 text-orange-400'
                  : 'border-white/10 bg-white/5 text-white/50'
              }`}
            >
              {confirmed ? '✓' : isPending && user && orderId ? '…' : '◇'}
            </div>

            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
              Kurio Marketplace
            </p>

            <h1
              className={`mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl ${
                confirmed ? 'text-orange-400' : 'text-white'
              }`}
            >
              {title}
            </h1>

            <p
              role={isError ? 'alert' : undefined}
              className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/60"
            >
              {message}
            </p>
          </div>

          {/* Detalhes do pedido */}
          {confirmed && data && (
            <div className="px-6 py-8 sm:px-10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-extrabold">
                  Detalhes do pedido
                </h2>

                <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-400">
                  ✓ Confirmado
                </span>
              </div>

              <div className="mt-6 divide-y divide-white/10 rounded-xl border border-[#493025] bg-[#140e0c] px-5">
                <div className="py-4">
                  <p className="text-xs text-white/40">
                    Identificador do pedido
                  </p>

                  <p className="mt-2 break-all font-mono text-sm text-white/90">
                    {data.orderId}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4 py-4">
                  <span className="text-sm text-white/50">
                    Status
                  </span>

                  <span className="text-sm font-semibold text-orange-400">
                    Confirmado
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 py-4">
                  <span className="text-sm text-white/50">
                    NFTs adquiridos
                  </span>

                  <span className="text-sm font-semibold">
                    {data.nftIds.length}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 py-4">
                  <span className="text-sm text-white/50">
                    Data do pedido
                  </span>

                  <span className="text-sm font-semibold">
                    {new Date(data.createdAt).toLocaleString('pt-BR')}
                  </span>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-orange-500/20 bg-orange-500/5 p-4">
                <p className="text-sm leading-relaxed text-white/60">
                  Este pedido faz parte de uma experiência demonstrativa.
                  Nenhuma transferência de criptomoeda ou NFT real
                  foi realizada.
                </p>
              </div>
            </div>
          )}

          {/* Ações */}
          <div className="border-t border-white/10 px-6 py-7 sm:px-10">
            {!user && (
              <Link
                to="/login"
                className="mb-4 flex w-full items-center justify-center rounded-xl border border-orange-500/40 px-5 py-3 font-bold text-orange-400 transition hover:bg-orange-500/10"
              >
                Fazer login
              </Link>
            )}

            {user && orderId && !confirmed && !isPending && (
              <button
                type="button"
                onClick={() => void refetch()}
                disabled={isFetching}
                className="mb-4 w-full rounded-xl border border-orange-500/40 px-5 py-3 font-bold text-orange-400 transition hover:bg-orange-500/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isFetching
                  ? 'Consultando pedido...'
                  : 'Consultar novamente'}
              </button>
            )}

            <Link
              to="/"
              className="flex w-full items-center justify-center rounded-xl bg-orange-500 px-6 py-3.5 font-bold text-[#1b100b] transition hover:bg-orange-400"
            >
              Voltar ao catálogo →
            </Link>

            <p className="mt-4 text-center text-xs text-white/40">
              Obrigado por explorar o Kurio Marketplace.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}