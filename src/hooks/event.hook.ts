import { eventService } from "@/service/event.service"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateEvent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: eventService.fetchCreateEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  })
}

export const useUpdateEvent = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => eventService.fetchUpdateEvent(id, data),
    onSuccess: (updatedEvent) => {
      queryClient.setQueryData(["event", updatedEvent.id], updatedEvent);
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (error) => {
      console.error("Erro ao atualizar o evento:", error);
    },
  });
};

export const useDeleteEvent = (id:number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => eventService.fetchDeleteEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (error) => {
      console.log("Erro ao deletar o evento:", error);
      alert(error);
    },
  })
}

interface Filters {
  id?: string;
  date?: string;
  title?: string;
}

export const useFilteredEvents = (filters: Filters) => {
  return useQuery({
    queryKey: ['events'],
    queryFn: () => eventService.fetchEventsWithFilter(filters),
    enabled: false,
  });
};
