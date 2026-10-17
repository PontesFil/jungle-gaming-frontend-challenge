
import { Link } from '@tanstack/react-router'
import { useAuth } from '../../contexts/AuthContext'

export default function Footer() {
  const { user } = useAuth()

  return (
    <footer className="border-t border-[#493025] bg-[#1d120e] text-[#c6a17b]">
      {/* Rodapé compacto no mobile */}
      <div className="px-5 py-7 md:hidden">
        <div className="mx-auto max-w-md">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-mono text-base font-extrabold text-white">
                KURIO<span className="text-[#d9914d]">.</span>
              </h2>

              <p className="mt-2 max-w-xs text-xs leading-5 text-[#b99674]">
                Arte digital e colecionáveis em uma
                experiência demonstrativa.
              </p>
            </div>

            <Link
              to="/"
              hash="explorar"
              className="shrink-0 rounded-full border border-[#67412c] px-3 py-2 font-mono text-[10px] font-bold text-[#e9a15c] transition hover:bg-[#d9914d]/10"
            >
              Explorar NFTs
            </Link>
          </div>

          <div className="mt-6 border-t border-[#493025] pt-4">
            <p className="text-[11px] leading-5 text-[#96755f]">
              Checkout, autenticação e dados simulados.
              Nenhuma transação financeira ou blockchain real.
            </p>

            <p className="mt-3 font-mono text-[10px] text-[#806555]">
              © 2026 Kurio. Projeto demonstrativo.
              Projeto demonstrativo.
            </p>
          </div>
        </div>
      </div>

      {/* Rodapé completo no desktop */}
      <div className="hidden md:block">
        {/* Faixa superior */}
        <div className="border-b border-[#493025] bg-[#281914]">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
            <div>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#d9914d] font-mono text-lg font-black text-[#1a100d]">
                K
              </div>

              <h2 className="font-mono text-sm font-bold text-white">
                Marketplace Kurio
              </h2>

              <p className="mt-2 text-xs leading-relaxed">
                Uma experiência demonstrativa para explorar
                arte digital e colecionáveis.
              </p>
            </div>

            <div>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#d9914d] font-mono text-lg font-black text-[#1a100d]">
                C
              </div>

              <h2 className="font-mono text-sm font-bold text-white">
                Coleções selecionadas
              </h2>

              <p className="mt-2 text-xs leading-relaxed">
                Explore obras digitais de diferentes
                estilos e categorias.
              </p>
            </div>

            <div>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#d9914d] font-mono text-lg font-black text-[#1a100d]">
                S
              </div>

              <h2 className="font-mono text-sm font-bold text-white">
                Experiência segura
              </h2>

              <p className="mt-2 text-xs leading-relaxed">
                Checkout simulado, sem transações
                financeiras ou blockchain reais.
              </p>
            </div>

            <div>
              <h2 className="font-mono text-sm font-bold text-white">
                Descubra o Kurio
              </h2>

              <p className="mt-3 text-xs leading-relaxed">
                Encontre seu próximo NFT favorito
                no nosso catálogo.
              </p>

              <Link
                to="/"
                hash="explorar"
                className="mt-4 inline-flex rounded-md bg-[#d9914d] px-5 py-2.5 text-xs font-bold text-[#1a100d] transition hover:bg-[#efaa67]"
              >
                Explorar NFTs →
              </Link>
            </div>
          </div>
        </div>

        {/* Rodapé principal */}
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div>
            <h2 className="font-mono text-sm font-extrabold text-white">
              KURIO<span className="text-[#d9914d]">.</span>
            </h2>

            <p className="mt-4 max-w-xs text-xs leading-relaxed">
              Feito para quem ama arte digital,
              criatividade e novas formas de colecionar.
            </p>
          </div>

          <div>
            <h2 className="font-mono text-sm font-bold text-white">
              Minha conta
            </h2>

            <div className="mt-4 flex flex-col items-start gap-3 text-xs">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="hover:text-[#e9a15c]"
                  >
                    Meu perfil
                  </Link>

                  <Link
                    to="/wallet"
                    className="hover:text-[#e9a15c]"
                  >
                    Minha carteira
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="hover:text-[#e9a15c]"
                  >
                    Entrar
                  </Link>

                  <Link
                    to="/register"
                    className="hover:text-[#e9a15c]"
                  >
                    Criar conta
                  </Link>
                </>
              )}

              <Link
                to="/cart"
                className="hover:text-[#e9a15c]"
              >
                Meu carrinho
              </Link>
            </div>
          </div>

          <div>
            <h2 className="font-mono text-sm font-bold text-white">
              Coleções
            </h2>

            <div className="mt-4 flex flex-col items-start gap-3 text-xs">
              <Link
                to="/"
                hash="explorar"
                className="hover:text-[#e9a15c]"
              >
                Explorar NFTs
              </Link>

              <Link
                to="/nft/$nftId"
                params={{ nftId: '1' }}
                className="hover:text-[#e9a15c]"
              >
                NFT em destaque
              </Link>

              <Link
                to="/wallet"
                className="hover:text-[#e9a15c]"
              >
                Carteira demonstrativa
              </Link>
            </div>
          </div>

          <div>
            <h2 className="font-mono text-sm font-bold text-white">
              Sobre o projeto
            </h2>

            <p className="mt-4 text-xs leading-relaxed">
              Projeto frontend desenvolvido como
              desafio técnico, com autenticação,
              dados e compras simulados.
            </p>

            <p className="mt-4 text-xs text-[#e9a15c]">
              React · TypeScript · TanStack
            </p>
          </div>
        </div>

        <div className="border-t border-[#493025] px-4 py-5 text-center">
          <p className="font-mono text-[11px] text-[#96755f]">
            © 2026 Kurio. Projeto demonstrativo.
            Projeto demonstrativo.
          </p>
        </div>
      </div>
    </footer>
  )
}
