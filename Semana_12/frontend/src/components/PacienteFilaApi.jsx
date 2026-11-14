export default function PacienteFilaApi({ paciente, onEditar, onEliminar }) {
  return (
    <tr>
      <td><span className="patient-name">{paciente.nombre}</span><span className="patient-sub">ID {paciente.id} · propietario #{paciente.propietario}</span></td>
      <td>{paciente.especie}<span className="patient-sub">{paciente.raza}</span></td>
      <td>{paciente.edad} años</td>
      <td>{Number(paciente.peso).toFixed(2)} kg</td>
      <td><div className="row-actions"><button className="button secondary small" type="button" onClick={() => onEditar(paciente)}>Editar</button><button className="button danger small" type="button" onClick={() => onEliminar(paciente)}>Eliminar</button></div></td>
    </tr>
  )
}
