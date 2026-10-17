export function getDisplayNameError(name: unknown): string | null {
  if (typeof name !== 'string' || !name.trim()) {
    return 'Informe seu nome de exibição.'
  }

  const trimmedName = name.trim()

  if (
    trimmedName.length < 2 ||
    trimmedName.length > 80 ||
    !/[\p{L}\p{N}]/u.test(trimmedName) ||
    /\p{Cc}/u.test(name)
  ) {
    return 'Use de 2 a 80 caracteres, com ao menos uma letra ou número e sem caracteres de controle.'
  }

  return null
}
