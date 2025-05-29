import {
  Ticket,
  Calendar,
  Settings,
} from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "@/hooks/auth.hook"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CreateOrUpdateEventDialog } from "../event/dialogs/createEventDialog"

export const SideBar = () => {
  const { handleLogout } = useAuth()
  return (
    <aside className="hidden md:flex flex-col w-64 bg-gray-800 border-r border-gray-700">
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <h1 className="text-xl font-bold">Elara</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link to="/dashboard">
          <Button variant="ghost" className="w-full justify-start gap-2 hover:bg-gray-700">
            <Calendar className="h-4 w-4" />
            Eventos
          </Button>
        </Link>

        <CreateOrUpdateEventDialog typeOfDialog="CREATE" />


        <Link to="/dashboard/tickets">
          <Button variant="ghost" className="w-full justify-start gap-2 hover:bg-gray-700">
            <Ticket className="h-4 w-4" />
            Meus Ingressos
          </Button>
        </Link>

        <Separator className="my-4 bg-gray-700" />

        <Link onClick={() => handleLogout()} to="/">
          <Button variant="ghost" className="w-full justify-start gap-2 hover:bg-gray-700">
            <Settings className="h-4 w-4" />
            Sair
          </Button>
        </Link>
      </nav>
    </aside>
  )
}