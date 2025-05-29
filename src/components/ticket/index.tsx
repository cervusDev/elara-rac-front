import { useAuth } from '@/hooks/auth.hook'
import { CalendarDays, Ticket } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useTicketsQuery } from '@/hooks/ticket.hook'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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
        <Card key={ticket.id} className="transition-shadow hover:shadow-lg">
          <CardHeader>
            <CardTitle>{ticket.event.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              <span>
                {new Date(ticket.event.date).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Ticket className="h-4 w-4 text-primary" />
              <span className="font-bold">
                {Number(ticket.event.value).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            </div>
            <div className="mt-2">
              <span className="text-sm text-muted-foreground">Status: </span>
              <span className="font-semibold">{ticket.status}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};