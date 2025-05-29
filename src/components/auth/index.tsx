import { useAuth } from '@/hooks/auth.hook'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'
import { authService, type LoginData } from '@/service/auth'

export function EnhancedLoginForm() {
  const navigate = useNavigate()
  const { setIsLoadingLogin, isLoadingLogin } = useAuth()

    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault()
      setIsLoadingLogin(true)
  
      console.log('caiu aqui')
  
      const formData = new FormData(e.target as HTMLFormElement)
  
      const payload = {} as Record<string, any>
      for (const [key, value] of formData.entries()) {
        payload[`${key}`] = value
      }
  
      try {
  
        const { token, user } = await authService.login(payload as LoginData)
        localStorage.setItem('authToken', token)
        localStorage.setItem('userData', JSON.stringify(user))
  
        navigate('/dashboard')
  
      } catch (error) { } finally {
        setIsLoadingLogin(false)
      }
    }
  

  return (
    <div className="mx-auto max-w-sm space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Elara</h1>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">CPF</Label>
            <Input
              id="cpf"
              name="cpf"
              type="cpf"
              required
              disabled={isLoadingLogin}
              className="focus-visible:ring-2 focus-visible:ring-primary/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              disabled={isLoadingLogin}
              className="focus-visible:ring-2 focus-visible:ring-primary/50"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-black text-white hover:bg-gray-800"
          disabled={isLoadingLogin}
        >
          {isLoadingLogin ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>
    </div>
  );
}