
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { SlidersHorizontal } from 'lucide-react'

import { getNfts } from '../services/nftService'
import Hero from '../components/home/Hero'
import NftFilters from '../components/home/NftFilters'

export default function HomePage() {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const [category, setCategory] = useState('Todas')
  const [maxPrice, setMaxPrice] = useState(2.5)
  const [network, setNetwork] = useState('Todas')
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const {
    data: nfts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['nfts'],
    queryFn: getNfts,
  })

  const filteredNfts = [...(nfts ?? [])]
    .filter((nft) => {
      const term = search.trim().toLowerCase()

      const matchesSearch =
        nft.name.toLowerCase().includes(term) ||
        nft.creator.toLowerCase().includes(term)

      const matchesCategory =
        category === 'Todas' || nft.category === category

      const matchesPrice = nft.price <= maxPrice

      // O catálogo demonstrativo atual utiliza Ethereum.
      const matchesNetwork =
        network === 'Todas' || network === 'Ethereum'

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesNetwork
      )
    })
    .sort((a, b) => {
      if (sortBy === 'lowest') return a.price - b.price
      if (sortBy === 'highest') return b.price - a.price
      if (sortBy === 'name') return a.name.localeCompare(b.name)

      return 0
    })

  const filterProps = {
    search,
    onSearchChange: setSearch,
    sortBy,
    onSortChange: setSortBy,
    category,
    onCategoryChange: setCategory,
    maxPrice,
    onMaxPriceChange: setMaxPrice,
    network,
    onNetworkChange: setNetwork,
  }

  return (
    <main className="min-h-screen bg-[#140e0c] px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Hero />

        <section id="explorar" className="scroll-mt-24">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="font-mono text-2xl font-bold">
                Explore NFTs
              </h2>
              <p className="mt-1 text-sm text-[#b99674]">
                Descubra colecionáveis digitais selecionados.
              </p>
            </div>

            <button
              type="button"
              aria-expanded={showMobileFilters}
              aria-controls="mobile-nft-filters"
              onClick={() =>
                setShowMobileFilters((previous) => !previous)
              }
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#d9904e] px-4 py-3 font-semibold text-[#140e0c] lg:hidden"
            >
              <SlidersHorizontal size={18} />
              Filtros
            </button>
          </div>

          <div
            id="mobile-nft-filters"
            className={`mb-6 lg:hidden ${
              showMobileFilters ? 'block' : 'hidden'
            }`}
          >
            <NftFilters {...filterProps} />
          </div>

          <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
            <div className="hidden lg:block">
              <NftFilters {...filterProps} />
            </div>

            <div className="min-w-0">
              {isLoading ? (
                <p className="py-8 text-white/70">
                  Carregando NFTs...
                </p>
              ) : isError ? (
                <p role="alert" className="py-8 text-red-400">
                  Erro ao carregar NFTs.
                </p>
              ) : (
                <>
                  <p className="mb-4 text-sm text-[#b99674]">
                    {filteredNfts.length} NFTs encontrados
                  </p>

                  <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
                    {filteredNfts.map((nft) => (
                      <Link
                        key={nft.id}
                        to="/nft/$nftId"
                        params={{ nftId: nft.id }}
                        className="group block overflow-hidden rounded-xl border border-[#513324] bg-[#241813] transition-all duration-300 hover:-translate-y-1 hover:border-[#d9904e]"
                      >
                        <article>
                          <div className="aspect-square overflow-hidden bg-[#33231d]">
                            <img
                              src={nft.imageUrl}
                              alt={`Arte do NFT ${nft.name}`}
                              loading="lazy"
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>

                          <div className="space-y-2 p-3 sm:p-4">
                            <h3 className="font-mono text-sm font-semibold text-white sm:text-base">
                              {nft.name}
                            </h3>

                            <p className="hidden text-xs text-[#b99674] sm:block">
                              Criado por {nft.creator}
                            </p>

                            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                              <span className="font-mono text-sm font-bold text-[#e39a52] sm:text-base">
                                {nft.price.toFixed(2)} {nft.currency}
                              </span>

                              <span className="hidden text-xs text-[#b99674] transition-colors group-hover:text-[#e39a52] sm:inline">
                                Ver detalhes →
                              </span>
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>

                  {filteredNfts.length === 0 && (
                    <p className="py-12 text-center text-white/60">
                      Nenhum NFT encontrado com esses filtros.
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
