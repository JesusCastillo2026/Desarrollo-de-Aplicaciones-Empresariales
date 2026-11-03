export default function PacienteTarjeta({ paciente, propietario }) {
  return (
    <article className="patient-card" data-paciente-id={paciente.id}>
      <div className={`pet-avatar pet-${paciente.especie.toLowerCase()}`} aria-hidden="true">{paciente.nombre.slice(0, 2).toUpperCase()}</div>
      <div className="patient-info">
        <div className="patient-title"><h3>{paciente.nombre}</h3><span className="patient-id">#{String(paciente.id).padStart(3, '0')}</span></div>
        <p>{paciente.raza || 'Sin raza'} · {paciente.edad ?? '—'} años</p>
        <span className="owner-name">Tutor: {propietario?.nombres ?? 'Sin asignar'} {propietario?.apellidos ?? ''}</span>
      </div>
      <div className="patient-weight"><strong>{Number(paciente.peso).toFixed(2)} <small>kg</small></strong><span>Peso actual</span></div>
    </article>
  )
}
