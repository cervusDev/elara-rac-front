import React from "react"
import { EventCard } from "@/components/event/card"
import { useDebounce } from "@/hooks/debaunce.hook"
import { useFilteredEvents } from '@/hooks/event.hook'

export function DashboardPage() {
  const [filters, setFilters] = React.useState({ id: '', title: '', date: '' });
  const { data, isLoading, error, refetch } = useFilteredEvents(filters);
  
  const debouncedFilters = useDebounce(filters, 1500);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  React.useEffect(() => {
    refetch()
  }, [debouncedFilters])

  if (isLoading) return <p>Carregando...</p>

  return (
    <div className="p-4">
      <div className="mb-10 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          name="id"
          value={filters.id}
          onChange={handleInputChange}
          placeholder="Filtrar por ID"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="title"
          value={filters.title}
          onChange={handleInputChange}
          placeholder="Filtrar por Título"
          className="border p-2 rounded"
        />
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleInputChange}
          className="border p-2 rounded"
        />
      </div>

      {error && <div className="text-red-600">Erro ao carregar eventos</div>}

       {!error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

       )}
    </div>
  )
}