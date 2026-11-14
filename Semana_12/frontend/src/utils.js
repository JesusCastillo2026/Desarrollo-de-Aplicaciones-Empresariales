export function errorMessage(error) {
  const data = error?.response?.data
  if (!data) return 'No se pudo conectar con Django. Verifica que el servidor esté activo.'
  if (typeof data === 'string') return data
  return Object.entries(data)
    .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(' ') : messages}`)
    .join(' ')
}

export function adaptPaciente(paciente) {
  return { ...paciente, peso: String(paciente.peso), edad: Number(paciente.edad) }
}
