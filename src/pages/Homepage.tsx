
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { SlidersHorizontal } from 'lucide-react'

import { getNfts } from '../services/nftService'
import Hero from '../components/home/Hero'
import NftFilters from '../components/home/NftFilters'
import HomeExtras from '../components/home/HomeExtras'

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
    <main className="min-h-screen bg-[#140e0c] pb-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Hero />

        <section
          id="explorar"
          className="scroll-mt-24 pt-8"
        >
          {/* Cabeçalho do catálogo */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#d9914d]">
                Coleção selecionada
              </p>

              <h2 className="mt-2 font-mono text-2xl font-extrabold text-[#f5eee7]">
                Explore NFTs
              </h2>

              <p className="mt-2 text-sm text-[#b99674]">
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
              className="flex cursor-pointer items-center gap-2 rounded-md bg-[#d9914d] px-4 py-3 text-xs font-bold text-[#140e0c] lg:hidden"
            >
              <SlidersHorizontal size={16} />
              Filtros
            </button>
          </div>

          {/* Filtros mobile */}
          <div
            id="mobile-nft-filters"
            className={`mb-6 lg:hidden ${
              showMobileFilters ? 'block' : 'hidden'
            }`}
          >
            <NftFilters {...filterProps} />
          </div>

          <div className="grid items-start gap-6 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-8">
            {/* Sidebar desktop */}
            <div className="hidden lg:block">
              <NftFilters {...filterProps} />
            </div>

            {/* Galeria */}
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
                  <div className="mb-5 flex items-center justify-between gap-4 border-b border-[#493025] pb-4">
                    <span className="font-mono text-xs text-[#b99674]">
                      {filteredNfts.length} NFTs encontrados
                    </span>

                    <span className="hidden font-mono text-xs text-[#8d7160] sm:block">
                      Arte digital selecionada
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-6 xl:grid-cols-3">
                    {filteredNfts.map((nft) => (
                      <Link
                        key={nft.id}
                        to="/nft/$nftId"
                        params={{ nftId: nft.id }}
                        className="group block min-w-0"
                      >
                        <article>
                          <div className="aspect-square overflow-hidden rounded-lg bg-[#2b1b15]">
                            <img
                              src={nft.imageUrl}
                              alt={`Arte do NFT ${nft.name}`}
                              loading="lazy"
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                            />
                          </div>

                          <div className="pt-3">
                            <h3 className="truncate font-mono text-xs font-semibold text-[#f5eee7] transition group-hover:text-[#e9a15c] sm:text-sm">
                              {nft.name}
                            </h3>

                            <p className="mt-1 truncate text-[11px] text-[#a98a70]">
                              {nft.creator}
                            </p>

                            <p className="mt-2 font-mono text-sm font-extrabold text-[#e9a15c]">
                              {nft.price.toFixed(2)} {nft.currency}
                            </p>
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

        <HomeExtras />
      </div>
    </main>
  )
}
