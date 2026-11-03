import Tarjeta from './Tarjeta.jsx'

function VeterinarioTarjeta({ veterinario }) {
  const initials = veterinario.nombre_completo.split(' ').slice(-2).map((word) => word[0]).join('')
  return <article className="team-member"><div className="doctor-avatar" aria-hidden="true">{initials}</div><div><h3>{veterinario.nombre_completo}</h3><p>{veterinario.especialidad}</p><span>{veterinario.colegiatura}</span></div><span className="online-dot" aria-label="Disponible" /></article>
}

export default function VeterinarioLista({ veterinarios = [] }) {
  return <Tarjeta titulo="Equipo médico" className="team-panel"><div className="team-list">
    {veterinarios.map((veterinario) => <VeterinarioTarjeta key={veterinario.id} veterinario={veterinario} />)}
  </div></Tarjeta>
}
