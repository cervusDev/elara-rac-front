import React from "react"
import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BuyTicketDialog } from "./BuyTicketDialog"
import type { EventResponse } from "@/service/event"
import { CalendarDays, Ticket, Pencil } from "lucide-react"
import { ViewDetailDialog } from "../dialogs/viewDetailDialog"
import { CreateOrUpdateEventDialog } from "../dialogs/createEventDialog"

interface EventCardProps {
    event: EventResponse
}

export function EventCard({ event }: EventCardProps) {
    const [open, setOpen] = React.useState(false)
    const [openBuyDialog, setOpenBuyDialog] = React.useState(false)
    const [openEditDialog, setOpenEditDialog] = React.useState(false)

    return (
        <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="relative">
                <button
                    onClick={() => setOpenEditDialog(true)}
                    className="absolute top-2 right-4 bg-white border border-gray-300 rounded-full p-2 shadow-sm hover:bg-gray-100 hover:shadow-md transition duration-200"
                    title="Editar evento"
                >
                    <Pencil className="w-4 h-4 text-gray-600" />
                </button>
            </div>

            <div className="h-40 overflow-hidden">
                <img
                    src={event.banner}
                    alt={`Banner do evento ${event.title}`}
                    className="w-full h-full object-cover"
                />
            </div>

            <CardHeader className="pb-3">
                <CardTitle className="text-xl line-clamp-2">{event.title}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    <span>{new Date(event.date).toLocaleDateString('pt-BR', {
                        month: 'long',
                        day: '2-digit',
                        year: 'numeric',
                    })}</span>
                </div>

                <div className="flex items-center gap-2">
                    <Ticket className="h-4 w-4 text-primary" />
                    <span className="font-bold">
                        {Number(event.value).toLocaleString('pt-BR', {
                            currency: 'BRL',
                            style: 'currency',
                        })}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4">
                    <Button variant="secondary" onClick={() => setOpen(true)}>Ver detalhes</Button>
                    <Button onClick={() => setOpenBuyDialog(true)}>Comprar ingresso</Button>
                </div>

                <ViewDetailDialog event={event} open={open} setOpen={setOpen} />
                <BuyTicketDialog open={openBuyDialog} setOpen={setOpenBuyDialog} event={event} />
                <CreateOrUpdateEventDialog
                    openEdit={openEditDialog}
                    setOpenEdit={setOpenEditDialog}
                    typeOfDialog="UPDATE" event={event}
                />
            </CardContent>
        </Card>
    )
}