
import { Link, useNavigate } from '@tanstack/react-router'
import {
  UserRound,
  Wallet,
  ShoppingBag,
  Heart,
  Tag,
  Download,
  CircleHelp,
  LogOut,
} from 'lucide-react'

import { useAuth } from '../../contexts/AuthContext'

type AccountSidebarProps = {
  activePage: 'profile' | 'wallet'
}

export default function AccountSidebar({
  activePage,
}: AccountSidebarProps) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate({ to: '/' })
  }

  const linkBase =
    'flex min-h-11 items-center gap-3 border-l-[3px] px-4 py-3 font-mono text-xs transition-colors'

  const activeClass =
    'border-[#d9914d] bg-[#39251d] font-bold text-[#e9a15c]'

  const inactiveClass =
    'border-transparent text-[#c9925d] hover:bg-[#39251d]/60 hover:text-[#f1b47b]'

  return (
    <aside
      aria-label="Menu da conta"
      className="bg-[#241713] lg:sticky lg:top-24"
    >
      <h2 className="px-5 pb-4 pt-5 font-mono text-base font-extrabold text-[#f5eee7]">
        Meu perfil
      </h2>

      <nav aria-label="Navegação da conta">
        <Link
          to="/profile"
          aria-current={activePage === 'profile' ? 'page' : undefined}
          className={`${linkBase} ${
            activePage === 'profile' ? activeClass : inactiveClass
          }`}
        >
          <UserRound size={17} />
          Dados do perfil
        </Link>

        <Link
          to="/wallet"
          aria-current={activePage === 'wallet' ? 'page' : undefined}
          className={`${linkBase} ${
            activePage === 'wallet' ? activeClass : inactiveClass
          }`}
        >
          <Wallet size={17} />
          Carteiras
        </Link>

        <Link
          to="/cart"
          className={`${linkBase} ${inactiveClass}`}
        >
          <ShoppingBag size={17} />
          Minha seleção
        </Link>

        {/* Recursos não implementados na demonstração */}
        <div className="border-t border-[#493025]/70 py-2">
          <p className="px-5 py-2 font-mono text-[10px] uppercase tracking-wider text-[#806555]">
            Outros recursos
          </p>

          {[
            { label: 'Lista de interesse', Icon: Heart },
            { label: 'Ofertas', Icon: Tag },
            { label: 'Arquivos baixados', Icon: Download },
            { label: 'Suporte', Icon: CircleHelp },
          ].map(({ label, Icon }) => (
            <div
              key={label}
              className="flex min-h-10 items-center gap-3 px-5 py-2 font-mono text-xs text-[#806555]"
              title="Recurso não disponível nesta demonstração"
            >
              <Icon size={16} />
              <span>{label}</span>
              <span className="ml-auto text-[10px]">—</span>
            </div>
          ))}
        </div>

        <div className="border-t border-[#493025]">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full cursor-pointer items-center gap-3 px-5 py-4 text-left font-mono text-xs font-bold text-[#e9a15c] transition hover:bg-[#39251d]"
          >
            <LogOut size={17} />
            Sair
          </button>
        </div>
      </nav>
    </aside>
  )
}
