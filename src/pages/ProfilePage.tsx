
import { Link } from '@tanstack/react-router'
import {
  ArrowRight,
  CircleUserRound,
  LockKeyhole,
  ShieldCheck,
} from 'lucide-react'

import { useAuth } from '../contexts/AuthContext'
import AccountSidebar from '../components/account/AccountSidebar'

const fieldClass =
  'flex min-h-11 w-full items-center rounded-xl border border-[#493025] bg-[#170f0c] px-4 py-3 font-mono text-xs text-[#f5eee7] sm:text-sm md:min-h-12 md:rounded-sm'

const labelClass =
  'mb-2 block font-mono text-xs text-[#d9c6b6] md:mb-2.5'

export default function ProfilePage() {
  const { user } = useAuth()

  if (!user) {
    return (
      <main className="min-h-[70dvh] bg-[#140e0c] px-4 py-20 text-[#f5eee7]">
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#67412c] bg-[#281914] text-[#d9914d]">
            <LockKeyhole size={32} strokeWidth={1.5} />
          </div>

          <h1 className="mt-7 font-mono text-2xl font-extrabold">
            Acesse seu perfil
          </h1>

          <p className="mt-4 text-sm leading-7 text-[#b99674]">
            Entre na sua conta para visualizar suas informações.
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

  const initials = user.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')

  return (
    <main className="bg-[#140e0c] pb-16 text-[#f5eee7] md:pb-24">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:py-8 lg:px-8">
        {/* Breadcrumb apenas no desktop */}
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
            Meu perfil
          </span>
        </nav>

        <div className="grid items-start gap-7 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* Menu lateral preservado no desktop */}
          <div className="hidden lg:block">
            <AccountSidebar activePage="profile" />
          </div>

          <div className="min-w-0">
            {/* Cabeçalho */}
            <header className="mb-7 border-b border-[#493025] pb-6 md:mb-9">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d9914d] md:text-xs">
                Minha conta
              </p>

              <h1 className="mt-3 font-mono text-2xl font-extrabold leading-tight sm:text-3xl">
                Perfil do colecionador
              </h1>

              <p className="mt-3 text-xs leading-6 text-[#b99674] md:text-sm">
                Visualize as informações da sua conta demonstrativa.
              </p>
            </header>

            {/* Resumo do perfil no mobile */}
            <section
              aria-label="Resumo da conta"
              className="mb-8 flex items-center gap-4 rounded-2xl border border-[#493025] bg-[#241713] p-4 md:hidden"
            >
              <div
                aria-label={`Avatar de ${user.name}`}
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#754323] bg-[#392117] font-mono text-xl font-extrabold text-[#e9a15c]"
              >
                {initials || <CircleUserRound size={26} />}
              </div>

              <div className="min-w-0">
                <p className="break-words font-mono text-sm font-bold">
                  {user.name}
                </p>

                <p className="mt-1 break-all text-xs text-[#b99674]">
                  {user.email}
                </p>

                <span className="mt-2 inline-block rounded-full border border-[#67412c] px-3 py-1 font-mono text-[10px] text-[#e9a15c]">
                  Conta demonstrativa
                </span>
              </div>
            </section>

            {/* Dados da conta */}
            <section aria-labelledby="profile-data-heading">
              <h2
                id="profile-data-heading"
                className="font-mono text-base font-bold"
              >
                Dados do perfil
              </h2>

              <div className="mt-5 grid gap-x-7 gap-y-5 sm:grid-cols-2 md:mt-6 md:gap-y-6">
                <div>
                  <p className={labelClass}>
                    Nome de exibição
                  </p>

                  <div className={fieldClass}>
                    <span className="min-w-0 break-words">
                      {user.name}
                    </span>
                  </div>
                </div>

                <div>
                  <p className={labelClass}>
                    Nome de usuário
                  </p>

                  <div className={fieldClass}>
                    <span className="text-[#9c806b]">
                      Não configurado
                    </span>
                  </div>
                </div>

                <div>
                  <p className={labelClass}>
                    E-mail
                  </p>

                  <div className={fieldClass}>
                    <span className="min-w-0 break-all">
                      {user.email}
                    </span>
                  </div>
                </div>

                <div>
                  <p className={labelClass}>
                    Nome ENS
                  </p>

                  <div className={fieldClass}>
                    <span className="text-[#9c806b]">
                      Não vinculado
                    </span>
                  </div>
                </div>

                <div>
                  <p className={labelClass}>
                    Carteira associada
                  </p>

                  <div className={fieldClass}>
                    <span className="text-[#9c806b]">
                      Nenhuma carteira conectada
                    </span>
                  </div>
                </div>

                <div>
                  <p className={labelClass}>
                    Tipo de conta
                  </p>

                  <div className={fieldClass}>
                    Conta demonstrativa
                  </div>
                </div>
              </div>
            </section>

            {/* Avatar detalhado apenas no desktop */}
            <section className="mt-10 hidden border-t border-[#493025] pt-8 md:block">
              <h2 className="font-mono text-base font-bold">
                Avatar
              </h2>

              <div className="mt-5 flex flex-wrap items-center gap-5">
                <div
                  aria-label={`Avatar de ${user.name}`}
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-[#754323] bg-[#392117] font-mono text-2xl font-extrabold text-[#e9a15c]"
                >
                  {initials || <CircleUserRound size={30} />}
                </div>

                <div>
                  <p className="font-mono text-sm font-bold">
                    {user.name}
                  </p>

                  <p className="mt-2 text-xs leading-6 text-[#b99674]">
                    Avatar gerado a partir do nome da conta.
                    A edição de imagem não está disponível.
                  </p>
                </div>
              </div>
            </section>

            {/* Segurança */}
            <section className="mt-8 border-t border-[#493025] pt-7 md:mt-10 md:pt-8">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={21}
                  className="mt-0.5 shrink-0 text-[#d9914d]"
                />

                <div>
                  <h2 className="font-mono text-base font-bold">
                    Segurança da conta
                  </h2>

                  <p className="mt-3 max-w-2xl text-xs leading-6 text-[#b99674] md:text-sm md:leading-7">
                    O Kurio utiliza autenticação simulada.
                    Não há gerenciamento de senha real nem
                    alteração de credenciais nesta demonstração.
                  </p>
                </div>
              </div>
            </section>

            {/* Ações úteis */}
            <div className="mt-8 grid gap-3 border-t border-[#493025] pt-7 sm:flex sm:flex-wrap md:mt-10 md:pt-8">
              <Link
                to="/wallet"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#d9914d] px-6 py-3.5 font-mono text-xs font-extrabold text-[#1a100d] transition hover:bg-[#efaa67] md:rounded-md"
              >
                Ver minhas carteiras
                <ArrowRight size={15} />
              </Link>

              <Link
                to="/cart"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#67412c] px-6 py-3.5 font-mono text-xs font-bold text-[#e9a15c] transition hover:bg-[#d9914d]/10 md:rounded-md"
              >
                Ver meu carrinho
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-[#493025] pt-5 text-[11px] leading-6 text-[#96755f] md:mt-12 md:text-xs">
          As informações exibidas são provenientes da sessão
          demonstrativa. Nenhuma conta blockchain ou identidade
          ENS real está vinculada ao perfil.
        </p>
      </div>
    </main>
  )
}
