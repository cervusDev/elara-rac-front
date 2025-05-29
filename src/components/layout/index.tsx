import { Header } from "./header"
import { SideBar } from "./sidebar"
import { Outlet } from "react-router-dom"

export function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <SideBar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto p-6 bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  )
}