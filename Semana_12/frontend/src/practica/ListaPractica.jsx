import { useState } from 'react'
import api from '../api.js'
import { errorMessage } from '../utils.js'
import usePacientesApi from '../hooks/usePacientesApi.js'
import PacienteFormularioApi from '../components/PacienteFormularioApi.jsx'
import PacienteTablaApi from '../components/PacienteTablaApi.jsx'

export default function ListaPractica() {
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
        setMensaje(`Paciente ${data.nombre} actualizado (200).`)
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
    if (!window.confirm(`¿Eliminar a ${paciente.nombre}?`)) return
    setErrorAccion('')
    try {
      await api.delete(`/pacientes/${paciente.id}/`)
      setPacientes((actuales) => actuales.filter((p) => p.id !== paciente.id))
      setMensaje('Paciente eliminado (204).')
    } catch (requestError) {
      if (requestError.response?.status === 404) {
        setPacientes((actuales) => actuales.filter((p) => p.id !== paciente.id))
        setMensaje('El paciente ya no existe en el servidor (404).')
      } else setErrorAccion(errorMessage(requestError))
    }
  }

  return <section className="page">
    <p className="eyebrow">Parte 1 · Ejercicios 1-8</p>
    <h1 className="page-title">Solicitudes AJAX al recurso pacientes</h1>
    <p className="page-lead">Consulta el ViewSet de Django, busca en el servidor y realiza altas, ediciones y eliminaciones con respuestas HTTP reales.</p>
    <div className="stat-grid"><article className="stat-card"><span>GET</span><strong>/api/pacientes/</strong></article><article className="stat-card"><span>POST</span><strong>201 · crear</strong></article><article className="stat-card"><span>PATCH</span><strong>200 · editar</strong></article><article className="stat-card"><span>DELETE</span><strong>204 · eliminar</strong></article></div>
    {cargando ? <p className="card card-pad" role="status">Cargando datos desde Django…</p> : error ? <p className="error-message" role="alert">No se pudo consultar la API. {error}</p> : <>
      <PacienteFormularioApi seleccionado={seleccionado} onGuardar={guardar} onCancelar={() => setSeleccionado(null)} />
      <PacienteTablaApi pacientes={pacientes} busqueda={busqueda} onCambiarBusqueda={setBusqueda} onEditar={setSeleccionado} onEliminar={eliminar} />
    </>}
    {errorAccion && <p className="error-message" role="alert">{errorAccion}</p>}
    {mensaje && <p className="success-message" role="status">{mensaje}</p>}
  </section>
}
