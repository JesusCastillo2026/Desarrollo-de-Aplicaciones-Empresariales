import PacienteFilaApi from './PacienteFilaApi.jsx'

export default function PacienteTablaApi({ pacientes, busqueda, onCambiarBusqueda, onEditar, onEliminar }) {
  return (
    <section className="card card-pad">
      <div className="section-heading"><div><h2>Pacientes de la API</h2><p>El texto se envía al parámetro <code>search</code> de Django.</p></div></div>
      <div className="toolbar">
        <label className="search-field"><span aria-hidden="true">⌕</span><input type="search" value={busqueda} onChange={(event) => onCambiarBusqueda(event.target.value)} placeholder="Buscar nombre, especie o raza…" aria-label="Buscar pacientes en la API" /></label>
        <span className="pill">{pacientes.length} resultados</span>
      </div>
      {pacientes.length === 0 ? <p className="empty">No hay pacientes que coincidan con la búsqueda.</p> : <div className="table-wrap"><table className="patient-table"><thead><tr><th>Paciente</th><th>Especie y raza</th><th>Edad</th><th>Peso</th><th>Acciones</th></tr></thead><tbody>{pacientes.map((paciente) => <PacienteFilaApi key={paciente.id} paciente={paciente} onEditar={onEditar} onEliminar={onEliminar} />)}</tbody></table></div>}
    </section>
  )
}
