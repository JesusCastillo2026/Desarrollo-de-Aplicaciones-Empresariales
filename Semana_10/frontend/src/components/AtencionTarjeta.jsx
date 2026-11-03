function DetalleAtencion({ atencion }) {
  return (
    <div className="attention-item" key={atencion.id}>
      <div className="attention-date"><strong>{new Date(`${atencion.fecha_realizacion}T12:00:00`).toLocaleDateString('es-PE', { day: '2-digit', month: 'short' })}</strong><span>{atencion.estado === 'PAGADO' ? 'Confirmada' : 'Pendiente'}</span></div>
      <div className="attention-detail"><strong>{atencion.servicio.nombre}</strong><span>{atencion.servicio.duracion_minutos} min · S/ {Number(atencion.monto).toFixed(2)}</span></div>
      <span className={`state-dot ${atencion.estado === 'PAGADO' ? 'paid' : 'pending'}`} aria-hidden="true" />
    </div>
  )
}

export default function AtencionTarjeta({ paciente, atenciones = [] }) {
  const total = atenciones.reduce((suma, atencion) => suma + Number(atencion.monto), 0)
  return (
    <article className="attention-card" data-paciente-id={paciente.id}>
      <header className="attention-patient">
        <div className="mini-pet-avatar" aria-hidden="true">{paciente.nombre.slice(0, 2).toUpperCase()}</div>
        <div><h3>{paciente.nombre}</h3><p>{paciente.propietario?.nombres} {paciente.propietario?.apellidos}</p></div>
        <span className="attention-count">{atenciones.length}</span>
      </header>
      <div className="attention-items">
        {atenciones.length ? atenciones.map((atencion) => <DetalleAtencion key={atencion.id} atencion={atencion} />) : <p className="no-appointments">Sin atenciones registradas.</p>}
        {atenciones.length > 0 && <p className="appointment-total">Total de atenciones: S/ {total.toFixed(2)}</p>}
      </div>
    </article>
  )
}
