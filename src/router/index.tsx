import LoginPage from "@/app/auth.app"
import { TicketPage } from "@/app/ticket.app"
import { DashboardPage } from "@/app/event.app"

import { DashboardLayout } from "@/components/layout"
import { createBrowserRouter } from "react-router-dom"
import { AuthContextProvider } from "@/context/auth.context"

import { MiddleWareProvider } from "@/provider/mid.provider"

export const routerApp = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthContextProvider>
        <LoginPage />
      </AuthContextProvider>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <MiddleWareProvider>
        <DashboardLayout />
      </MiddleWareProvider>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <MiddleWareProvider>
            <DashboardPage />
          </MiddleWareProvider>
        ),
      },
      {
        path: "/dashboard/tickets",
        element: (
          <MiddleWareProvider>
            <TicketPage />
          </MiddleWareProvider>
        ),
      },
    ]
  }
])