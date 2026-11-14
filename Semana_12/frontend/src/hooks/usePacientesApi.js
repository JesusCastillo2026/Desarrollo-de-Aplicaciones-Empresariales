import { useEffect, useState } from 'react'
import axios from 'axios'
import api from '../api.js'
import { adaptPaciente, errorMessage } from '../utils.js'

export default function usePacientesApi(busqueda) {
  const [pacientes, setPacientes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    async function cargar() {
      setCargando(true)
      setError('')
      try {
        const { data } = await api.get('/pacientes/', {
          params: busqueda.trim() ? { search: busqueda.trim() } : {},
          signal: controller.signal,
        })
        setPacientes(data.map(adaptPaciente))
      } catch (requestError) {
        if (!axios.isCancel(requestError)) {
          setError(errorMessage(requestError))
          setPacientes([])
        }
      } finally {
        if (!controller.signal.aborted) setCargando(false)
      }
    }
    cargar()
    return () => controller.abort()
  }, [busqueda])

  return { pacientes, setPacientes, cargando, error }
}
