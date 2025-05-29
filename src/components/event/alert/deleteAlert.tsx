import {
    AlertDialog,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogTrigger,
    AlertDialogDescription,
} from "@/components/ui/alert-dialog"
import { Trash2 } from "lucide-react"
import { useDeleteEvent } from "@/hooks/event.hook"

interface IProps {
    title: string
    eventId: number
    onClose: () => void
}

export const AlertDelete = ({ eventId, title, onClose }: IProps) => {
    const { mutate } = useDeleteEvent(eventId)

    const handleDelete = () => {
        if (!eventId) {
            throw new Error("Não foi possível encontrar um id.")
        }

        mutate()
        onClose()
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button
                    onClick={() => { }}
                    className="absolute top-85 right-4 bg-white border border-gray-300 rounded-full p-2 shadow-sm hover:bg-gray-100 hover:shadow-md transition duration-200"
                    title="Editar evento"
                >
                    <Trash2 className="w-4 h-4 text-red-600" />
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white dark:bg-gray-900">
                <AlertDialogHeader>
                    <AlertDialogTitle>Deseja realmente deletar este evento?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Isso excluirá permanentemente o evento <strong>{title}</strong>.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete()}>
                        Deletar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}