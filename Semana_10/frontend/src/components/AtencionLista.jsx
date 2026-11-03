import AtencionTarjeta from './AtencionTarjeta.jsx'

export default function AtencionLista({ pacientes = [], atenciones = [] }) {
  const grupos = pacientes.map((paciente) => ({
    ...paciente,
    atenciones: atenciones.filter((atencion) => atencion.paciente.id === paciente.id),
  }))
  return <div className="attention-grid">
    {grupos.map((paciente) => <AtencionTarjeta key={paciente.id} paciente={paciente} atenciones={paciente.atenciones} />)}
  </div>
}
