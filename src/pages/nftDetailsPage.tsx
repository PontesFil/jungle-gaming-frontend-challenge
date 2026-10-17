
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
      <main className="bg-[#140e0c] px-4 py-16 text-[#c6a17b]">
        <div className="mx-auto max-w-7xl">
          <p>Carregando NFT...</p>
        </div>
      </main>
    )
  }

  if (isError || !nfts) {
    return (
      <main className="bg-[#140e0c] px-4 py-16 text-red-400">
        <div className="mx-auto max-w-7xl">
          <p role="alert">Erro ao carregar NFT.</p>
        </div>
      </main>
    )
  }

  const nft = nfts.find((item) => item.id === nftId)

  if (!nft) {
    return (
      <main className="bg-[#140e0c] px-4 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-mono text-2xl font-bold">
            NFT não encontrado
          </h1>

          <Link
            to="/"
            className="mt-5 inline-block text-[#e9a15c] hover:underline"
          >
            ← Voltar ao catálogo
          </Link>
        </div>
      </main>
    )
  }

  const isInCart = items.some((item) => item.id === nft.id)

  const relatedNfts = nfts
    .filter((item) => item.id !== nft.id)
    .slice(0, 5)

  return (
    <main className="bg-[#140e0c] pb-20 text-[#f5eee7]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Navegação estrutural"
          className="mb-9 flex items-center gap-3 font-mono text-xs"
        >
          <Link
            to="/"
            className="text-[#c6a17b] transition hover:text-[#e9a15c]"
          >
            Início
          </Link>

          <span className="text-[#70503e]">/</span>

          <Link
            to="/"
            hash="explorar"
            className="text-[#c6a17b] transition hover:text-[#e9a15c]"
          >
            Mercado
          </Link>

          <span className="text-[#70503e]">/</span>

          <span className="truncate text-[#e9a15c]">
            {nft.name}
          </span>
        </nav>

        {/* Galeria + informações */}
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
          {/* Galeria */}
          <section
            aria-label={`Galeria de ${nft.name}`}
            className="min-w-0"
          >
            <div className="grid grid-cols-[64px_minmax(0,1fr)] items-start gap-3 sm:grid-cols-[82px_minmax(0,1fr)] sm:gap-5">
              {/* Miniatura da obra */}
              <div className="space-y-3">
                <div className="overflow-hidden rounded-lg border-2 border-[#d9914d] bg-[#2b1b15] p-1">
                  <img
                    src={nft.imageUrl}
                    alt={`Miniatura de ${nft.name}`}
                    className="aspect-square w-full object-cover"
                  />
                </div>

                <div className="rounded-md border border-[#493025] bg-[#241713] px-2 py-3 text-center">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wide text-[#d9914d]">
                    Arte
                  </p>

                  <p className="mt-1 text-[10px] text-[#b99674]">
                    Digital
                  </p>
                </div>
              </div>

              {/* Imagem principal */}
              <div className="overflow-hidden rounded-lg bg-[#281914] p-3 sm:p-4">
                <div className="aspect-square overflow-hidden rounded-lg bg-[#35251e]">
                  <img
                    src={nft.imageUrl}
                    alt={`Arte do NFT ${nft.name}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3 border-t border-[#493025] pt-5">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md bg-[#35251e]">
                <img
                  src={nft.imageUrl}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <p className="font-mono text-[11px] text-[#a98a70]">
                  Coleção
                </p>

                <p className="mt-1 font-mono text-xs font-bold">
                  Kurio Collection
                </p>
              </div>
            </div>
          </section>

          {/* Informações e compra */}
          <section className="min-w-0">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#d9914d]">
              {nft.category}
            </p>

            <h1 className="mt-3 font-mono text-3xl font-extrabold tracking-tight sm:text-4xl">
              {nft.name}
            </h1>

            <p className="mt-3 font-mono text-xs text-[#b99674]">
              Criado por{' '}
              <span className="font-semibold text-[#e9a15c]">
                {nft.creator}
              </span>
            </p>

            {/* Preço */}
            <div className="mt-7 border-b border-[#493025] pb-6">
              <p className="font-mono text-xs text-[#a98a70]">
                Preço atual
              </p>

              <p className="mt-2 font-mono text-3xl font-extrabold text-[#e9a15c]">
                {nft.price.toFixed(2)}{' '}
                <span className="text-lg">{nft.currency}</span>
              </p>
            </div>

            {/* Sobre a obra */}
            <div className="mt-6">
              <h2 className="font-mono text-sm font-bold">
                Sobre este NFT
              </h2>

              <p className="mt-3 text-sm leading-7 text-[#b99674]">
                Conheça {nft.name}, uma obra da coleção Kurio
                criada por {nft.creator}. Explore sua identidade
                visual e adicione este colecionável digital à
                sua seleção.
              </p>
            </div>

            {/* Metadados resumidos */}
            <div className="mt-7 grid grid-cols-2 gap-5 border-y border-[#493025] py-5">
              <div>
                <p className="font-mono text-[11px] text-[#a98a70]">
                  Categoria
                </p>

                <p className="mt-2 font-mono text-xs font-bold">
                  {nft.category}
                </p>
              </div>

              <div>
                <p className="font-mono text-[11px] text-[#a98a70]">
                  Moeda
                </p>

                <p className="mt-2 font-mono text-xs font-bold">
                  {nft.currency}
                </p>
              </div>
            </div>

            {/* Ações de compra */}
            <div className="mt-7">
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => addItem(nft)}
                  disabled={isInCart}
                  className="inline-flex min-h-12 flex-1 cursor-pointer items-center justify-center rounded-md bg-[#d9914d] px-6 py-3 font-mono text-xs font-extrabold text-[#1a100d] transition hover:bg-[#efaa67] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isInCart
                    ? '✓ Adicionado ao carrinho'
                    : 'Adicionar ao carrinho'}
                </button>

                <Link
                  to="/cart"
                  className="inline-flex min-h-12 items-center justify-center rounded-md border border-[#d9914d] px-6 py-3 font-mono text-xs font-bold text-[#e9a15c] transition hover:bg-[#d9914d]/10"
                >
                  Ver carrinho →
                </Link>
              </div>
              
            </div>
          </section>
        </div>

        {/* Detalhes do NFT */}
        <section className="mt-16 border-t border-[#493025] pt-8 sm:mt-20">
          <h2 className="inline-block border-b-2 border-[#d9914d] pb-3 font-mono text-sm font-bold text-[#e9a15c]">
            Detalhes do NFT
          </h2>

          <div className="mt-6 grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(220px,0.6fr)]">
            <div>
              <p className="max-w-3xl text-sm leading-7 text-[#b99674]">
  {nft.name} faz parte da coleção de arte digital
  do Kurio Marketplace. Uma seleção que reúne
  criatividade, identidade visual e novas formas
  de explorar colecionáveis digitais.
</p>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#b99674]">
  Explore os detalhes da obra, acompanhe seu
  preço e descubra outros NFTs que fazem
  parte desta coleção.
</p>
            </div>

            <dl className="space-y-4 border-l border-[#493025] pl-5 font-mono text-xs">
              <div>
                <dt className="text-[#a98a70]">
                  Identificador
                </dt>

                <dd className="mt-1 font-bold text-[#f5eee7]">
                  #{nft.id}
                </dd>
              </div>

              <div>
                <dt className="text-[#a98a70]">
                  Criador
                </dt>

                <dd className="mt-1 font-bold text-[#f5eee7]">
                  {nft.creator}
                </dd>
              </div>

              <div>
                <dt className="text-[#a98a70]">
                  Categoria
                </dt>

                <dd className="mt-1 font-bold text-[#f5eee7]">
                  {nft.category}
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* NFTs relacionados */}
        {relatedNfts.length > 0 && (
          <section className="mt-20">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-[#493025] pb-4">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#d9914d]">
                  Continue explorando
                </p>

                <h2 className="mt-2 font-mono text-xl font-bold text-[#f5eee7] sm:text-2xl">
                  Mais da coleção
                </h2>
              </div>

              <Link
                to="/"
                hash="explorar"
                className="font-mono text-xs font-bold text-[#e9a15c] transition hover:underline"
              >
                Ver todos →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
              {relatedNfts.map((item) => (
                <Link
                  key={item.id}
                  to="/nft/$nftId"
                  params={{ nftId: item.id }}
                  className="group block min-w-0"
                >
                  <article>
                    <div className="aspect-square overflow-hidden rounded-lg bg-[#281914]">
                      <img
                        src={item.imageUrl}
                        alt={`Arte do NFT ${item.name}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                      />
                    </div>

                    <div className="pt-3">
                      <h3 className="truncate font-mono text-xs font-semibold text-[#f5eee7] transition group-hover:text-[#e9a15c]">
                        {item.name}
                      </h3>

                      <p className="mt-1 truncate text-[11px] text-[#a98a70]">
                        {item.creator}
                      </p>

                      <p className="mt-2 font-mono text-sm font-extrabold text-[#e9a15c]">
                        {item.price.toFixed(2)} {item.currency}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
