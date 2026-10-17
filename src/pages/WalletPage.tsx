
import { Link } from '@tanstack/react-router'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'

export default function WalletPage() {
  const { user } = useAuth()
  const { items } = useCart()

  if (!user) {
    return (
      <main className="min-h-screen bg-[#140e0c] px-4 py-16 text-white">
        <div className="mx-auto max-w-xl rounded-2xl border border-[#493025] bg-[#211713] p-8 text-center">
          <h1 className="text-2xl font-extrabold">
            Acesse sua carteira
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Entre na sua conta para visualizar o painel
            demonstrativo da carteira.
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

  return (
    <main className="min-h-screen bg-[#140e0c] text-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
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
            Minha carteira
          </span>
        </nav>

        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
            Painel demonstrativo
          </p>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Minha carteira
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/50">
            Acompanhe as informações da sua conta e explore
            a experiência de um marketplace de NFTs.
          </p>
        </div>

        {/* Visão geral */}
        <div className="grid gap-5 md:grid-cols-3">
          <section className="rounded-2xl border border-[#67412c] bg-[#281b15] p-6 md:col-span-2">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-orange-400">
                  Carteira digital
                </p>

                <h2 className="mt-3 text-xl font-extrabold">
                  Visão geral
                </h2>
              </div>

              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/60">
                Não conectada
              </span>
            </div>

            <div className="mt-8">
              <p className="text-sm text-white/50">
                Saldo disponível
              </p>

              <p className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                — <span className="text-xl text-orange-400">ETH</span>
              </p>

              <p className="mt-3 text-xs leading-relaxed text-white/40">
                Nenhum saldo real é consultado nesta demonstração.
              </p>
            </div>

            <div className="mt-8 border-t border-white/10 pt-5">
              <p className="text-xs text-white/40">
                Conta associada
              </p>

              <p className="mt-2 break-all text-sm font-semibold">
                {user.email}
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-[#493025] bg-[#211713] p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-400">
              Rede de referência
            </p>

            <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-2xl font-bold text-orange-400">
              Ξ
            </div>

            <h2 className="mt-5 text-xl font-extrabold">
              Ethereum
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-white/50">
              Rede apresentada como referência visual.
              Nenhuma conexão blockchain está ativa.
            </p>

            <span className="mt-5 inline-block rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/60">
              Ambiente simulado
            </span>
          </section>
        </div>

        {/* Ativos e carrinho */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-[#493025] bg-[#211713] p-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-extrabold">
                Meus NFTs
              </h2>

              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50">
                Não disponível
              </span>
            </div>

            <div className="mt-7 rounded-xl border border-dashed border-white/15 bg-[#140e0c] px-5 py-10 text-center">
              <div
                aria-hidden="true"
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-500/10 text-2xl text-orange-400"
              >
                ◇
              </div>

              <h3 className="mt-5 font-bold">
                Nenhum ativo blockchain conectado
              </h3>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-white/50">
                As compras realizadas no Kurio são simuladas
                e não transferem NFTs reais para uma carteira.
              </p>

              <Link
                to="/"
                className="mt-6 inline-flex rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-[#1b100b] transition hover:bg-orange-400"
              >
                Explorar NFTs →
              </Link>
            </div>
          </section>

          <section className="rounded-2xl border border-[#493025] bg-[#211713] p-6">
            <h2 className="text-xl font-extrabold">
              Minha seleção
            </h2>

            <p className="mt-2 text-sm text-white/50">
              NFTs adicionados ao seu carrinho.
            </p>

            <div className="mt-7 rounded-xl border border-[#493025] bg-[#140e0c] p-5">
              <p className="text-xs text-white/40">
                Itens no carrinho
              </p>

              <p className="mt-3 text-4xl font-extrabold text-orange-400">
                {items.length}
              </p>

              <p className="mt-3 text-sm text-white/50">
                {items.length === 0
                  ? 'Você ainda não selecionou nenhum NFT.'
                  : items.length === 1
                    ? 'Você tem 1 NFT aguardando no carrinho.'
                    : `Você tem ${items.length} NFTs aguardando no carrinho.`}
              </p>
            </div>

            <Link
              to="/cart"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-orange-500/40 px-5 py-3 font-bold text-orange-400 transition hover:bg-orange-500/10"
            >
              Ver meu carrinho →
            </Link>
          </section>
        </div>

        {/* Transparência */}
        <section className="mt-6 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-6">
          <h2 className="font-extrabold text-orange-400">
            Sobre esta carteira
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/60">
            Esta página demonstra a interface de uma carteira
            digital integrada a um marketplace de NFTs.
            Não há conexão com MetaMask, WalletConnect ou
            contratos inteligentes. Saldos, transferências
            e propriedade de ativos não são consultados
            em uma blockchain.
          </p>
        </section>
      </div>
    </main>
  )
}
