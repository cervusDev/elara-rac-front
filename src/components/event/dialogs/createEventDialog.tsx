import React from "react"
import {
    Dialog,
    DialogTitle,
    DialogHeader,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { PlusCircle } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { EventResponse } from "@/service/event.service"
import { useCreateEvent, useUpdateEvent } from "@/hooks/event.hook"

interface IProps {
    event?: EventResponse
    setOpenEdit?: any
    openEdit?: boolean
    typeOfDialog: 'CREATE' | 'UPDATE'
}

export const CreateOrUpdateEventDialog = ({ typeOfDialog, openEdit, setOpenEdit, event }: IProps) => {
    const [open, setOpen] = React.useState(false)
    const { mutate: mutateCreate } = useCreateEvent()
    const { mutate: mutateUpdate } = useUpdateEvent(event?.id as number)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget);
        const payload = {
            title: formData.get("title") as string,
            banner: formData.get("banner") as string,
            address: formData.get("address") as string,
            date: new Date(formData.get("date") as string).toISOString(),
            time: formData.get("time") as string,
            value: Number(formData.get("value")),
            maxParticipants: Number(formData.get("maxParticipants")),
        }

        if (typeOfDialog === 'CREATE') {
            mutateCreate(payload)
            setOpen(false)
        }

        if (typeOfDialog === 'UPDATE' && event?.id) {
            mutateUpdate(payload as any)
            setOpenEdit(false)
        }

    }

    return (
        <Dialog
            open={typeOfDialog === 'CREATE' ? open : openEdit}
            onOpenChange={typeOfDialog === 'CREATE' ? setOpen : setOpenEdit}
        >
            {typeOfDialog === 'CREATE' && (
                <DialogTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start gap-2 hover:bg-gray-700">
                        <PlusCircle className="h-4 w-4" />
                        Criar Evento
                    </Button>
                </DialogTrigger>
            )}

            <DialogContent className="bg-white dark:bg-zinc-900">
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        {typeOfDialog === 'CREATE' ? 'Vamos criar um novo evento!' : ''}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-1">
                        <Label htmlFor="title">Título</Label>
                        <Input
                            id="title"
                            name='title'
                            placeholder="Festa de lançamento"
                            defaultValue={typeOfDialog === 'UPDATE' && event && event.title || ''}
                        />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="banner">Banner (URL)</Label>
                        <Input
                            id="banner"
                            name='banner'
                            placeholder="https://..."
                            defaultValue={typeOfDialog === 'UPDATE' && event && event.banner || ''}
                        />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="address">Endereço</Label>
                        <Input
                            id="address"
                            name='address'
                            placeholder="Rua Odilon Prado Cassetari 2707"
                            defaultValue={typeOfDialog === 'UPDATE' && event && event.address || ''}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Label htmlFor="date">Data</Label>
                            <Input
                                id="date"
                                name='date'
                                type="date"
                                defaultValue={typeOfDialog === 'UPDATE' && event && event.date || ''}

                            />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="time">Hora</Label>
                            <Input
                                id="time"
                                name='time'
                                type="time"
                                defaultValue={typeOfDialog === 'UPDATE' && event && event.time || ''}

                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Label htmlFor="value">Valor (R$)</Label>
                            <Input
                                id="value"
                                step="0.01"
                                name='value'
                                type="number"
                                defaultValue={typeOfDialog === 'UPDATE' && event && event.value || ''}

                            />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="maxParticipants">Participantes</Label>
                            <Input
                                type="number"
                                id="maxParticipants"
                                name='maxParticipants'
                                defaultValue={typeOfDialog === 'UPDATE' && event && event.maxParticipants || ''}
                            />
                        </div>
                    </div>

                    <Button className="w-full mt-4" type="submit">
                        {typeOfDialog === 'CREATE' ? 'Criar evento' : 'Editar evento'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}