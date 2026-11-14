export default function PacienteResumen({ pacientes }) {
  const activos = pacientes.filter((paciente) => paciente.estado === 'Activo').length
  const promedioEdad = pacientes.length ? pacientes.reduce((total, paciente) => total + Number(paciente.edad), 0) / pacientes.length : 0
  return (
    <section className="stat-grid" aria-label="Resumen de pacientes">
      <article className="stat-card"><span>Pacientes registrados</span><strong>{pacientes.length}</strong></article>
      <article className="stat-card"><span>Pacientes activos</span><strong>{activos}</strong></article>
      <article className="stat-card"><span>Edad promedio</span><strong>{promedioEdad.toFixed(1)} años</strong></article>
    </section>
  )
}
