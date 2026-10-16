import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from '@tanstack/react-router'
import { getNfts } from '../services/nftService'
import { useCart } from '../contexts/CartContext'

export default function NftDetailsPage() {
  const { nftId } = useParams({ from: '/nft/$nftId' })

  const { addItem, items } = useCart()

  const { data: nfts, isPending, isError } = useQuery({
    queryKey: ['nfts'],
    queryFn: getNfts,
  })

  if (isPending) {
    return <p className="p-8 text-white">Carregando NFT...</p>
  }

  if (isError) {
    return <p className="p-8 text-red-400">Erro ao carregar NFT.</p>
  }

  const nft = nfts.find((item) => item.id === nftId)

  if (!nft) {
    return <p className="p-8 text-white">NFT não encontrado.</p>
  }

  const isInCart = items.some((item) => item.id === nft.id)

  return (
    <main className="min-h-screen bg-[#140e0c] p-8 text-white">
      <Link to="/" className="text-orange-400 hover:underline">
        ← Voltar ao catálogo
      </Link>

      <div className="mx-auto mt-8 grid max-w-5xl gap-10 md:grid-cols-2">
        <div className="flex aspect-square items-center justify-center rounded-xl bg-[#35251e]">
          <div className="aspect-square w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#33231d]">
            <img
              src={nft.imageUrl}
              alt={`Arte do NFT ${nft.name}`}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <section>
          <p className="text-sm text-orange-400">{nft.category}</p>

          <h1 className="mt-3 text-4xl font-bold">{nft.name}</h1>

          <p className="mt-4 text-white/60">
            Criado por {nft.creator}
          </p>

          <p className="mt-8 text-3xl font-bold text-orange-400">
            {nft.price} {nft.currency}
          </p>

          <button
  type="button"
  onClick={() => addItem(nft)}
  disabled={isInCart}
  className="mt-8 rounded-lg bg-orange-500 px-6 py-3 font-bold text-black disabled:cursor-not-allowed disabled:opacity-50"
>
  {isInCart ? 'Adicionado ao carrinho' : 'Adicionar ao carrinho'}
</button>
        </section>
      </div>
    </main>
  )
}