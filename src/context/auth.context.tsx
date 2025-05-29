import React from 'react'
import { useNavigate } from "react-router-dom"

type SetState<T> = React.Dispatch<React.SetStateAction<T>>

interface User {
  id: number
  name: string
  email: string
}

interface AuthContextType {
  user: User
  isLoadingLogin: boolean
  isAuthenticated: boolean
  handleLogout: () => void
  setIsLoadingLogin: SetState<boolean>
}

export const AuthContext = React.createContext<AuthContextType>({} as AuthContextType)

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = React.useState<User>()
  const [isLoadingLogin, setIsLoadingLogin] = React.useState<boolean>(false)
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false)

  React.useEffect(() => {
    const token = localStorage.getItem('authToken')
    const userData = localStorage.getItem('userData')

    if (token && userData) {
      setUser(JSON.parse(userData))
      setIsAuthenticated(!!token)
    }

    setIsLoadingLogin(false)
  }, [])

  const handleLogout = () => {
    try {
      localStorage.removeItem('authToken')
      localStorage.removeItem('userData')

      if (localStorage.getItem('authToken') || localStorage.getItem('userData')) {
        throw new Error('Falha ao limpar localStorage')
      }

      window.dispatchEvent(new Event('storage'))

      navigate('/', { replace: true })

      setTimeout(() => window.location.reload(), 100)

    } catch (error) {
      localStorage.clear()
      window.location.href = '/'
    }
  }


  const value = {
    user,
    handleLogout,
    isLoadingLogin,
    isAuthenticated,
    setIsLoadingLogin,
  } as AuthContextType

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
