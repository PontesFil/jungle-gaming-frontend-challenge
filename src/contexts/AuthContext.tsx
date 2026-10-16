import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'

interface User {
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => boolean
  register: (name: string, email: string, password: string) => boolean
  logout: () => void
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

  function login(email: string, password: string) {
    if (!email.trim() || !password.trim()) return false

    const authenticatedUser = {
      name: email.split('@')[0],
      email,
    }

    setUser(authenticatedUser)
    localStorage.setItem('kurio-user', JSON.stringify(authenticatedUser))

    return true
  }

  function register(name: string, email: string, password: string) {
    if (!name.trim() || !email.trim() || !password.trim()) return false

    const newUser = { name, email }

    setUser(newUser)
    localStorage.setItem('kurio-user', JSON.stringify(newUser))

    return true
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('kurio-user')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
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