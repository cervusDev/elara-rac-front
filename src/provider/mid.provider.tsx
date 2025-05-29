import type { JSX } from "react"
import { AuthContextProvider } from "@/context/auth.context"
import { GuardianProvider } from "@/components/auth/navigate"

export const MiddleWareProvider = ({ children }: { children: JSX.Element }) => {
    return (
        <AuthContextProvider>
            <GuardianProvider>
                {children}
            </GuardianProvider>
        </AuthContextProvider>
    )
}