import { useState } from 'react'
import api from '../api.js'
import { errorMessage } from '../utils.js'
import usePacientesApi from '../hooks/usePacientesApi.js'
import PacienteFormularioApi from './PacienteFormularioApi.jsx'
import PacienteTablaApi from './PacienteTablaApi.jsx'
import PacienteResumenApi from './PacienteResumenApi.jsx'

export default function PanelPacientes() {
  const [busqueda, setBusqueda] = useState('')
  const [seleccionado, setSeleccionado] = useState(null)
  const [mensaje, setMensaje] = useState('')
  const [errorAccion, setErrorAccion] = useState('')
  const { pacientes, setPacientes, cargando, error } = usePacientesApi(busqueda)

  async function guardar(datos) {
    setErrorAccion('')
    try {
      if (seleccionado) {
        const { data } = await api.patch(`/pacientes/${seleccionado.id}/`, datos)
        setPacientes((actuales) => actuales.map((p) => p.id === data.id ? data : p))
        setMensaje(`Cambios guardados para ${data.nombre} (200).`)
        setSeleccionado(null)
      } else {
        const { data } = await api.post('/pacientes/', datos)
        setPacientes((actuales) => [data, ...actuales])
        setMensaje(`Paciente ${data.nombre} creado (201).`)
      }
    } catch (requestError) {
      setErrorAccion(errorMessage(requestError))
      throw requestError
    }
  }

  async function eliminar(paciente) {
    if (!window.confirm(`Confirma la eliminación de ${paciente.nombre}.`)) return
    setErrorAccion('')
    try {
      await api.delete(`/pacientes/${paciente.id}/`)
      setPacientes((actuales) => actuales.filter((p) => p.id !== paciente.id))
      if (seleccionado?.id === paciente.id) setSeleccionado(null)
      setMensaje('Paciente eliminado (204).')
    } catch (requestError) {
      if (requestError.response?.status === 404) {
        setPacientes((actuales) => actuales.filter((p) => p.id !== paciente.id))
        setMensaje('El registro ya no existe en el servidor (404).')
      } else setErrorAccion(errorMessage(requestError))
    }
  }

  return <section className="page">
    <p className="eyebrow">Parte 2 · Ejercicios 9-14</p>
    <h1 className="page-title">Panel de pacientes conectado</h1>
    <p className="page-lead">La administración utiliza los registros de Django. Crear, actualizar y eliminar persiste los cambios en SQLite; la búsqueda filtra desde el API.</p>
    {cargando ? <p className="card card-pad" role="status">Cargando pacientes…</p> : error ? <p className="error-message" role="alert">No se pudo cargar la lista. {error}</p> : <>
      <PacienteResumenApi pacientes={pacientes} />
      <PacienteFormularioApi seleccionado={seleccionado} onGuardar={guardar} onCancelar={() => setSeleccionado(null)} />
      <PacienteTablaApi pacientes={pacientes} busqueda={busqueda} onCambiarBusqueda={setBusqueda} onEditar={setSeleccionado} onEliminar={eliminar} />
    </>}
    {errorAccion && <p className="error-message" role="alert">{errorAccion}</p>}
    {mensaje && <p className="success-message" role="status">{mensaje}</p>}
    <p className="page-lead"><strong>Flujo:</strong> React → Axios → CORS → ViewSet y serializer → ORM/SQLite → JSON y código HTTP → estado React.</p>
  </section>
}
