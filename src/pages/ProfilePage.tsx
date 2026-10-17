
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
  'flex min-h-12 w-full items-center rounded-sm border border-[#493025] bg-[#170f0c] px-4 py-3 font-mono text-sm text-[#f5eee7]'

const labelClass =
  'mb-2.5 block font-mono text-xs text-[#d9c6b6]'

export default function ProfilePage() {
  const { user } = useAuth()

  if (!user) {
    return (
      <main className="bg-[#140e0c] px-4 py-20 text-[#f5eee7]">
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
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#d9914d] px-7 py-3.5 font-mono text-xs font-extrabold text-[#1a100d] transition hover:bg-[#efaa67]"
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
            Meu perfil
          </span>
        </nav>

        {/* Layout semelhante ao Figma */}
        <div className="grid items-start gap-7 lg:grid-cols-[280px_minmax(0,1fr)]">
          <AccountSidebar activePage="profile" />

          <div className="min-w-0">
            <div className="mb-9 border-b border-[#493025] pb-6">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#d9914d]">
                Minha conta
              </p>

              <h1 className="mt-3 font-mono text-2xl font-extrabold sm:text-3xl">
                Perfil do colecionador
              </h1>

              <p className="mt-3 text-sm leading-6 text-[#b99674]">
                Visualize as informações da sua conta demonstrativa.
              </p>
            </div>

            {/* Dados da conta */}
            <section aria-labelledby="profile-data-heading">
              <h2
                id="profile-data-heading"
                className="font-mono text-base font-bold"
              >
                Dados do perfil
              </h2>

              <div className="mt-6 grid gap-x-7 gap-y-6 sm:grid-cols-2">
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

            {/* Avatar */}
            <section className="mt-10 border-t border-[#493025] pt-8">
              <h2 className="font-mono text-base font-bold">
                Avatar
              </h2>

              <div className="mt-5 flex flex-wrap items-center gap-5">
                <div
                  aria-label={`Avatar de ${user.name}`}
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-[#754323] bg-[#392117] font-mono text-2xl font-extrabold text-[#e9a15c]"
                >
                  {initials || (
                    <CircleUserRound size={30} />
                  )}
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
            <section className="mt-10 border-t border-[#493025] pt-8">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={21}
                  className="mt-0.5 shrink-0 text-[#d9914d]"
                />

                <div>
                  <h2 className="font-mono text-base font-bold">
                    Segurança da conta
                  </h2>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[#b99674]">
                    O Kurio utiliza autenticação simulada. Não
                    há gerenciamento de senha real nem alteração
                    de credenciais nesta demonstração.
                  </p>
                </div>
              </div>
            </section>

            {/* Ações úteis */}
            <div className="mt-10 flex flex-wrap gap-3 border-t border-[#493025] pt-8">
              <Link
                to="/wallet"
                className="inline-flex items-center gap-2 rounded-md bg-[#d9914d] px-6 py-3.5 font-mono text-xs font-extrabold text-[#1a100d] transition hover:bg-[#efaa67]"
              >
                Ver minhas carteiras
                <ArrowRight size={15} />
              </Link>

              <Link
                to="/cart"
                className="inline-flex items-center gap-2 rounded-md border border-[#67412c] px-6 py-3.5 font-mono text-xs font-bold text-[#e9a15c] transition hover:bg-[#d9914d]/10"
              >
                Ver meu carrinho
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-12 border-t border-[#493025] pt-5 text-xs leading-6 text-[#96755f]">
          As informações exibidas são provenientes da sessão
          demonstrativa. Nenhuma conta blockchain ou identidade
          ENS real está vinculada ao perfil.
        </p>
      </div>
    </main>
  )
}
