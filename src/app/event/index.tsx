import { EventCard } from "@/components/event/card"
import { useGetAllEvents } from '@/hooks/event.hook'

export function DashboardPage() {
  const { data, isLoading, error } = useGetAllEvents()

  if (isLoading) return <p>Carregando...</p>
  if (error) return <p>Erro ao carregar eventos</p>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {data?.map((event) => ( <EventCard event={event}/> ))}
    </div>
  )
}