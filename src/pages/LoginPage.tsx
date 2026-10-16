import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { useAuth } from '../contexts/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
    <main className="min-h-screen bg-[#140e0c] px-6 py-12 text-white">
      <section className="mx-auto max-w-md rounded-xl border border-white/10 bg-[#211714] p-8">
        <h1 className="mb-6 text-3xl font-bold text-orange-400">
          Entrar na Kurio
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-white/20 bg-[#140e0c] p-3 text-white"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block">
              Senha
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-white/20 bg-[#140e0c] p-3 text-white"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-orange-500 py-3 font-bold text-black"
          >
            Entrar
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/60">
          Ainda não tem conta?{' '}
          <Link to="/register"        className="text-orange-400 underline">
            Criar conta
          </Link>
        </p>
      </section>
    </main>
  )
}