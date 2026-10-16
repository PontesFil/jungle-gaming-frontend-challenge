import { Link } from '@tanstack/react-router'
import { useCart } from '../../contexts/CartContext'

export default function Header() {

    const { items } = useCart()

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
  to="/"
  className="rounded border border-white/20 px-3 py-2 text-white"
>
  Carrinho ({items.length})
</Link>

        <button
          type="button"
          className="rounded bg-orange-400 px-4 py-2 font-bold text-black"
        >
          ENTRAR
        </button>
      </nav>
    </header>
  )
}