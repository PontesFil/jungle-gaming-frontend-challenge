interface NftFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  sortBy: string
  onSortChange: (value: string) => void
}

export default function NftFilters({
  search,
  onSearchChange,
  sortBy,
  onSortChange,
}: NftFiltersProps) {
  return (
    <aside className="h-fit rounded-xl border border-white/10 bg-[#241813] p-5">
      <h2 className="mb-6 font-mono text-lg font-bold text-white">
        Filtros
      </h2>

      <div className="space-y-5">
        <div>
          <label
            htmlFor="nft-search"
            className="mb-2 block text-sm text-white/70"
          >
            Buscar NFT
          </label>

          <input
            id="nft-search"
            type="search"
            placeholder="Nome ou criador..."
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            className="w-full rounded-lg border border-white/15 bg-[#140e0c] px-3 py-3 text-sm text-white outline-none focus:border-orange-400"
          />
        </div>

        <div>
          <label
            htmlFor="nft-sort"
            className="mb-2 block text-sm text-white/70"
          >
            Ordenar por
          </label>

          <select
            id="nft-sort"
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value)}
            className="w-full rounded-lg border border-white/15 bg-[#140e0c] px-3 py-3 text-sm text-white outline-none focus:border-orange-400"
          >
            <option value="default">Destaques</option>
            <option value="lowest">Menor preço</option>
            <option value="highest">Maior preço</option>
            <option value="name">Nome A–Z</option>
          </select>
        </div>
      </div>
    </aside>
  )
}