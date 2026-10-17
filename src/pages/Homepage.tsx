
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import {
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react'

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
  const [showMobileFilters, setShowMobileFilters] =
    useState(false)

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
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name)
      }

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
    <main className="min-h-screen bg-[#140e0c] pb-28 text-white md:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Busca mobile */}
        <div className="flex items-center gap-3 pt-5 lg:hidden">
          <div className="relative min-w-0 flex-1">
            <Search
              size={19}
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#d9914d]"
            />

            <label htmlFor="mobile-nft-search" className="sr-only">
              Buscar NFTs
            </label>

            <input
              id="mobile-nft-search"
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Explorar coleções"
              className="w-full rounded-xl border border-[#493025]/60 bg-[#241713] py-3.5 pl-12 pr-4 font-mono text-sm text-[#f5eee7] outline-none transition placeholder:text-[#b99674] focus:border-[#d9914d]"
            />
          </div>

          <button
            type="button"
            aria-label={
              showMobileFilters
                ? 'Fechar filtros'
                : 'Abrir filtros'
            }
            aria-expanded={showMobileFilters}
            aria-controls="mobile-nft-filters"
            onClick={() =>
              setShowMobileFilters((previous) => !previous)
            }
            className="flex h-[49px] w-[49px] shrink-0 cursor-pointer items-center justify-center rounded-xl bg-[#d9914d] text-[#140e0c] transition hover:bg-[#efaa67]"
          >
            {showMobileFilters ? (
              <X size={20} />
            ) : (
              <SlidersHorizontal size={20} />
            )}
          </button>
        </div>

        {/* Filtros mobile */}
        <div
          id="mobile-nft-filters"
          className={`pt-4 lg:hidden ${
            showMobileFilters ? 'block' : 'hidden'
          }`}
        >
          <NftFilters {...filterProps} />
        </div>

        <Hero />

        <section
          id="explorar"
          className="scroll-mt-24 pt-7 sm:pt-8"
        >
          {/* Cabeçalho do catálogo */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 sm:mb-8">
            <div>
              <p className="hidden font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#d9914d] sm:block">
                Coleção selecionada
              </p>

              <h2 className="font-mono text-xl font-extrabold text-[#f5eee7] sm:mt-2 sm:text-2xl">
                Explore NFTs
              </h2>

              <p className="mt-2 hidden text-sm text-[#b99674] sm:block">
                Descubra colecionáveis digitais selecionados.
              </p>
            </div>
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

                  <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-9 xl:grid-cols-3">
                    {filteredNfts.map((nft) => (
                      <Link
                        key={nft.id}
                        to="/nft/$nftId"
                        params={{ nftId: nft.id }}
                        className="group block min-w-0"
                      >
                        <article className="min-w-0">
                          <div className="aspect-square overflow-hidden rounded-2xl bg-[#2b1b15] p-1.5 sm:rounded-lg sm:p-0">
                            <img
                              src={nft.imageUrl}
                              alt={`Arte do NFT ${nft.name}`}
                              loading="lazy"
                              className="h-full w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-[1.035] sm:rounded-none"
                            />
                          </div>

                          <div className="px-1 pt-3 sm:px-0">
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
