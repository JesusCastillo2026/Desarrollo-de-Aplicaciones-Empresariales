export default function PacienteFila({ paciente, onEliminar, onAlternarEstado }) {
  const inactivo = paciente.estado === 'Inactivo'
  return (
    <tr>
      <td><span className="patient-name">{paciente.nombre}</span><span className="patient-sub">Tutor: {paciente.propietario}</span></td>
      <td>{paciente.especie}</td><td>{paciente.edad} años</td><td>{Number(paciente.peso).toFixed(2)} kg</td>
      <td><span className={`status ${inactivo ? 'inactive' : ''}`}>{paciente.estado}</span></td>
      <td><div style={{ display: 'flex', gap: 6 }}><button className="button secondary small" type="button" onClick={() => onAlternarEstado(paciente.id)}>{inactivo ? 'Activar' : 'Desactivar'}</button><button className="button danger small" type="button" onClick={() => onEliminar(paciente.id)}>Eliminar</button></div></td>
    </tr>
  )
}
