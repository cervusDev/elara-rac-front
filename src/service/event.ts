export interface EventResponse {
  id: number
  date: string
  time: string
  value: string
  title: string
  banner: string
  address: string
  createdAt: string
  participants: number
  maxParticipants: number
}

export interface EventFilters {
  id?: string;
  title?: string;
  date?: string;
}


export interface CreateEventPayload {
  date: string
  time: string
  value: number
  title: string
  banner: string
  address: string
  maxParticipants: number
}

export const eventService = {
  async getAllEvents(): Promise<EventResponse[]> {
    const token = localStorage.getItem("authToken")

    const response = await fetch(import.meta.env.VITE_LOCAL_BASE_URL + "/events", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Erro ao buscar eventos")
    }

    return await response.json()
  },

  async fetchCreateEvent(data: CreateEventPayload): Promise<EventResponse> {
    const token = localStorage.getItem("authToken")

    const response = await fetch(import.meta.env.VITE_LOCAL_BASE_URL + "/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Erro ao criar evento")
    }

    return await response.json()
  },

  async fetchUpdateEvent(id: number, data: any): Promise<EventResponse> {
    const token = localStorage.getItem("authToken")

    const response = await fetch(import.meta.env.VITE_LOCAL_BASE_URL + `/event/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Erro ao criar evento")
    }

    return await response.json()
  },

  async fetchDeleteEvent(id: number): Promise<void> {
    const token = localStorage.getItem("authToken")

    const response = await fetch(import.meta.env.VITE_LOCAL_BASE_URL + `/event/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Erro ao criar evento")
    }

  },

  async fetchEventsWithFilter(filters: EventFilters): Promise<EventResponse[]> {
    const params = new URLSearchParams();
    const token = localStorage.getItem('authToken');

    if (filters.id) params.append('id', filters.id);
    if (filters.date) params.append('date', filters.date);
    if (filters.title) params.append('title', filters.title);

    const url = `http://localhost:3000/events/filter?${params.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar eventos filtrados');
    }

    return response.json();
  },
}
