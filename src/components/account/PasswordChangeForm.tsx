import { useState, type FormEvent } from 'react'
import axios from 'axios'
import { useAuth } from '../../contexts/AuthContext'

type PasswordField = 'currentPassword' | 'newPassword' | 'confirmation'

interface PasswordError {
  message: string
  field?: PasswordField
}

const inputClass =
  'w-full rounded-sm border border-[#493025] bg-[#170f0c] px-4 py-3 font-mono text-xs text-[#f5eee7] focus:border-[#d9914d]'

const labelClass = 'mb-2 block font-mono text-xs text-[#d9c6b6]'

export default function PasswordChangeForm() {
  const { changePassword } = useAuth()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [error, setError] = useState<PasswordError | null>(null)
  const [success, setSuccess] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSaving) return

    setError(null)
    setSuccess('')

    if (!currentPassword) {
      setError({ field: 'currentPassword', message: 'Informe a senha atual.' })
      return
    }

    if (newPassword.length < 6) {
      setError({ field: 'newPassword', message: 'A nova senha precisa ter pelo menos 6 caracteres.' })
      return
    }

    if (newPassword !== confirmation) {
      setError({ field: 'confirmation', message: 'As senhas não coincidem.' })
      return
    }

    setIsSaving(true)

    try {
      await changePassword(currentPassword, newPassword)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmation('')
      setSuccess('Senha alterada com sucesso.')
    } catch (cause) {
      const response = axios.isAxiosError<{ message?: unknown }>(cause)
        ? cause.response
        : undefined

      setError({
        field: response?.status === 403 ? 'currentPassword' : undefined,
        message: typeof response?.data?.message === 'string'
          ? response.data.message
          : 'Não foi possível alterar a senha. Tente novamente.',
      })
    } finally {
      setIsSaving(false)
    }
  }

  function clearFeedback() {
    setError(null)
    setSuccess('')
  }

  return (
    <form
      aria-label="Alterar senha"
      aria-busy={isSaving}
      onSubmit={handleSubmit}
      onChange={clearFeedback}
      noValidate
      className="mt-5 max-w-md"
    >
      <fieldset disabled={isSaving} className="space-y-4">
        <legend className="mb-4 font-mono text-sm font-bold">Alterar senha</legend>

        <div>
          <label htmlFor="current-password" className={labelClass}>Senha atual</label>
          <input
            id="current-password"
            type="password"
            autoComplete="current-password"
            required
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            aria-invalid={error?.field === 'currentPassword'}
            aria-describedby={error?.field === 'currentPassword' ? 'password-error' : undefined}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="new-password" className={labelClass}>Nova senha</label>
          <input
            id="new-password"
            type="password"
            autoComplete="new-password"
            required
            minLength={6}
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            aria-invalid={error?.field === 'newPassword'}
            aria-describedby={error?.field === 'newPassword' ? 'password-error' : undefined}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="password-confirmation" className={labelClass}>Confirmar nova senha</label>
          <input
            id="password-confirmation"
            type="password"
            autoComplete="new-password"
            required
            minLength={6}
            value={confirmation}
            onChange={(event) => setConfirmation(event.target.value)}
            aria-invalid={error?.field === 'confirmation'}
            aria-describedby={error?.field === 'confirmation' ? 'password-error' : undefined}
            className={inputClass}
          />
        </div>

        {error && (
          <p id="password-error" role="alert" className="text-xs text-red-300">{error.message}</p>
        )}

        {success && (
          <p role="status" className="text-xs text-[#d9c6b6]">{success}</p>
        )}

        <button
          type="submit"
          disabled={isSaving}
          className="rounded-sm bg-[#d9914d] px-5 py-3 font-mono text-xs font-extrabold text-[#1a100d] transition hover:bg-[#efaa67] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? 'Alterando senha...' : 'Alterar senha'}
        </button>
      </fieldset>
    </form>
  )
}
