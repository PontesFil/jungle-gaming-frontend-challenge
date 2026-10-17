
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

  const navLinkClass =
    'text-xs font-semibold tracking-wide text-[#b9a08d] transition hover:text-[#e9a15c]'

  return (
    <header className="relative z-20 border-b border-[#493025]/70 bg-[#140e0c]">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="text-lg font-black tracking-[0.08em] text-[#f5f0e9]"
        >
          KURIO<span className="text-[#e9a15c]">.</span>
        </Link>

        <div className="order-3 flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-white/5 pt-3 sm:order-none sm:w-auto sm:border-0 sm:pt-0">
          <Link
            to="/"
            activeProps={{
              className:
                'text-[#e9a15c] border-b border-[#e9a15c] pb-1',
            }}
            className={navLinkClass}
          >
            Mercado
          </Link>

          {user && (
            <>
              <Link
                to="/profile"
                className={navLinkClass}
                activeProps={{
                  className: 'text-[#e9a15c]',
                }}
              >
                Perfil
              </Link>

              <Link
                to="/wallet"
                className={navLinkClass}
                activeProps={{
                  className: 'text-[#e9a15c]',
                }}
              >
                Carteira
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            to="/cart"
            className="text-xs font-semibold text-[#d9c1ac] transition hover:text-[#e9a15c]"
          >
            Carrinho ({items.length})
          </Link>

          {user ? (
            <>
              <Link
                to="/profile"
                className="hidden max-w-28 truncate text-xs text-[#b9a08d] hover:text-[#e9a15c] lg:block"
              >
                {user.name}
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md border border-[#d9914d] px-4 py-2 text-xs font-bold uppercase text-[#e9a15c] transition hover:bg-[#d9914d]/10"
              >
                Sair
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-md bg-[#d9914d] px-4 py-2 text-xs font-extrabold text-[#1a100d] transition hover:bg-[#efaa67]"
            >
              Entrar
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}
