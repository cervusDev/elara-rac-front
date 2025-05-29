import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ticketService, type CreateTicketProps, type GetTicketResponse } from '@/service/ticket'

export const useTicketsQuery = (userId: number) => {
  return useQuery<GetTicketResponse>({
    queryKey: ['tickets', userId],
    queryFn: () => ticketService.getTicketsByUser(userId),
    enabled: !!userId,
  })
}

export const useBuyTicketMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateTicketProps) =>
      ticketService.buyTicket(payload),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
      queryClient.invalidateQueries({ queryKey: ['tickets', userId] })
       alert(`Ingresso comprado com sucesso"`)
    },
    onError: (err: any) => {
      alert(err)
    }
  })
}
