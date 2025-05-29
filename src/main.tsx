import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import LoginPage from './app/login/page'

import { TicketPage } from './app/ticket'
import { DashboardPage } from './app/event'
import { DashboardLayout } from './components/layout'

import { MiddleWareProvider } from './provider/mid.provider'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <MiddleWareProvider>
        <LoginPage />
      </MiddleWareProvider>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <DashboardLayout />
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
      }
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
