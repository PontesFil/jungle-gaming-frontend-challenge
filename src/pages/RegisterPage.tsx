
import { useState, type FormEvent } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Eye, EyeOff } from 'lucide-react'

import { useAuth } from '../contexts/AuthContext'
import AuthLayout from '../components/auth/AuthLayout'

const inputClass =
  'w-full rounded-sm border border-[#493025] bg-[#1a100d] px-4 py-3 font-mono text-xs text-[#f5eee7] outline-none transition placeholder:text-[#927057] focus:border-[#d9914d] focus:ring-1 focus:ring-[#d9914d]/30'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  
async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault()

  if (isLoading) return

  setError('')

  if (password.length < 6) {
    setError('A senha precisa ter pelo menos 6 caracteres.')
    return
  }

  if (password !== confirmPassword) {
    setError('As senhas não coincidem.')
    return
  }

  setIsLoading(true)

  try {
    const success = await register(name, email, password)

    if (!success) {
      setError('Não foi possível criar a conta. Verifique os dados ou tente outro e-mail.')
      return
    }

        await navigate({ to: '/' })
  } catch {
    setError('Ocorreu um erro inesperado. Tente novamente.')
  } finally {
    setIsLoading(false)
  }
}

return (
  <AuthLayout mode="register">
      <form
        onSubmit={handleSubmit}
        className="mt-7 space-y-3"
      >
        <div>
          <label htmlFor="name" className="sr-only">
            Nome
          </label>

          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Nome de usuário"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="email" className="sr-only">
            E-mail
          </label>

          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Digite seu e-mail"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            Senha
          </label>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Senha"
              required
              minLength={6}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={`${inputClass} pr-12`}
            />

            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={
                showPassword ? 'Ocultar senha' : 'Mostrar senha'
              }
              className="absolute inset-y-0 right-0 flex w-11 cursor-pointer items-center justify-center text-[#c9925d] transition hover:text-[#f5eee7]"
            >
              {showPassword ? (
                <EyeOff size={17} />
              ) : (
                <Eye size={17} />
              )}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="confirm-password" className="sr-only">
            Confirmar senha
          </label>

          <input
            id="confirm-password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="Confirmar senha"
            required
            minLength={6}
            value={confirmPassword}
            onChange={(event) =>
              setConfirmPassword(event.target.value)
            }
            className={inputClass}
          />
        </div>

        {error && (
          <p role="alert" className="text-xs text-red-300">
            {error}
          </p>
        )}

        
<button
  type="submit"
  disabled={isLoading}
  className="mt-5 w-full cursor-pointer rounded-sm bg-[#d9914d] px-5 py-3.5 font-mono text-xs font-extrabold text-[#1a100d] transition hover:bg-[#efaa67] disabled:cursor-not-allowed disabled:opacity-60"
>
  {isLoading ? 'Criando conta...' : 'Criar conta'}
</button>

      </form>
    </AuthLayout>
  )
}