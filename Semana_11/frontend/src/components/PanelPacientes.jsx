import { useEffect, useState } from 'react'
import PacienteListado from './PacienteListado.jsx'
import PacienteFormularioAlta from './PacienteFormularioAlta.jsx'
import PacienteResumen from './PacienteResumen.jsx'

const iniciales = [
  { id: 1, nombre: 'Luna', propietario: 'María Rojas', especie: 'Perro', edad: 4, peso: '12.50', estado: 'Activo' },
  { id: 2, nombre: 'Coco', propietario: 'Luis Paredes', especie: 'Gato', edad: 2, peso: '4.20', estado: 'Activo' },
  { id: 3, nombre: 'Nala', propietario: 'Ana Torres', especie: 'Perro', edad: 6, peso: '18.00', estado: 'En observación' },
  { id: 4, nombre: 'Milo', propietario: 'José Vega', especie: 'Gato', edad: 1, peso: '3.80', estado: 'Activo' },
  { id: 5, nombre: 'Max', propietario: 'Carmen Díaz', especie: 'Perro', edad: 8, peso: '21.30', estado: 'Inactivo' },
]

export default function PanelPacientes() {
  const [pacientes, setPacientes] = useState(iniciales)
  const [busqueda, setBusqueda] = useState('')
  const [mensaje, setMensaje] = useState('')
  const pacientesVisibles = pacientes.filter((paciente) => `${paciente.nombre} ${paciente.propietario} ${paciente.especie}`.toLowerCase().includes(busqueda.toLowerCase()))

  useEffect(() => {
    document.title = `Panel de pacientes (${pacientes.length}) — Clínica VetCare`
  }, [pacientes.length])

  const guardarPaciente = (nuevo) => {
    setPacientes((actuales) => [{ ...nuevo, id: Math.max(0, ...actuales.map((paciente) => paciente.id)) + 1 }, ...actuales])
    setMensaje(`Se registró a ${nuevo.nombre}.`)
  }
  const eliminarPaciente = (id) => setPacientes((actuales) => actuales.filter((paciente) => paciente.id !== id))
  const alternarEstado = (id) => setPacientes((actuales) => actuales.map((paciente) => paciente.id === id ? { ...paciente, estado: paciente.estado === 'Inactivo' ? 'Activo' : 'Inactivo' } : paciente))

  return (
    <section className="page">
      <p className="eyebrow">Parte 2 · Ejercicios 9–14</p>
      <h1 className="page-title">Panel administrativo de pacientes</h1>
      <p className="page-lead">El panel conserva una única fuente de verdad en este componente padre. Listado, formulario y resumen reciben datos y funciones mediante props.</p>
      <PacienteResumen pacientes={pacientes} />
      <PacienteFormularioAlta onGuardar={guardarPaciente} />
      <PacienteListado pacientes={pacientesVisibles} busqueda={busqueda} onCambiarBusqueda={setBusqueda} onEliminar={eliminarPaciente} onAlternarEstado={alternarEstado} />
      {mensaje && <p className="success-message" role="status">{mensaje}</p>}
      <p className="page-lead"><strong>Árbol:</strong> PanelPacientes → (PacienteResumen, PacienteFormularioAlta, PacienteListado → PacienteFila). Los registros y el texto bajan por props; guardar, eliminar, cambiar estado y buscar suben al padre mediante funciones.</p>
    </section>
  )
}
