
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
    <div className="mt-24 space-y-24">
      {/* Banners promocionais */}
      <section
        aria-label="Coleções em destaque"
        className="grid gap-5 lg:grid-cols-2"
      >
        <article className="grid overflow-hidden rounded-xl bg-[#281914] sm:grid-cols-[44%_1fr]">
          <div className="aspect-[4/3] overflow-hidden sm:aspect-auto">
            <img
              src="/images/ape-green.png"
              alt="NFT Emerald Ape"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col items-start justify-center p-6 sm:p-7">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#e9a15c]">
              Coleção em destaque
            </p>

            <h2 className="mt-3 font-mono text-xl font-extrabold leading-snug text-[#f5eee7]">
              Descubra novas expressões da arte digital
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-[#b99674]">
              Explore obras selecionadas e encontre sua próxima
              peça favorita.
            </p>

            <Link
              to="/nft/$nftId"
              params={{ nftId: '1' }}
              className="mt-6 inline-flex rounded-md bg-[#d9914d] px-5 py-3 text-xs font-extrabold text-[#1a100d] transition hover:bg-[#efaa67]"
            >
              Explorar →
            </Link>
          </div>
        </article>

        <article className="grid overflow-hidden rounded-xl bg-[#281914] sm:grid-cols-[44%_1fr]">
          <div className="aspect-[4/3] overflow-hidden sm:aspect-auto">
            <img
              src="/images/ape-suit.png"
              alt="NFT Neon Vessel"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col items-start justify-center p-6 sm:p-7">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#e9a15c]">
              Universo Kurio
            </p>

            <h2 className="mt-3 font-mono text-xl font-extrabold leading-snug text-[#f5eee7]">
              Arte digital selecionada e muito mais
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-[#b99674]">
              Conheça uma seleção de NFTs com diferentes
              estilos e identidades.
            </p>

            <Link
              to="/nft/$nftId"
              params={{ nftId: '3' }}
              className="mt-6 inline-flex rounded-md bg-[#d9914d] px-5 py-3 text-xs font-extrabold text-[#1a100d] transition hover:bg-[#efaa67]"
            >
              Explorar →
            </Link>
          </div>
        </article>
      </section>

      {/* Conteúdo editorial */}
      <section aria-labelledby="editorial-heading">
        <div className="mb-10 text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#d9914d]">
            Cultura digital
          </p>

          <h2
            id="editorial-heading"
            className="mt-3 font-mono text-2xl font-extrabold text-[#f5eee7] sm:text-3xl"
          >
            Diário da Cunhagem
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#b99674]">
            Conceitos e histórias para quem deseja conhecer
            melhor o universo dos colecionáveis digitais.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {articles.map((article) => (
            <article
              key={article.title}
              className="overflow-hidden rounded-lg bg-[#281914]"
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
      </section>

      {/* Chamada final */}
      <section className="rounded-xl border border-[#493025] bg-[#241713] px-6 py-12 text-center sm:px-10">
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#d9914d]">
          Sua próxima descoberta
        </p>

        <h2 className="mt-4 font-mono text-2xl font-extrabold text-[#f5eee7] sm:text-3xl">
          Continue explorando o universo Kurio
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#b99674]">
          Descubra novas obras, conheça diferentes estilos
          e construa sua seleção de arte digital.
        </p>

        <a
          href="#explorar"
          className="mt-7 inline-flex rounded-md bg-[#d9914d] px-7 py-3 text-xs font-extrabold text-[#1a100d] transition hover:bg-[#efaa67]"
        >
          Explorar marketplace →
        </a>
      </section>
    </div>
  )
}
