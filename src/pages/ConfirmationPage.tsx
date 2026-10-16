
import { Link, useSearch } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'
import { getOrder } from '../services/checkoutService'

export default function ConfirmationPage() {
  const { orderId } = useSearch({ from: '/confirmation' })
  const { user } = useAuth()

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['order', user?.email, orderId],
    queryFn: () => getOrder(orderId),
    enabled: Boolean(user && orderId),
    retry: false,
  })

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

    message = axios.isAxiosError(error) && error.response?.status === 404
      ? 'Pedido não encontrado para esta conta.'
      : 'Não foi possível verificar o pedido. Tente novamente.'
  } else if (data?.status === 'confirmed') {
    title = 'Compra confirmada!'
    message = 'Seu pedido foi confirmado pela API.'
  }

  const confirmed = data?.status === 'confirmed' && !isError

  return (
    <main className="min-h-screen bg-[#140e0c] px-6 py-16 text-white">
      <section className="mx-auto max-w-xl rounded-xl border border-white/10 bg-[#211714] p-8 text-center">
        <h1
          className={`text-3xl font-bold ${
            confirmed ? 'text-orange-400' : 'text-white'
          }`}
        >
          {title}
        </h1>

        <p className="mt-4 text-white/70">
          {message}
        </p>

        {confirmed && data && (
          <div className="mt-6 space-y-3 text-left text-sm text-white/70">
            <p className="break-all">
              <strong>Pedido:</strong> {data.orderId}
            </p>

            <p>
              <strong>Status:</strong> Confirmado
            </p>

            <p>
              <strong>Itens:</strong> {data.nftIds.length}
            </p>

            <p>
              <strong>Data:</strong>{' '}
              {new Date(data.createdAt).toLocaleString('pt-BR')}
            </p>
          </div>
        )}

        {!user && (
          <Link
            to="/login"
            className="mt-6 inline-block text-orange-400 hover:underline"
          >
            Fazer login
          </Link>
        )}

        <div>
          <Link
            to="/"
            className="mt-8 inline-block rounded-lg bg-orange-500 px-6 py-3 font-bold text-black"
          >
            Voltar ao catálogo
          </Link>
        </div>
      </section>
    </main>
  )
}
