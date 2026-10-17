
import { Link } from '@tanstack/react-router'
import {
  ArrowRight,
  LockKeyhole,
  ShieldCheck,
  Wallet,
} from 'lucide-react'

import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import AccountSidebar from '../components/account/AccountSidebar'

const fieldClass =
  'flex min-h-11 w-full items-center rounded-xl border border-[#493025] bg-[#170f0c] px-4 py-3 font-mono text-xs text-[#9c806b] sm:text-sm md:min-h-12 md:rounded-sm'

const labelClass =
  'mb-2 block font-mono text-xs text-[#d9c6b6] md:mb-2.5'

export default function WalletPage() {
  const { user } = useAuth()
  const { items } = useCart()

  if (!user) {
    return (
      <main className="min-h-[70dvh] bg-[#140e0c] px-4 py-20 text-[#f5eee7]">
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#67412c] bg-[#281914] text-[#d9914d]">
            <LockKeyhole size={32} strokeWidth={1.5} />
          </div>

          <h1 className="mt-7 font-mono text-2xl font-extrabold">
            Acesse sua carteira
          </h1>

          <p className="mt-4 text-sm leading-7 text-[#b99674]">
            Entre na sua conta para visualizar o painel
            demonstrativo da carteira.
          </p>

          <Link
            to="/login"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#d9914d] px-7 py-3.5 font-mono text-xs font-extrabold text-[#1a100d] transition hover:bg-[#efaa67] md:rounded-md"
          >
            Fazer login
            <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-[#140e0c] pb-16 text-[#f5eee7] md:pb-24">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:py-8 lg:px-8">
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

          <span className="text-[#e9a15c]">
            Carteiras
          </span>
        </nav>

        <div className="grid items-start gap-7 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* Menu lateral exclusivo do desktop */}
          <div className="hidden lg:block">
            <AccountSidebar activePage="wallet" />
          </div>

          <div className="min-w-0">
            {/* Cabeçalho */}
            <header className="mb-7 border-b border-[#493025] pb-6 md:mb-9">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d9914d] md:text-xs">
                Painel demonstrativo
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <h1 className="font-mono text-2xl font-extrabold leading-tight sm:text-3xl">
                  Carteira principal
                </h1>

                <span className="inline-flex shrink-0 items-center rounded-full border border-[#67412c] bg-[#281914] px-3 py-1.5 font-mono text-[10px] text-[#c9925d] md:hidden">
                  Não conectada
                </span>
              </div>

              <p className="mt-3 text-xs leading-6 text-[#b99674] md:text-sm md:leading-7">
                Visualize como seria a configuração de uma
                carteira digital no Kurio.
              </p>
            </header>

            {/* Dados da carteira */}
            <section aria-labelledby="wallet-settings-heading">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3 md:mb-6">
                <h2
                  id="wallet-settings-heading"
                  className="font-mono text-base font-bold"
                >
                  Dados da carteira
                </h2>

                <span className="hidden rounded-full border border-[#67412c] px-3 py-1.5 font-mono text-[11px] text-[#c9925d] md:inline-flex">
                  Não conectada
                </span>
              </div>

              <div className="grid gap-x-7 gap-y-5 sm:grid-cols-2 md:gap-y-6">
                <div>
                  <p className={labelClass}>
                    Nome de exibição
                  </p>

                  <div className={`${fieldClass} break-words text-[#f5eee7]`}>
                    {user.name}
                  </div>
                </div>

                <div>
                  <p className={labelClass}>
                    Apelido da carteira
                  </p>

                  <div className={fieldClass}>
                    Não configurado
                  </div>
                </div>

                <div>
                  <p className={labelClass}>
                    Rede
                  </p>

                  <div className={fieldClass}>
                    Nenhuma rede conectada
                  </div>
                </div>

                <div>
                  <p className={labelClass}>
                    Nome do perfil
                  </p>

                  <div className={`${fieldClass} break-words text-[#f5eee7]`}>
                    {user.name}
                  </div>
                </div>

                <div>
                  <p className={labelClass}>
                    Endereço da carteira
                  </p>

                  <div className={fieldClass}>
                    Não disponível
                  </div>
                </div>

                <div>
                  <p className={labelClass}>
                    Carteira secundária / ENS
                  </p>

                  <div className={fieldClass}>
                    Não configurada
                  </div>
                </div>

                <div>
                  <p className={labelClass}>
                    Tipo de carteira
                  </p>

                  <div className={fieldClass}>
                    Nenhuma carteira conectada
                  </div>
                </div>

                <div>
                  <p className={labelClass}>
                    E-mail
                  </p>

                  <div className={`${fieldClass} break-all text-[#f5eee7]`}>
                    {user.email}
                  </div>
                </div>
              </div>
            </section>

            {/* Carteira secundária */}
            <section className="mt-8 border-t border-[#493025] pt-7 md:mt-10 md:pt-8">
              <h2 className="font-mono text-base font-bold">
                Carteira secundária
              </h2>

              <p className="mt-3 text-xs leading-6 text-[#b99674] md:text-sm md:leading-7">
                Você ainda não adicionou uma carteira secundária.
                O cadastro de carteiras não está disponível
                nesta demonstração.
              </p>
            </section>

            {/* Minha seleção */}
            <section className="mt-8 border-t border-[#493025] pt-7 md:mt-10 md:pt-8">
              <div className="flex items-center gap-3">
                <Wallet
                  size={21}
                  className="shrink-0 text-[#d9914d]"
                />

                <h2 className="font-mono text-base font-bold">
                  Minha seleção
                </h2>
              </div>

              <p className="mt-3 text-xs leading-6 text-[#b99674] md:text-sm md:leading-7">
                NFTs adicionados ao seu carrinho no marketplace.
              </p>

              <div className="mt-5 flex flex-col gap-5 rounded-2xl border border-[#493025] bg-[#241713] p-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:p-6 md:mt-6 md:rounded-none">
                <div className="min-w-0">
                  <p className="font-mono text-xs text-[#b99674]">
                    Itens no carrinho
                  </p>

                  <p className="mt-2 font-mono text-3xl font-extrabold text-[#e9a15c]">
                    {items.length}
                  </p>

                  <p className="mt-2 text-xs leading-6 text-[#b99674]">
                    {items.length === 0
                      ? 'Você ainda não selecionou nenhum NFT.'
                      : items.length === 1
                        ? 'Você tem 1 NFT aguardando no carrinho.'
                        : `Você tem ${items.length} NFTs aguardando no carrinho.`}
                  </p>
                </div>

                <Link
                  to="/cart"
                  className="inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-full bg-[#d9914d] px-6 py-3.5 font-mono text-xs font-extrabold text-[#1a100d] transition hover:bg-[#efaa67] sm:self-auto md:rounded-md"
                >
                  Ver meu carrinho
                  <ArrowRight size={16} />
                </Link>
              </div>
            </section>

            {/* Aviso sobre a demonstração */}
            <div className="mt-8 flex items-start gap-3 rounded-xl border border-[#493025] bg-[#241713] px-4 py-4 md:mt-9 md:rounded-none md:border-0 md:border-l-2 md:border-l-[#d9914d] md:px-5">
              <ShieldCheck
                size={20}
                className="mt-0.5 shrink-0 text-[#d9914d]"
              />

              <div>
                <p className="font-mono text-xs font-bold">
                  Sobre esta carteira
                </p>

                <p className="mt-2 text-xs leading-6 text-[#b99674]">
                  Esta interface é demonstrativa. Não há
                  conexão com MetaMask, WalletConnect ou
                  contratos inteligentes. Nenhum saldo,
                  endereço ou ativo blockchain real é consultado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
