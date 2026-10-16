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
    <div className="mb-4 flex aspect-square items-center justify-center rounded-lg bg-[#35251e]">
      <span className="text-sm text-white/50">
        Imagem do NFT
      </span>
    </div>

    <h2 className="text-lg font-bold">{nft.name}</h2>

    <p className="mt-2 text-sm text-white/60">
      Criador: {nft.creator}
    </p>

    <p className="mt-3 font-bold text-orange-400">
      {nft.price} {nft.currency}
    </p>
  </Link>
))}
      </section>
    </main>
  )
}