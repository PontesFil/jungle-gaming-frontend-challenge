import { Link, useSearch } from '@tanstack/react-router'

export default function ConfirmationPage() {
  const { orderId } = useSearch({ from: '/confirmation' })

  return (
    <main className="min-h-screen bg-[#140e0c] px-6 py-16 text-white">
      <section className="mx-auto max-w-xl rounded-xl border border-white/10 bg-[#211714] p-8 text-center">
        <h1 className="text-3xl font-bold text-orange-400">
          Compra confirmada!
        </h1>

        <p className="mt-4 text-white/70">
          Seu pedido foi processado com sucesso.
        </p>

        <p className="mt-6 break-all text-sm text-white/60">
          Pedido: {orderId}
        </p>

        <Link
          to="/"
          className="mt-8 inline-block rounded-lg bg-orange-500 px-6 py-3 font-bold text-black"
        >
          Voltar ao catálogo
        </Link>
      </section>
    </main>
  )
}