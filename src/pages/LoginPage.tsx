
import { useState, type FormEvent } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Eye, EyeOff } from 'lucide-react'

import { useAuth } from '../contexts/AuthContext'
import AuthLayout from '../components/auth/AuthLayout'

const inputClass =
  'w-full rounded-sm border border-[#493025] bg-[#1a100d] px-4 py-3 font-mono text-xs text-[#f5eee7] outline-none transition placeholder:text-[#927057] focus:border-[#d9914d] focus:ring-1 focus:ring-[#d9914d]/30'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    const success = login(email, password)

    if (!success) {
      setError('Preencha seu e-mail e senha.')
      return
    }

    navigate({ to: '/' })
  }

  return (
    <AuthLayout mode="login">
      <form
        onSubmit={handleSubmit}
        className="mt-7 space-y-3"
      >
        <div>
          <label htmlFor="email" className="sr-only">
            E-mail
          </label>

          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="contato@email.com"
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
              autoComplete="current-password"
              placeholder="Senha"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={`${inputClass} pr-12`}
            />

            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={
  showPassword
    ? 'Ocultar conteúdo do campo'
    : 'Exibir conteúdo do campo'
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

        {error && (
          <p role="alert" className="text-xs text-red-300">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="mt-5 w-full cursor-pointer rounded-sm bg-[#d9914d] px-5 py-3.5 font-mono text-xs font-extrabold text-[#1a100d] transition hover:bg-[#efaa67]"
        >
          Entrar
        </button>
      </form>
    </AuthLayout>
  )
}
