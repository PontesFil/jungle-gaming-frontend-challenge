
import { Link } from '@tanstack/react-router'

const articles = [
  {
    title: 'Como funciona a propriedade de NFTs',
    description:
      'Entenda o conceito de propriedade digital e o papel dos registros em blockchain.',
    image: '/images/ape-suit.png',
    category: 'Guia para colecionadores',
  },
  {
    title: 'Criadores e a nova arte digital',
    description:
      'Conheça algumas das possibilidades criativas que surgem com os colecionáveis digitais.',
    image: '/images/ape-green.png',
    category: 'Arte e cultura',
  },
  {
    title: 'Raridade, atributos e procedência',
    description:
      'Descubra os conceitos que ajudam colecionadores a conhecer melhor uma obra digital.',
    image: '/images/ape-purple.png',
    category: 'Conhecimento',
  },
  {
    title: 'Cuidados com sua carteira digital',
    description:
      'Aprenda por que segurança e atenção são essenciais no universo dos NFTs.',
    image: '/images/ape-gold.png',
    category: 'Segurança',
  },
]

export default function HomeExtras() {
  return (
    <div className="mt-16 space-y-16 sm:mt-24 sm:space-y-24">
      {/* Banners promocionais */}
      <section
        aria-label="Coleções em destaque"
        className="grid gap-4 sm:gap-5 lg:grid-cols-2"
      >
        <article className="grid grid-cols-[40%_minmax(0,1fr)] overflow-hidden rounded-2xl bg-[#281914] sm:grid-cols-[44%_1fr] sm:rounded-xl">
          <div className="min-h-full overflow-hidden">
            <img
              src="/images/ape-green.png"
              alt="NFT Emerald Ape"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex min-w-0 flex-col items-start justify-center p-4 sm:p-7">
            <p className="font-mono text-[9px] font-bold uppercase tracking-wide text-[#e9a15c] sm:text-xs">
              Coleção em destaque
            </p>

            <h2 className="mt-2 font-mono text-sm font-extrabold leading-snug text-[#f5eee7] sm:mt-3 sm:text-xl">
              Descubra novas expressões da arte digital
            </h2>

            <p className="mt-2 hidden text-sm leading-relaxed text-[#b99674] sm:block">
              Explore obras selecionadas e encontre sua próxima
              peça favorita.
            </p>

            <Link
              to="/nft/$nftId"
              params={{ nftId: '1' }}
              className="mt-3 inline-flex rounded-md bg-[#d9914d] px-3 py-2 font-mono text-[10px] font-extrabold text-[#1a100d] transition hover:bg-[#efaa67] sm:mt-6 sm:px-5 sm:py-3 sm:text-xs"
            >
              Explorar →
            </Link>
          </div>
        </article>

        <article className="grid grid-cols-[40%_minmax(0,1fr)] overflow-hidden rounded-2xl bg-[#281914] sm:grid-cols-[44%_1fr] sm:rounded-xl">
          <div className="min-h-full overflow-hidden">
            <img
              src="/images/ape-suit.png"
              alt="NFT Neon Vessel"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex min-w-0 flex-col items-start justify-center p-4 sm:p-7">
            <p className="font-mono text-[9px] font-bold uppercase tracking-wide text-[#e9a15c] sm:text-xs">
              Universo Kurio
            </p>

            <h2 className="mt-2 font-mono text-sm font-extrabold leading-snug text-[#f5eee7] sm:mt-3 sm:text-xl">
              Arte digital selecionada e muito mais
            </h2>

            <p className="mt-2 hidden text-sm leading-relaxed text-[#b99674] sm:block">
              Conheça uma seleção de NFTs com diferentes
              estilos e identidades.
            </p>

            <Link
              to="/nft/$nftId"
              params={{ nftId: '3' }}
              className="mt-3 inline-flex rounded-md bg-[#d9914d] px-3 py-2 font-mono text-[10px] font-extrabold text-[#1a100d] transition hover:bg-[#efaa67] sm:mt-6 sm:px-5 sm:py-3 sm:text-xs"
            >
              Explorar →
            </Link>
          </div>
        </article>
      </section>

      {/* Conteúdo editorial */}
      <section aria-labelledby="editorial-heading">
        <div className="mb-6 text-center sm:mb-10">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d9914d] sm:text-xs">
            Cultura digital
          </p>

          <h2
            id="editorial-heading"
            className="mt-3 font-mono text-xl font-extrabold text-[#f5eee7] sm:text-3xl"
          >
            Diário da Cunhagem
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-[#b99674] sm:text-sm">
            Conceitos e histórias para quem deseja conhecer
            melhor o universo dos colecionáveis digitais.
          </p>
        </div>

        {/* Deslize horizontalmente no mobile */}
        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {articles.map((article) => (
            <article
              key={article.title}
              className="w-[76vw] max-w-[300px] shrink-0 snap-start overflow-hidden rounded-xl bg-[#281914] sm:w-auto sm:max-w-none"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={article.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-5">
                <p className="font-mono text-[11px] font-semibold text-[#d9914d]">
                  {article.category}
                </p>

                <h3 className="mt-3 font-mono text-sm font-bold leading-snug text-[#f5eee7]">
                  {article.title}
                </h3>

                <p className="mt-3 text-xs leading-relaxed text-[#b99674]">
                  {article.description}
                </p>

                <span className="mt-5 inline-block text-xs font-bold text-[#e9a15c]">
                  Conteúdo demonstrativo
                </span>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-2 text-center font-mono text-[10px] text-[#a98a70] sm:hidden">
          Deslize para explorar →
        </p>
      </section>

      {/* Chamada final */}
      <section className="rounded-2xl border border-[#493025] bg-[#241713] px-5 py-9 text-center sm:rounded-xl sm:px-10 sm:py-12">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#d9914d] sm:text-xs">
          Sua próxima descoberta
        </p>

        <h2 className="mt-4 font-mono text-xl font-extrabold text-[#f5eee7] sm:text-3xl">
          Continue explorando o universo Kurio
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-xs leading-relaxed text-[#b99674] sm:text-sm">
          Descubra novas obras, conheça diferentes estilos
          e construa sua seleção de arte digital.
        </p>

        <a
          href="#explorar"
          className="mt-6 inline-flex rounded-md bg-[#d9914d] px-5 py-3 font-mono text-[11px] font-extrabold text-[#1a100d] transition hover:bg-[#efaa67] sm:mt-7 sm:px-7 sm:text-xs"
        >
          Explorar marketplace →
        </a>
      </section>
    </div>
  )
}
