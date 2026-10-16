
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
    <aside className="h-fit rounded-xl border border-[#513324] bg-[#241813] p-5 text-[#d5ae83]">
      <h2 className="mb-5 font-mono text-lg font-bold text-white">
        Coleções
      </h2>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="nft-search"
            className="mb-2 block text-sm text-white/80"
          >
            Buscar NFT
          </label>

          <input
            id="nft-search"
            type="search"
            placeholder="Nome ou criador..."
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            className="w-full rounded-md border border-[#513324] bg-[#140e0c] px-3 py-2.5 text-sm text-white outline-none focus:border-[#d9904e]"
          />
        </div>

        <fieldset>
          <legend className="mb-3 font-mono text-sm font-bold text-white">
            Categorias
          </legend>

          <div className="space-y-1">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={category === item}
                onClick={() => onCategoryChange(item)}
                className={`flex w-full cursor-pointer justify-between rounded px-2 py-2 text-left text-sm transition-colors hover:bg-[#38251d] ${
                  category === item
                    ? 'bg-[#38251d] font-semibold text-[#e39a52]'
                    : 'text-[#c6a17b]'
                }`}
              >
                <span>{item}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <div>
          <label
            htmlFor="nft-price"
            className="mb-3 block font-mono text-sm font-bold text-white"
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
            className="w-full cursor-pointer accent-[#d9904e]"
          />

          <p className="mt-2 text-xs">
            Até {maxPrice.toFixed(2)} ETH
          </p>
        </div>

        <fieldset>
          <legend className="mb-3 font-mono text-sm font-bold text-white">
            Rede
          </legend>

          <div className="space-y-2">
            {['Todas', 'Ethereum'].map((item) => (
              <label
                key={item}
                className="flex cursor-pointer items-center gap-2 text-sm"
              >
                <input
                  type="radio"
                  name="nft-network"
                  value={item}
                  checked={network === item}
                  onChange={() => onNetworkChange(item)}
                  className="accent-[#d9904e]"
                />
                {item}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label
            htmlFor="nft-sort"
            className="mb-2 block font-mono text-sm font-bold text-white"
          >
            Ordenar por
          </label>

          <select
            id="nft-sort"
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value)}
            className="w-full rounded-md border border-[#513324] bg-[#140e0c] px-3 py-2.5 text-sm text-white outline-none focus:border-[#d9904e]"
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
          className="w-full cursor-pointer rounded-md border border-[#d9904e] px-3 py-2 text-sm font-semibold text-[#d9904e] transition-colors hover:bg-[#d9904e] hover:text-[#140e0c]"
        >
          Limpar filtros
        </button>
      </div>
    </aside>
  )
}
