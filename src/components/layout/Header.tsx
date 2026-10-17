
import { Link, useNavigate } from '@tanstack/react-router'
import { useCart } from '../../contexts/CartContext'
import { useAuth } from '../../contexts/AuthContext'

export default function Header() {
  const { items } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate({ to: '/' })
  }

  return (
    <header className="border-b border-white/10 bg-[#140e0c] px-4 py-4 sm:px-6">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
        <Link
          to="/"
          className="text-xl font-extrabold tracking-widest text-white"
        >
          KURIO<span className="text-orange-400">.</span>
        </Link>

        <div className="order-3 flex w-full items-center justify-center gap-5 border-t border-white/10 pt-3 text-sm sm:order-none sm:w-auto sm:border-0 sm:pt-0">
          <Link
            to="/"
            className="font-semibold text-orange-400 transition hover:text-orange-300"
          >
            Mercado
          </Link>

          {user && (
            <Link
              to="/profile"
              className="font-semibold text-white/70 transition hover:text-orange-400"
            >
              Perfil
            </Link>
          )}

          {user && (
            <Link
              to="/wallet"
              className="font-semibold text-white/70 transition hover:text-orange-400"
            >
              Carteira
            </Link>
          )}

          <Link
            to="/cart"
            className="font-semibold text-white/70 transition hover:text-orange-400"
          >
            Carrinho ({items.length})
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                to="/profile"
                className="hidden max-w-32 truncate text-sm text-white/70 transition hover:text-orange-400 md:block"
              >
                Olá, {user.name}
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border border-orange-500/50 px-3 py-2 text-xs font-bold text-orange-400 transition hover:bg-orange-500/10 sm:px-4"
              >
                SAIR
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-[#1b100b] transition hover:bg-orange-400"
            >
              ENTRAR
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}
