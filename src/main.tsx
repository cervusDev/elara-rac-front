import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import LoginPage from './app/auth.app'

import { TicketPage } from './app/ticket.app'
import { DashboardPage } from './app/event.app'
import { DashboardLayout } from './components/layout'
import { AuthContextProvider } from './context/auth.context'

import { MiddleWareProvider } from './provider/mid.provider'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

const router = createBrowserRouter([
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

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
