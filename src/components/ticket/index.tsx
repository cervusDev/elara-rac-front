import { TicketCard } from './card'
import { useAuth } from '@/hooks/auth.hook'
import { Skeleton } from '@/components/ui/skeleton'
import { useTicketsQuery } from '@/hooks/ticket.hook'

export const TicketList = () => {
  const { user } = useAuth();
  const { data, isLoading, error } = useTicketsQuery(user?.id);


  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return <p>Erro ao carregar os ingressos.</p>;
  }

  if (data?.available.length === 0) {
    return <p>Você ainda não possui ingressos.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.available.map((ticket) => (
        <TicketCard ticket={ticket} />
      ))}
      {data?.used.map((ticket) => (
        <TicketCard ticket={ticket} />
      ))}
    </div>
  );
};