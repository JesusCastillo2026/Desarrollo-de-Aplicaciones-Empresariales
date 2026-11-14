export default function PacienteResumenApi({ pacientes }) {
  const pesoMedio = pacientes.length
    ? pacientes.reduce((suma, paciente) => suma + Number(paciente.peso), 0) / pacientes.length
    : 0
  return <div className="stat-grid"><article className="stat-card"><span>Pacientes visibles</span><strong>{pacientes.length}</strong></article><article className="stat-card"><span>Peso promedio</span><strong>{pesoMedio.toFixed(2)} kg</strong></article></div>
}
