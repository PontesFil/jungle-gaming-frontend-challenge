import { useQuery } from '@tanstack/react-query'
import { getNfts } from '../services/nftService'
import { Link } from '@tanstack/react-router'

export default function HomePage() {
  const { data: nfts, isLoading, isError } = useQuery({
    queryKey: ['nfts'],
    queryFn: getNfts,
  })

  if (isLoading) {
    return <p className="p-8 text-white">Carregando NFTs...</p>
  }

  if (isError) {
    return <p className="p-8 text-red-400">Erro ao carregar NFTs.</p>
  }

  return (
    <main className="min-h-screen bg-[#140e0c] p-8 text-white">
      <h1 className="mb-8 text-3xl font-bold text-orange-400">
        Kurio — NFT Marketplace
      </h1>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {nfts?.map((nft) => (
  <Link
    key={nft.id}
    to="/nft/$nftId"
    params={{ nftId: nft.id }}
    className="block rounded-xl border border-white/10 bg-[#211714] p-4 transition hover:border-orange-400"
  >
    <article className="group overflow-hidden rounded-xl border border-white/10 bg-[#241813] transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50">
  <div className="aspect-square overflow-hidden bg-[#33231d]">
    <img
      src={nft.imageUrl}
      alt={`Arte do NFT ${nft.name}`}
      loading="lazy"
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  </div>

  <div className="space-y-2 p-4">
    <h2 className="font-semibold text-white">{nft.name}</h2>

    <p className="text-xs text-white/50">
      Criado por {nft.creator}
    </p>

    <div className="flex items-center justify-between pt-2">
      <span className="font-bold text-orange-400">
        {nft.price.toFixed(2)} {nft.currency}
      </span>

      <span className="text-xs text-white/50 transition-colors group-hover:text-orange-400">
        Ver detalhes →
      </span>
    </div>
  </div>
</article>
  </Link>
))}
      </section>
    </main>
  )
}