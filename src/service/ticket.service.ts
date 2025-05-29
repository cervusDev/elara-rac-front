import type { EventResponse } from "./event"

export interface Ticket {
    id: number
    userId: number
    status: string
    eventId: number
    createdAt: string
    event: EventResponse
}

export interface GetTicketResponse {
    used: Ticket[]
    available: Ticket[]
}

export interface CreateTicketProps {
    userId: number 
    eventId: number 
    numberOfTickets: number
}

export const ticketService = {
    async buyTicket(payload: CreateTicketProps): Promise<Ticket> {
        const token = localStorage.getItem('authToken')

        const response = await fetch(import.meta.env.VITE_LOCAL_BASE_URL + '/ticket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || 'Erro ao comprar ingresso')
        }

        return await response.json()
    },

    async getTicketsByUser(userId: number): Promise<GetTicketResponse> {
        const token = localStorage.getItem('authToken')

        const response = await fetch(import.meta.env.VITE_LOCAL_BASE_URL + `/tickets/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || 'Erro ao buscar ingressos')
        }

        return await response.json()
    }
}
