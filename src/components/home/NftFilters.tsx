
interface NftFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  sortBy: string
  onSortChange: (value: string) => void
  category: string
  onCategoryChange: (value: string) => void
  maxPrice: number
  onMaxPriceChange: (value: number) => void
  network: string
  onNetworkChange: (value: string) => void
}

const categories = [
  'Todas',
  'Arte digital',
  'Fotografia',
  'Música',
  'Arte 3D',
  'Colecionáveis',
]

export default function NftFilters({
  search,
  onSearchChange,
  sortBy,
  onSortChange,
  category,
  onCategoryChange,
  maxPrice,
  onMaxPriceChange,
  network,
  onNetworkChange,
}: NftFiltersProps) {
  return (
    <aside className="h-fit bg-[#241713] px-5 py-7 text-[#c6a17b] sm:px-6">
      <h2 className="font-mono text-lg font-extrabold text-[#f5eee7]">
        Coleções
      </h2>

      <div className="mt-7 space-y-8">
        {/* Busca */}
        <div>
          <label
            htmlFor="nft-search"
            className="mb-3 block font-mono text-xs font-bold text-[#f5eee7]"
          >
            Buscar NFT
          </label>

          <input
            id="nft-search"
            type="search"
            placeholder="Nome ou criador..."
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            className="w-full rounded-md border border-[#60402f] bg-[#170f0c] px-3 py-3 text-xs text-white outline-none transition placeholder:text-[#8d7160] focus:border-[#d9914d]"
          />
        </div>

        {/* Categorias */}
        <fieldset>
          <legend className="mb-4 font-mono text-xs font-bold text-[#f5eee7]">
            Categorias
          </legend>

          <div className="space-y-1">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={category === item}
                onClick={() => onCategoryChange(item)}
                className={`flex w-full cursor-pointer items-center rounded px-3 py-2.5 text-left text-xs transition ${
                  category === item
                    ? 'bg-[#38251d] font-bold text-[#e9a15c]'
                    : 'text-[#c6a17b] hover:bg-[#38251d]/60 hover:text-[#f5eee7]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </fieldset>

        {/* Preço */}
        <div className="border-t border-[#493025] pt-7">
          <label
            htmlFor="nft-price"
            className="mb-5 block font-mono text-xs font-bold text-[#f5eee7]"
          >
            Faixa de preço
          </label>

          <input
            id="nft-price"
            type="range"
            min="0.39"
            max="2.50"
            step="0.01"
            value={maxPrice}
            onChange={(event) =>
              onMaxPriceChange(Number(event.target.value))
            }
            className="w-full cursor-pointer accent-[#d9914d]"
          />

          <p className="mt-3 font-mono text-xs text-[#c6a17b]">
            Até {maxPrice.toFixed(2)} ETH
          </p>
        </div>

        {/* Rede */}
        <fieldset className="border-t border-[#493025] pt-7">
          <legend className="sr-only">Rede</legend>

          <p
            aria-hidden="true"
            className="mb-4 font-mono text-xs font-bold text-[#f5eee7]"
          >
            Rede
          </p>

          <div className="space-y-3">
            {['Todas', 'Ethereum'].map((item) => (
              <label
                key={item}
                className="flex cursor-pointer items-center gap-3 text-xs text-[#c6a17b]"
              >
                <input
                  type="radio"
                  name="nft-network"
                  value={item}
                  checked={network === item}
                  onChange={() => onNetworkChange(item)}
                  className="accent-[#d9914d]"
                />
                {item}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Ordenação */}
        <div className="border-t border-[#493025] pt-7">
          <label
            htmlFor="nft-sort"
            className="mb-3 block font-mono text-xs font-bold text-[#f5eee7]"
          >
            Ordenar por
          </label>

          <select
            id="nft-sort"
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value)}
            className="w-full rounded-md border border-[#60402f] bg-[#170f0c] px-3 py-3 text-xs text-white outline-none transition focus:border-[#d9914d]"
          >
            <option value="default">Destaques</option>
            <option value="lowest">Menor preço</option>
            <option value="highest">Maior preço</option>
            <option value="name">Nome A–Z</option>
          </select>
        </div>

        <button
          type="button"
          onClick={() => {
            onSearchChange('')
            onSortChange('default')
            onCategoryChange('Todas')
            onMaxPriceChange(2.5)
            onNetworkChange('Todas')
          }}
          className="w-full cursor-pointer rounded-md border border-[#d9914d] px-4 py-3 text-xs font-bold text-[#d9914d] transition hover:bg-[#d9914d] hover:text-[#170f0c]"
        >
          Limpar filtros
        </button>
      </div>
    </aside>
  )
}
