
import {
    Dialog,
    DialogTitle,
    DialogHeader,
    DialogContent,
} from "@/components/ui/dialog"
import { AlertDelete } from "../alert/deleteAlert"
import type { EventResponse } from "@/service/event.service"
import { CalendarDays, MapPin, Users, Clock } from "lucide-react"

interface IProps {
    setOpen: any
    open: boolean
    event: EventResponse
}

export const ViewDetailDialog = ({ open, setOpen, event }: IProps) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-white dark:bg-zinc-900">
                <AlertDelete eventId={event?.id} title={event?.title} onClose={() => setOpen(false)} />

                <DialogHeader>
                    <DialogTitle>{event.title}</DialogTitle>
                </DialogHeader>

                <img
                    src={event.banner}
                    alt={`Banner do evento ${event.title}`}
                    className="w-full h-48 object-cover rounded-md"
                />

                <div className="space-y-2 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.address}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>
                            {new Date(event.date).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{event.participants}/{event.maxParticipants} participantes</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" />
                        <span>Criado em: {new Date(event.createdAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}