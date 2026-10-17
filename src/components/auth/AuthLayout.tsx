
import { Link } from '@tanstack/react-router'
import { X } from 'lucide-react'
import type { ReactNode } from 'react'

type AuthLayoutProps = {
  mode: 'login' | 'register'
  children: ReactNode
}

const previewNfts = [
  {
    name: 'Emerald Ape',
    image: '/images/ape-green.png',
    price: '1.19 ETH',
  },
  {
    name: 'Sage Nomad',
    image: '/images/ape-suit.png',
    price: '1.69 ETH',
  },
  {
    name: 'Neon Vessel',
    image: '/images/ape-green.png',
    price: '1.99 ETH',
  },
  {
    name: 'Cosmic Bloom',
    image: '/images/ape-purple.png',
    price: '1.29 ETH',
  },
  {
    name: 'Golden Beat',
    image: '/images/ape-gold.png',
    price: '0.99 ETH',
  },
  {
    name: 'Ivory Baron',
    image: '/images/ape-suit.png',
    price: '1.79 ETH',
  },
]

export default function AuthLayout({
  mode,
  children,
}: AuthLayoutProps) {
  return (
    <main className="relative isolate min-h-[100dvh] bg-[#140e0c] text-[#f5eee7] md:min-h-[calc(100vh-76px)] md:overflow-hidden">
      {/* Fundo ilustrativo: somente desktop */}
      <div
        aria-hidden="true"
        className="pointer-events-none mx-auto hidden max-w-7xl px-4 py-10 opacity-45 md:block md:px-6 lg:px-8"
      >
        <div className="grid gap-8 lg:grid-cols-[245px_minmax(0,1fr)]">
          <div className="hidden bg-[#241713] p-5 lg:block">
            <p className="font-mono text-sm font-bold">
              Coleções
            </p>

            <div className="mt-7 space-y-5 font-mono text-xs text-[#d9914d]">
              <p>Arte digital</p>
              <p>Fotografia</p>
              <p>Música</p>
              <p>Arte 3D</p>
              <p>Colecionáveis</p>
              <p>Generativa</p>
              <p>Jogos</p>
              <p>Utilidade</p>
            </div>

            <div className="mt-12 border-t border-[#493025] pt-6">
              <p className="font-mono text-sm font-bold">
                Rede
              </p>

              <p className="mt-5 font-mono text-xs text-[#d9914d]">
                Ethereum
              </p>
            </div>
          </div>

          <div>
            <div className="mb-10 grid items-center gap-6 md:grid-cols-2">
              <div>
                <p className="font-mono text-xs tracking-[0.18em] text-[#d9914d]">
                  Bem-vindo à Kurio
                </p>

                <p className="mt-5 font-mono text-3xl font-extrabold uppercase leading-tight sm:text-4xl">
                  Seja dono do futuro da arte digital
                </p>

                <p className="mt-4 max-w-xs text-sm leading-7 text-[#b99674]">
                  Descubra NFTs selecionados de criadores
                  e explore a arte digital.
                </p>
              </div>

              <img
                src="/images/ape-green.png"
                alt=""
                className="hidden aspect-[4/3] w-full rounded-xl object-cover md:block"
              />
            </div>

            <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
              {previewNfts.map((nft) => (
                <div
                  key={nft.name}
                  className="min-w-0 bg-[#241713] p-3"
                >
                  <img
                    src={nft.image}
                    alt=""
                    className="aspect-square w-full rounded-lg object-cover"
                  />

                  <p className="mt-3 truncate font-mono text-xs">
                    {nft.name}
                  </p>

                  <p className="mt-1 font-mono text-xs font-bold text-[#e9a15c]">
                    {nft.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Camada escura: somente desktop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 hidden bg-[#0d0806]/65 md:block"
      />

      {/* Um único formulário, com layout responsivo */}
      <div className="relative z-20 flex min-h-[100dvh] items-start justify-center px-7 py-12 md:absolute md:inset-0 md:min-h-0 md:items-center md:overflow-y-auto md:px-4 md:py-12">
        <section
          aria-labelledby="auth-title"
          className="relative w-full max-w-[400px] md:max-w-[440px] md:border md:border-[#493025] md:bg-[#241713] md:shadow-[0_24px_100px_rgba(0,0,0,0.6)]"
        >
          {/* Logo mobile */}
          <Link
            to="/"
            aria-label="Kurio — voltar ao mercado"
            className="mx-auto mb-16 block w-fit font-mono text-3xl font-black tracking-[0.12em] text-[#f5eee7] md:hidden"
          >
            KURIO<span className="text-[#e9a15c]">.</span>
          </Link>

          {/* Fechar modal: desktop */}
          <Link
            to="/"
            aria-label="Fechar e voltar ao mercado"
            className="absolute right-4 top-4 hidden h-8 w-8 items-center justify-center text-[#d9914d] transition hover:text-[#f5eee7] md:flex"
          >
            <X size={18} />
          </Link>

          <div className="md:px-10 md:pb-8 md:pt-10">
            {/* Abas desktop */}
            <div className="hidden items-center justify-center gap-2 font-mono text-sm font-bold md:flex">
              <Link
                to="/login"
                aria-current={mode === 'login' ? 'page' : undefined}
                className={`transition ${
                  mode === 'login'
                    ? 'text-[#e9a15c]'
                    : 'text-[#f5eee7] hover:text-[#e9a15c]'
                }`}
              >
                Entrar
              </Link>

              <span className="text-[#806555]">|</span>

              <Link
                to="/register"
                aria-current={mode === 'register' ? 'page' : undefined}
                className={`transition ${
                  mode === 'register'
                    ? 'text-[#e9a15c]'
                    : 'text-[#f5eee7] hover:text-[#e9a15c]'
                }`}
              >
                Criar conta
              </Link>
            </div>

            {/* Título mobile / descrição desktop */}
            <h1
              id="auth-title"
              className="mb-9 text-center font-mono text-lg font-extrabold text-[#f5eee7] md:mx-auto md:mb-0 md:mt-8 md:max-w-xs md:text-xs md:font-normal md:leading-6 md:text-[#d1b39a]"
            >
              <span className="md:hidden">
                {mode === 'login'
                  ? 'Entrar'
                  : 'Criar perfil de colecionador'}
              </span>

              <span className="hidden md:inline">
                {mode === 'login'
                  ? 'Entre para gerenciar sua conta e continuar explorando o marketplace.'
                  : 'Crie seu perfil de colecionador e explore o universo Kurio.'}
              </span>
            </h1>

            {children}

            {/* Alternância mobile */}
            <p className="mt-10 text-center font-mono text-xs leading-6 text-[#c9a17c] md:hidden">
              {mode === 'login' ? (
                <>
                  Novo na Kurio?{' '}
                  <Link
                    to="/register"
                    className="font-semibold text-[#e9a15c] hover:underline"
                  >
                    Crie uma conta
                  </Link>
                </>
              ) : (
                <>
                  Já tem uma conta?{' '}
                  <Link
                    to="/login"
                    className="font-semibold text-[#e9a15c] hover:underline"
                  >
                    Entre
                  </Link>
                </>
              )}
            </p>
          </div>

          {/* Rodapé informativo: somente desktop */}
          <div className="hidden border-t border-[#493025] px-6 py-5 text-center md:block md:px-10">
            <p className="font-mono text-[11px] leading-5 text-[#96755f]">
              Autenticação demonstrativa.
              Nenhuma carteira real será conectada.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
