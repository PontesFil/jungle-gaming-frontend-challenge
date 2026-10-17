
import { Link, useNavigate } from '@tanstack/react-router'
import { useAuth } from '../contexts/AuthContext'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  if (!user) {
    return (
      <main className="min-h-screen bg-[#140e0c] px-4 py-16 text-white">
        <div className="mx-auto max-w-xl rounded-2xl border border-[#493025] bg-[#211713] p-8 text-center">
          <h1 className="text-2xl font-extrabold">
            Acesse seu perfil
          </h1>

          <p className="mt-4 text-sm text-white/60">
            Entre na sua conta para visualizar suas informações.
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

  const initials = user.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')

  function handleLogout() {
    logout()
    navigate({ to: '/' })
  }

  return (
    <main className="min-h-screen bg-[#140e0c] text-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <nav
          aria-label="Navegação"
          className="mb-8 text-sm text-white/50"
        >
          <Link to="/" className="hover:text-orange-400">
            Mercado
          </Link>
          <span className="mx-3">/</span>
          <span className="text-orange-400">Meu perfil</span>
        </nav>

        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
            Minha conta
          </p>

          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
            Meu perfil
          </h1>

          <p className="mt-3 text-sm text-white/50">
            Consulte suas informações e gerencie sua sessão.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-[#493025] bg-[#211713] p-6 text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/10 text-3xl font-extrabold text-orange-400">
              {initials || '?'}
            </div>

            <h2 className="mt-5 break-words text-xl font-bold">
              {user.name}
            </h2>

            <p className="mt-2 break-all text-sm text-white/50">
              {user.email}
            </p>

            <span className="mt-5 inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-400">
              Sessão ativa
            </span>
          </aside>

          <div className="space-y-6">
            <section className="rounded-2xl border border-[#493025] bg-[#211713] p-6">
              <h2 className="text-xl font-extrabold">
                Informações da conta
              </h2>

              <p className="mt-2 text-sm text-white/50">
                Dados disponíveis na sua sessão demonstrativa.
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-xs text-white/40">
                    Nome de exibição
                  </p>
                  <p className="mt-2 break-words font-semibold">
                    {user.name}
                  </p>
                </div>

                <div className="border-t border-white/10 pt-5">
                  <p className="text-xs text-white/40">
                    E-mail
                  </p>
                  <p className="mt-2 break-all font-semibold">
                    {user.email}
                  </p>
                </div>

                <div className="border-t border-white/10 pt-5">
                  <p className="text-xs text-white/40">
                    Tipo de conta
                  </p>
                  <p className="mt-2 font-semibold">
                    Conta demonstrativa
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-[#493025] bg-[#211713] p-6">
              <h2 className="text-xl font-extrabold">
                Acesso rápido
              </h2>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  to="/cart"
                  className="rounded-xl border border-orange-500/40 px-5 py-3 text-sm font-semibold text-orange-400 transition hover:bg-orange-500/10"
                >
                  Ver meu carrinho →
                </Link>

                <Link
                  to="/"
                  className="rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                >
                  Explorar NFTs →
                </Link>
              </div>
            </section>

            <section className="rounded-2xl border border-red-400/20 bg-[#211713] p-6">
              <h2 className="text-xl font-extrabold">
                Sessão
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-white/50">
                Ao sair, sua sessão local será encerrada.
              </p>

              <button
                type="button"
                onClick={handleLogout}
                className="mt-5 rounded-xl border border-red-400/40 px-5 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-400/10"
              >
                Sair da conta
              </button>
            </section>
          </div>
        </div>

        <p className="mt-8 text-xs leading-relaxed text-white/40">
          O Kurio utiliza autenticação simulada para fins de demonstração.
          Os dados da sessão são armazenados localmente no navegador.
        </p>
      </div>
    </main>
  )
}
