import {
    LogOut,
    MenuIcon
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/hooks/auth.hook"

export const Header = () => {
    const navigate = useNavigate()
    const { handleLogout } = useAuth()
    return (
        <header className="flex items-center justify-between h-16 px-6 border-b border-gray-700 bg-gray-800">
            <div className="md:hidden">
                <Button variant="ghost" size="icon">
                    <MenuIcon className="h-5 w-5" />
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="gap-2 hover:bg-gray-700">
                            <span>Usuário</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700">
                        <DropdownMenuLabel className="text-gray-300">Minha Conta</DropdownMenuLabel>
                        <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700">
                            <Link to="/dashboard/profile" className="w-full">Perfil</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700">
                            <Link to="/" className="w-full">Sair</Link>
                        </DropdownMenuItem>
                        <Separator className="bg-gray-700" />
                        <DropdownMenuItem
                            className="text-red-400 hover:bg-gray-700 focus:bg-gray-700"
                            onClick={() => handleLogout()}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Sair
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}