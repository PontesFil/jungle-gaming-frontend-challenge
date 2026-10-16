import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'

import { getNfts } from '../services/nftService'
import Hero from '../components/home/Hero'
import NftFilters from '../components/home/NftFilters'

export default function HomePage() {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('default')

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

      return (
        nft.name.toLowerCase().includes(term) ||
        nft.creator.toLowerCase().includes(term)
      )
    })
    .sort((a, b) => {
      if (sortBy === 'lowest') return a.price - b.price
      if (sortBy === 'highest') return b.price - a.price
      if (sortBy === 'name') return a.name.localeCompare(b.name)

      return 0
    })

  return (
    <main className="min-h-screen bg-[#140e0c] px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Hero />

        <section id="explorar" className="scroll-mt-24">
          <h2 className="mb-6 font-mono text-2xl font-bold text-white">
            Explore NFTs
          </h2>

          <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
            <NftFilters
              search={search}
              onSearchChange={setSearch}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />

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
                  <p className="mb-4 text-sm text-white/50">
                    {filteredNfts.length} NFTs encontrados
                  </p>

                  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredNfts.map((nft) => (
                      <Link
                        key={nft.id}
                        to="/nft/$nftId"
                        params={{ nftId: nft.id }}
                        className="group block overflow-hidden rounded-xl border border-white/10 bg-[#241813] transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50"
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

                          <div className="space-y-2 p-4">
                            <h3 className="font-semibold text-white">
                              {nft.name}
                            </h3>

                            <p className="text-xs text-white/50">
                              Criado por {nft.creator}
                            </p>

                            <div className="flex items-center justify-between gap-2 pt-2">
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
                  </div>

                  {filteredNfts.length === 0 && (
                    <p className="py-12 text-center text-white/50">
                      Nenhum NFT encontrado.
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