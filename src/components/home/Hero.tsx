
import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'

export default function Hero() {
  return (
    <>
      {/* Hero mobile */}
      <section
        aria-label="Bem-vindo à Kurio"
        className="relative mt-5 overflow-hidden rounded-[28px] bg-[#70482e] px-4 py-6 text-[#f5eee7] sm:px-6 md:hidden"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full border-[35px] border-[#a36b42]/20"
        />

        <div className="relative grid grid-cols-[minmax(0,1fr)_44%] items-center gap-2">
          <div className="relative z-10 min-w-0">
            <p className="font-mono text-[10px] font-semibold tracking-wide text-[#f4d6ba]">
              Bem-vindo à Kurio
            </p>

            <h1 className="mt-3 font-mono text-[clamp(15px,4.4vw,23px)] font-extrabold uppercase leading-[1.25] tracking-[-0.03em]">
              Seja dono da cultura digital
            </h1>

            <p className="mt-3 max-w-[190px] text-[11px] leading-[1.55] text-[#e5c4a9]">
              Descubra NFTs selecionados de criadores do
              mundo todo.
            </p>

            <a
              href="#explorar"
              className="mt-3 inline-flex items-center gap-1 font-mono text-[11px] font-extrabold uppercase text-[#f1ae69] transition hover:text-white"
            >
              Explorar
              <ArrowUpRight size={15} />
            </a>
          </div>

          <Link
            to="/nft/$nftId"
            params={{ nftId: '1' }}
            aria-label="Ver NFT em destaque da coleção Kurio"
            className="relative block aspect-[3/4] min-w-0 overflow-hidden rounded-2xl bg-[#2b1b15]"
          >
            <img
              src="/images/ape-green.png"
              alt="NFT em destaque da coleção Kurio"
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </Link>
        </div>

        <div
          aria-hidden="true"
          className="relative mt-5 flex justify-center gap-2"
        >
          <span className="h-2 w-2 rounded-full bg-[#f1ae69]" />
          <span className="h-2 w-2 rounded-full bg-[#b77c51]" />
          <span className="h-2 w-2 rounded-full bg-[#b77c51]" />
        </div>
      </section>

      {/* Hero desktop: preservado */}
      <section className="hidden items-center gap-10 py-12 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:gap-16 md:py-20 lg:py-24">
        <div className="max-w-xl">
          <p className="font-mono text-xs font-semibold tracking-[0.22em] text-[#d9a16c]">
            Bem-vindo à Kurio
          </p>

          <h1 className="mt-6 font-mono text-4xl font-extrabold uppercase leading-[1.15] tracking-[-0.035em] text-[#f5f0e9] sm:text-5xl lg:text-[3.4rem]">
            Seja dono do futuro
            <span className="block">da arte digital.</span>
          </h1>

          <p className="mt-6 max-w-md text-sm leading-7 text-[#b9a08d]">
            Descubra NFTs selecionados de criadores emergentes e
            consagrados. Colecione arte digital rara, apoie artistas
            e tenha uma parte da cultura da internet.
          </p>

          <a
            href="#explorar"
            className="mt-7 inline-flex items-center justify-center rounded-md bg-[#d9914d] px-8 py-3 text-xs font-extrabold uppercase tracking-wide text-[#1a100d] transition hover:bg-[#efaa67]"
          >
            Explorar
          </a>

          <div
            aria-hidden="true"
            className="mt-10 hidden items-center gap-2 md:flex"
          >
            <span className="h-2 w-2 rounded-full bg-[#d9914d]" />
            <span className="h-2 w-2 rounded-full bg-[#76503a]" />
            <span className="h-2 w-2 rounded-full bg-[#76503a]" />
          </div>
        </div>

        <div className="mx-auto w-full max-w-[470px]">
          <Link
            to="/nft/$nftId"
            params={{ nftId: '1' }}
            aria-label="Ver NFT em destaque da coleção Kurio"
            className="group block overflow-hidden rounded-2xl bg-[#2b1b15]"
          >
            <img
              src="/images/ape-green.png"
              alt="NFT em destaque da coleção Kurio"
              fetchPriority="high"
              className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
            />
          </Link>
        </div>
      </section>
    </>
  )
}
