import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { EventResponse } from "@/service/event"
import { useBuyTicketMutation } from "@/hooks/ticket.hook"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface BuyTicketDialogProps {
    open: boolean
    event: EventResponse
    setOpen: (open: boolean) => void
}

export const BuyTicketDialog = ({ open, setOpen, event }: BuyTicketDialogProps) => {
    const buyTicket = useBuyTicketMutation()
    const [count, setCount] = useState(1)
    const user = JSON.parse(localStorage.getItem("userData") as string)

    const handleIncrement = () => {
        if (count < 3) setCount(prev => prev + 1)
    }

    const handleDecrement = () => {
        if (count > 1) setCount(prev => prev - 1)
    }

    const handleConfirm = () => {
        const payload = { eventId: event?.id, userId: user.id, numberOfTickets: count }
        buyTicket.mutate(payload)
        setOpen(false)
        setCount(1)
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-sm bg-white dark:bg-zinc-900">
                <DialogHeader>
                    <DialogTitle>Comprar Ingressos</DialogTitle>
                </DialogHeader>

                <div className="text-sm">Quantos ingressos deseja comprar? (máx. 3 por usuário)</div>

                <div className="flex items-center justify-center gap-4 my-4">
                    <Button onClick={handleDecrement} disabled={count === 1} variant="outline">-</Button>
                    <span className="text-lg font-bold">{count}</span>
                    <Button onClick={handleIncrement} disabled={count === 3} variant="outline">+</Button>
                </div>

                <DialogFooter>
                    <Button
                        variant="default"
                        className="bg-black text-white hover:bg-black hover:text-white"
                        onClick={handleConfirm}>
                        Confirmar compra
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}