
import { Link } from '@tanstack/react-router'

export default function Hero() {
  return (
    <section className="grid items-center gap-10 py-12 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:gap-16 md:py-20 lg:py-24">
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
  )
}
