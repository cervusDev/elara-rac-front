export interface LoginData {
  cpf: string
  password: string
}

interface AuthResponse {
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}

export const authService = {
  async login(credentials: LoginData): Promise<AuthResponse> {
    const response = await fetch(import.meta.env.VITE_LOCAL_BASE_URL + '/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Erro ao fazer login')
    }

    return await response.json()
  }
}