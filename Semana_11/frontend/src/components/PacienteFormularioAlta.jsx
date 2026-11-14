import { useState } from 'react'

const vacio = { nombre: '', propietario: '', especie: 'Perro', edad: '', peso: '' }

export default function PacienteFormularioAlta({ onGuardar }) {
  const [formulario, setFormulario] = useState(vacio)
  const [error, setError] = useState('')
  const actualizar = (event) => setFormulario((actual) => ({ ...actual, [event.target.name]: event.target.value }))

  const enviar = (event) => {
    event.preventDefault()
    const edad = Number(formulario.edad)
    const peso = Number(formulario.peso)
    if (!formulario.nombre.trim() || !formulario.propietario.trim()) return setError('Completa el nombre del paciente y de su propietario.')
    if (!Number.isInteger(edad) || edad < 0) return setError('La edad debe ser un número entero igual o mayor que cero.')
    if (!Number.isFinite(peso) || peso <= 0) return setError('El peso debe ser un número mayor que cero.')
    onGuardar({ ...formulario, nombre: formulario.nombre.trim(), propietario: formulario.propietario.trim(), edad, peso: peso.toFixed(2), estado: 'Activo' })
    setFormulario(vacio)
    setError('')
  }

  return (
    <section className="card card-pad" style={{ marginBottom: 20 }}>
      <div className="section-heading" style={{ marginTop: 0 }}><div><h2>Registrar paciente</h2><p>Formulario controlado; valida antes de avisar al componente padre.</p></div></div>
      <form onSubmit={enviar} noValidate>
        <div className="form-grid">
          <div className="field"><label htmlFor="nombre">Nombre del paciente *</label><input id="nombre" name="nombre" value={formulario.nombre} onChange={actualizar} placeholder="Ej. Kira" /></div>
          <div className="field"><label htmlFor="propietario">Propietario *</label><input id="propietario" name="propietario" value={formulario.propietario} onChange={actualizar} placeholder="Nombre del tutor" /></div>
          <div className="field"><label htmlFor="especie">Especie</label><select id="especie" name="especie" value={formulario.especie} onChange={actualizar}><option>Perro</option><option>Gato</option><option>Otro</option></select></div>
          <div className="field"><label htmlFor="edad">Edad (años) *</label><input id="edad" name="edad" type="number" min="0" step="1" value={formulario.edad} onChange={actualizar} placeholder="Ej. 3" /></div>
          <div className="field"><label htmlFor="peso">Peso (kg) *</label><input id="peso" name="peso" type="number" min="0.01" step="0.01" value={formulario.peso} onChange={actualizar} placeholder="Ej. 8.50" /></div>
        </div>
        {error && <p className="error-message" role="alert">{error}</p>}
        <div className="form-actions"><button className="button" type="submit">Guardar paciente</button><span className="patient-sub">* Campos requeridos</span></div>
      </form>
    </section>
  )
}
