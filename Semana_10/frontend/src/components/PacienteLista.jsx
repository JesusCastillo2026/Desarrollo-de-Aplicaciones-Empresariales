import { useMemo, useState } from 'react'
import PacienteTarjeta from './PacienteTarjeta.jsx'

export default function PacienteLista({ pacientes = [], propietarios = [] }) {
  const [busqueda, setBusqueda] = useState('')
  const propietariosPorId = useMemo(() => Object.fromEntries(propietarios.map((propietario) => [propietario.id, propietario])), [propietarios])
  const visibles = useMemo(() => pacientes.filter((paciente) =>
    paciente.nombre.toLocaleLowerCase('es').includes(busqueda.trim().toLocaleLowerCase('es')),
  ), [pacientes, busqueda])

  return (
    <>
      <div className="component-toolbar">
        <label className="search-box">
          <span aria-hidden="true">⌕</span>
          <input type="search" value={busqueda} onChange={(event) => setBusqueda(event.target.value)} placeholder="Buscar por nombre" aria-label="Buscar paciente por nombre" />
        </label>
        <span className="count-pill">{visibles.length} pacientes</span>
      </div>
      <div className="patient-grid">
        {visibles.length ? visibles.map((paciente) => (
          <PacienteTarjeta key={paciente.id} paciente={paciente} propietario={propietariosPorId[paciente.propietario]} />
        )) : <div className="empty-state"><strong>No hay registros</strong><p>Prueba con otro nombre.</p></div>}
      </div>
    </>
  )
}
