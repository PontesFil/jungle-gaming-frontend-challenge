
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'
import axios from 'axios'
import { getDisplayNameError } from '../utils/displayName'

interface User {
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<boolean>
  logout: () => void
  updateDisplayName: (name: string) => Promise<void>
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem('kurio-user')
      return savedUser ? JSON.parse(savedUser) as User : null
    } catch {
      return null
    }
  })

  async function login(email: string, password: string): Promise<boolean> {
    try {
      const response = await axios.post<{ user: User }>(
        '/api/auth/login',
        { email, password }
      )

      const authenticatedUser = response.data.user

      setUser(authenticatedUser)
      localStorage.setItem(
        'kurio-user',
        JSON.stringify(authenticatedUser)
      )

      return true
    } catch {
      return false
    }
  }

  async function register(
    name: string,
    email: string,
    password: string
  ): Promise<boolean> {
    try {
      const response = await axios.post<{ user: User }>(
        '/api/auth/register',
        { name, email, password }
      )

      const newUser = response.data.user

      setUser(newUser)
      localStorage.setItem(
        'kurio-user',
        JSON.stringify(newUser)
      )

      return true
    } catch {
      return false
    }
  }

  async function updateDisplayName(name: string): Promise<void> {
    if (!user) {
      throw new Error('Faça login para editar seu nome.')
    }

    const validationError = getDisplayNameError(name)

    if (validationError) {
      throw new Error(validationError)
    }

    const response = await axios.patch<{ user: User }>(
      '/api/auth/me',
      { name: name.trim() },
    )

    const savedUser = localStorage.getItem('kurio-user')
    const currentUser = savedUser ? JSON.parse(savedUser) as User : null

    if (currentUser?.email !== user.email) {
      throw new Error('A sessão mudou. Faça login novamente.')
    }

    const updatedUser = { ...user, name: response.data.user.name }

    localStorage.setItem('kurio-user', JSON.stringify(updatedUser))
    setUser(updatedUser)
  }

  async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
    if (!user) {
      throw new Error('Faça login para alterar sua senha.')
    }

    await axios.patch('/api/auth/password', { currentPassword, newPassword })
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('kurio-user')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateDisplayName, changePassword }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }

  return context
}
