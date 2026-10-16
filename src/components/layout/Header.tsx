import { Link } from '@tanstack/react-router'
import { useCart } from '../../contexts/CartContext'
import { useAuth } from '../../contexts/AuthContext'

export default function Header() {

    const { items } = useCart()
    
    const { user, logout } = useAuth()

  return (
    <header className="border-b border-white/10 bg-[#140e0c] px-6 py-4">
      <nav className="mx-auto flex max-w-6xl items-center justify-between">
        <Link
          to="/"
          className="font-bold tracking-widest text-white"
        >
          KURIO
        </Link>

        <span className="font-bold tracking-widest text-orange-400">
          Mercado
        </span>

        <Link
          to="/cart"
          className="rounded border border-white/20 px-3 py-2 text-white"
        >
          Carrinho ({items.length})
        </Link>

        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-white">
              Olá, {user.name}
            </span>

            <button
              type="button"
              onClick={logout}
              className="rounded border border-orange-400 px-4 py-2 text-orange-400"
            >
              SAIR
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="rounded bg-orange-400 px-4 py-2 font-bold text-black"
          >
            ENTRAR
          </Link>
        )}
      </nav>
    </header>
  )
}