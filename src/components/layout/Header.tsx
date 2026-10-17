
import { Link, useNavigate } from '@tanstack/react-router'
import {
  Heart,
  Home,
  ShoppingCart,
  UserRound,
} from 'lucide-react'

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

  const mobileLinkClass =
    'flex min-w-0 flex-1 flex-col items-center justify-center gap-1.5 py-2 text-[10px] font-medium text-[#b9a08d] transition hover:text-[#e9a15c]'

  return (
    <>
      <header className="relative z-30 border-b border-[#493025]/70 bg-[#140e0c]">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          <Link
            to="/"
            className="text-lg font-black tracking-[0.08em] text-[#f5f0e9]"
          >
            KURIO<span className="text-[#e9a15c]">.</span>
          </Link>

          {/* Navegação desktop */}
          <div className="hidden items-center gap-6 md:flex">
            <Link
              to="/"
              activeProps={{
                className:
                  'border-b border-[#e9a15c] pb-1 text-[#e9a15c]',
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
              className="hidden text-xs font-semibold text-[#d9c1ac] transition hover:text-[#e9a15c] md:block"
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
                  className="cursor-pointer rounded-md border border-[#d9914d] px-3 py-2 text-xs font-bold uppercase text-[#e9a15c] transition hover:bg-[#d9914d]/10 sm:px-4"
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

      {/* Navegação inferior exclusiva do mobile */}
      <nav
        aria-label="Navegação principal mobile"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-[#493025] bg-[#241713]/95 px-3 pb-[max(10px,env(safe-area-inset-bottom))] pt-2 shadow-[0_-10px_35px_rgba(0,0,0,0.25)] backdrop-blur-md md:hidden"
      >
        <div className="mx-auto flex max-w-md items-center justify-between">
          <Link
            to="/"
            className={mobileLinkClass}
            activeProps={{
              className: 'text-[#e9a15c]',
            }}
          >
            <Home size={20} strokeWidth={2} />
            <span>Mercado</span>
          </Link>

          <div
            aria-label="Favoritos indisponíveis nesta demonstração"
            title="Favoritos em breve"
            className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1.5 py-2 text-[10px] text-[#806555]"
          >
            <Heart size={20} strokeWidth={2} />
            <span>Favoritos</span>
          </div>

          <Link
            to="/cart"
            className={mobileLinkClass}
            activeProps={{
              className: 'text-[#e9a15c]',
            }}
          >
            <span className="relative">
              <ShoppingCart size={20} strokeWidth={2} />

              {items.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#d9914d] px-1 text-[9px] font-bold text-[#140e0c]">
                  {items.length}
                </span>
              )}
            </span>
            <span>Carrinho</span>
          </Link>

          <Link
            to={user ? '/profile' : '/login'}
            className={mobileLinkClass}
            activeProps={{
              className: 'text-[#e9a15c]',
            }}
          >
            <UserRound size={20} strokeWidth={2} />
            <span>{user ? 'Perfil' : 'Entrar'}</span>
          </Link>
        </div>
      </nav>
    </>
  )
}
