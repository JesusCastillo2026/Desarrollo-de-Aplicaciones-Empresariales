import PacienteFila from './PacienteFila.jsx'

export default function PacienteListado({ pacientes, busqueda, onCambiarBusqueda, onEliminar, onAlternarEstado }) {
  return (
    <section className="card card-pad">
      <div className="section-heading" style={{ marginTop: 0 }}><div><h2>Listado de pacientes</h2><p>Filtra por nombre, propietario o especie.</p></div></div>
      <div className="toolbar"><label className="search-field"><span aria-hidden="true">⌕</span><input type="search" value={busqueda} onChange={(event) => onCambiarBusqueda(event.target.value)} placeholder="Buscar paciente…" aria-label="Buscar pacientes" /></label><span className="pill">{pacientes.length} resultados</span></div>
      {pacientes.length === 0 ? <p className="empty">No hay pacientes que coincidan con la búsqueda.</p> : <div className="table-wrap"><table className="patient-table"><thead><tr><th>Paciente</th><th>Especie</th><th>Edad</th><th>Peso</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>{pacientes.map((paciente) => <PacienteFila key={paciente.id} paciente={paciente} onEliminar={onEliminar} onAlternarEstado={onAlternarEstado} />)}</tbody></table></div>}
    </section>
  )
}
