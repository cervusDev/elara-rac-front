import type { Ticket } from "@/service/ticket.service"
import { CalendarDays, Ticket as TicketLucid } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface IProps {
    ticket: Ticket
}

export const TicketCard = ({ ticket }: IProps) => {
    return (
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
                    <TicketLucid className="h-4 w-4 text-primary" />
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
    )
}