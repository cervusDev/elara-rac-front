import type { JSX } from "react"
import { Navigate } from "react-router-dom"

export function GuardianProvider({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('authToken')
  
  if (!token) {
    return <Navigate to="/" replace />
  }
  
  return children
}