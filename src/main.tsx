import './index.css'
import React from 'react'
import { routerApp } from './router'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routerApp} />
    </QueryClientProvider>
  </React.StrictMode>
)
