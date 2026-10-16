import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from '@tanstack/react-router'
import { getNfts } from '../services/nftService'
import { useCart } from '../contexts/CartContext'

export default function NftDetailsPage() {
  const { nftId } = useParams({ from: '/nft/$nftId' })

  const { addItem, items } = useCart()

  const {
    data: nfts,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['nfts'],
    queryFn: getNfts,
  })

  if (isPending) {
    return (
      <main className="min-h-screen bg-[#140e0c] p-8 text-white">
        <p>Carregando NFT...</p>
      </main>
    )
  }

  if (isError || !nfts) {
    return (
      <main className="min-h-screen bg-[#140e0c] p-8 text-red-400">
        <p>Erro ao carregar NFT.</p>
      </main>
    )
  }

  const nft = nfts.find((item) => item.id === nftId)

  if (!nft) {
    return (
      <main className="min-h-screen bg-[#140e0c] p-8 text-white">
        <p>NFT não encontrado.</p>
        <Link to="/" className="mt-4 inline-block text-orange-400">
          ← Voltar ao catálogo
        </Link>
      </main>
    )
  }

  const isInCart = items.some((item) => item.id === nft.id)

  const relatedNfts = nfts
    .filter((item) => item.id !== nft.id)
    .slice(0, 3)

  return (
    <main className="min-h-screen bg-[#140e0c] text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Navegação */}
        <nav className="mb-8 text-sm text-white/50">
          <Link to="/" className="transition hover:text-orange-400">
            Mercado
          </Link>

          <span className="mx-3">/</span>

          <span className="text-orange-400">{nft.name}</span>
        </nav>

        {/* Conteúdo principal */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12">
          {/* Imagem */}
          <div>
            <div className="overflow-hidden rounded-2xl border border-[#493025] bg-[#291c17] p-3 sm:p-5">
              <div className="aspect-square overflow-hidden rounded-xl bg-[#35251e]">
                <img
                  src={nft.imageUrl}
                  alt={`Arte do NFT ${nft.name}`}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-xl border border-[#493025] bg-[#211713] p-4">
              <div className="h-12 w-12 overflow-hidden rounded-lg bg-[#35251e]">
                <img
                  src={nft.imageUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <p className="text-xs text-white/50">Coleção</p>
                <p className="font-semibold text-white">
                  Kurio Collection
                </p>
              </div>
            </div>
          </div>

          {/* Informações */}
          <section className="flex flex-col">
            <div className="mb-4">
              <span className="inline-flex rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-400">
                {nft.category}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              {nft.name}
            </h1>

            <p className="mt-4 text-sm text-white/60">
              Criado por{' '}
              <span className="font-semibold text-orange-400">
                {nft.creator}
              </span>
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-[#493025] bg-[#211713] p-4">
                <p className="text-xs text-white/50">Categoria</p>
                <p className="mt-2 text-sm font-semibold">
                  {nft.category}
                </p>
              </div>

              <div className="rounded-xl border border-[#493025] bg-[#211713] p-4">
                <p className="text-xs text-white/50">Moeda</p>
                <p className="mt-2 text-sm font-semibold">
                  {nft.currency}
                </p>
              </div>
            </div>

            {/* Painel de compra */}
            <div className="mt-8 rounded-2xl border border-[#67412c] bg-[#281b15] p-5 sm:p-6">
              <p className="text-sm text-white/60">
                Preço atual
              </p>

              <p className="mt-2 text-4xl font-extrabold text-orange-400">
                {nft.price.toFixed(2)}{' '}
                <span className="text-xl">{nft.currency}</span>
              </p>

              <p className="mt-2 text-xs text-white/40">
                Compra demonstrativa — nenhuma transação real será realizada.
              </p>

              <button
                type="button"
                onClick={() => addItem(nft)}
                disabled={isInCart}
                className="mt-6 w-full rounded-xl bg-orange-500 px-6 py-4 text-sm font-bold text-[#1b100b] transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isInCart
                  ? '✓ Adicionado ao carrinho'
                  : 'Adicionar ao carrinho'}
              </button>

              <Link
                to="/cart"
                className="mt-3 flex w-full items-center justify-center rounded-xl border border-orange-500/40 px-6 py-3 text-sm font-semibold text-orange-400 transition hover:bg-orange-500/10"
              >
                Ver carrinho →
              </Link>
            </div>

            <div className="mt-6 rounded-xl border border-[#493025] bg-[#211713] p-5">
              <h2 className="font-bold">Detalhes do ativo</h2>

              <dl className="mt-4 space-y-4 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-white/50">Identificador</dt>
                  <dd className="font-medium">#{nft.id}</dd>
                </div>

                <div className="h-px bg-white/10" />

                <div className="flex items-center justify-between gap-4">
                  <dt className="text-white/50">Criador</dt>
                  <dd className="font-medium">{nft.creator}</dd>
                </div>

                <div className="h-px bg-white/10" />

                <div className="flex items-center justify-between gap-4">
                  <dt className="text-white/50">Moeda</dt>
                  <dd className="font-medium">{nft.currency}</dd>
                </div>
              </dl>
            </div>
          </section>
        </div>

        {/* NFTs relacionados */}
        {relatedNfts.length > 0 && (
          <section className="mt-16 border-t border-white/10 pt-10">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-orange-400">
                  Descubra mais
                </p>

                <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                  Você também pode gostar
                </h2>
              </div>

              <Link
                to="/"
                className="shrink-0 text-sm font-semibold text-orange-400 hover:underline"
              >
                Ver todos →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
              {relatedNfts.map((item) => (
                <Link
                  key={item.id}
                  to="/nft/$nftId"
                  params={{ nftId: item.id }}
                  className="group overflow-hidden rounded-xl border border-[#493025] bg-[#241914] transition hover:border-orange-500/60"
                >
                  <div className="aspect-square overflow-hidden bg-[#35251e]">
                    <img
                      src={item.imageUrl}
                      alt={`Arte do NFT ${item.name}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-3 sm:p-4">
                    <h3 className="truncate font-bold">{item.name}</h3>

                    <p className="mt-1 truncate text-xs text-white/50">
                      {item.creator}
                    </p>

                    <p className="mt-3 text-sm font-bold text-orange-400">
                      {item.price.toFixed(2)} {item.currency}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}