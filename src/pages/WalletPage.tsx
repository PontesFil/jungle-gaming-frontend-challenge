
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
  'flex min-h-12 w-full items-center rounded-sm border border-[#493025] bg-[#170f0c] px-4 py-3 font-mono text-sm text-[#9c806b]'

const labelClass =
  'mb-2.5 block font-mono text-xs text-[#d9c6b6]'

export default function WalletPage() {
  const { user } = useAuth()
  const { items } = useCart()

  if (!user) {
    return (
      <main className="bg-[#140e0c] px-4 py-20 text-[#f5eee7]">
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
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#d9914d] px-7 py-3.5 font-mono text-xs font-extrabold text-[#1a100d] transition hover:bg-[#efaa67]"
          >
            Fazer login
            <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-[#140e0c] pb-24 text-[#f5eee7]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
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
            Carteiras
          </span>
        </nav>

        <div className="grid items-start gap-7 lg:grid-cols-[280px_minmax(0,1fr)]">
          <AccountSidebar activePage="wallet" />

          <div className="min-w-0">
            {/* Cabeçalho */}
            <div className="mb-9 border-b border-[#493025] pb-6">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#d9914d]">
                Painel demonstrativo
              </p>

              <h1 className="mt-3 font-mono text-2xl font-extrabold sm:text-3xl">
                Carteira principal
              </h1>

              <p className="mt-3 text-sm leading-7 text-[#b99674]">
                Visualize como seria a configuração de uma
                carteira digital no Kurio.
              </p>
            </div>

            {/* Configuração */}
            <section aria-labelledby="wallet-settings-heading">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <h2
                  id="wallet-settings-heading"
                  className="font-mono text-base font-bold"
                >
                  Dados da carteira
                </h2>

                <span className="rounded-full border border-[#67412c] px-3 py-1.5 font-mono text-[11px] text-[#c9925d]">
                  Não conectada
                </span>
              </div>

              <div className="grid gap-x-7 gap-y-6 sm:grid-cols-2">
                <div>
                  <p className={labelClass}>
                    Nome de exibição
                  </p>

                  <div className={`${fieldClass} text-[#f5eee7]`}>
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

                  <div className={`${fieldClass} text-[#f5eee7]`}>
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
            <section className="mt-10 border-t border-[#493025] pt-8">
              <h2 className="font-mono text-base font-bold">
                Carteira secundária
              </h2>

              <p className="mt-3 text-sm leading-7 text-[#b99674]">
                Você ainda não adicionou uma carteira secundária.
                O cadastro de carteiras não está disponível
                nesta demonstração.
              </p>
            </section>

            {/* Status e seleção */}
            <section className="mt-10 border-t border-[#493025] pt-8">
              <div className="flex items-center gap-3">
                <Wallet
                  size={21}
                  className="text-[#d9914d]"
                />

                <h2 className="font-mono text-base font-bold">
                  Minha seleção
                </h2>
              </div>

              <p className="mt-3 text-sm leading-7 text-[#b99674]">
                NFTs adicionados ao seu carrinho no marketplace.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-5 border border-[#493025] bg-[#241713] p-5 sm:p-6">
                <div>
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
                  className="inline-flex items-center gap-2 rounded-md bg-[#d9914d] px-5 py-3.5 font-mono text-xs font-extrabold text-[#1a100d] transition hover:bg-[#efaa67]"
                >
                  Ver meu carrinho
                  <ArrowRight size={16} />
                </Link>
              </div>
            </section>

            {/* Aviso */}
            <div className="mt-9 flex items-start gap-3 border-l-2 border-[#d9914d] bg-[#241713] px-5 py-4">
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
