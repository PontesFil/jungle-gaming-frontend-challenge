import { Link } from '@tanstack/react-router'

export default function Hero() {
  return (
    <section className="grid items-center gap-10 py-10 md:grid-cols-2 md:py-16">
      <div className="space-y-6">
        <span className="inline-block border-b-2 border-purple-500 pb-1 font-mono text-xs font-bold uppercase tracking-widest text-purple-400">
          Bem-vindo à Kurio
        </span>

        <h1 className="max-w-xl font-mono text-4xl font-extrabold uppercase leading-tight tracking-tight text-white md:text-5xl">
          Seja dono do futuro da arte digital
        </h1>

        <p className="max-w-lg text-sm leading-relaxed text-[#a99a91]">
          Descubra NFTs selecionados de criadores emergentes e consagrados.
          Colecione arte digital única, apoie artistas e tenha uma parte da
          cultura da internet.
        </p>

        <a
          href="#explorar"
          className="inline-flex rounded-md bg-[#d9914d] px-7 py-3 text-sm font-bold uppercase text-[#1a100d] transition-colors hover:bg-orange-400"
        >
          Explorar
        </a>
      </div>

      <div className="mx-auto w-full max-w-sm">
        <Link
          to="/nft/$nftId"
          params={{ nftId: '1' }}
          className="block overflow-hidden rounded-2xl bg-[#2b1b15] transition-transform hover:scale-[1.02]"
        >
          <img
            src="/images/ape-green.png"
            alt="NFT em destaque da coleção Kurio"
            className="aspect-square w-full object-cover"
          />
        </Link>
      </div>
    </section>
  )
}