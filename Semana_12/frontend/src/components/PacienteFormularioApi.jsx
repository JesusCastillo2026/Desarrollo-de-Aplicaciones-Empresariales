import { useEffect, useState } from 'react'
import api from '../api.js'
import { errorMessage } from '../utils.js'

const inicial = { propietario: '', nombre: '', especie: 'Perro', raza: '', edad: '', peso: '' }

export default function PacienteFormularioApi({ seleccionado, onGuardar, onCancelar }) {
  const [form, setForm] = useState(inicial)
  const [propietarios, setPropietarios] = useState([])
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    let activo = true
    api.get('/propietarios/')
      .then(({ data }) => { if (activo) setPropietarios(data) })
      .catch((requestError) => { if (activo) setError(errorMessage(requestError)) })
    return () => { activo = false }
  }, [])

  useEffect(() => {
    if (seleccionado) {
      setForm({
        propietario: String(seleccionado.propietario), nombre: seleccionado.nombre,
        especie: seleccionado.especie, raza: seleccionado.raza,
        edad: String(seleccionado.edad), peso: String(seleccionado.peso),
      })
    } else {
      setForm({ ...inicial, propietario: propietarios[0] ? String(propietarios[0].id) : '' })
    }
    setError('')
  }, [seleccionado, propietarios])

  const cambiar = (event) => setForm((actual) => ({ ...actual, [event.target.name]: event.target.value }))

  async function enviar(event) {
    event.preventDefault()
    if (!form.propietario || !form.nombre.trim() || !form.raza.trim()) {
      setError('Selecciona un propietario y completa nombre y raza.')
      return
    }
    if (!Number.isInteger(Number(form.edad)) || Number(form.edad) < 0) {
      setError('La edad debe ser un entero igual o mayor que cero.')
      return
    }
    if (!Number.isFinite(Number(form.peso)) || Number(form.peso) <= 0) {
      setError('El peso debe ser mayor que cero.')
      return
    }
    setCargando(true)
    setError('')
    try {
      await onGuardar({
        ...form, propietario: Number(form.propietario),
        nombre: form.nombre.trim(), raza: form.raza.trim(),
        edad: Number(form.edad), peso: Number(form.peso).toFixed(2),
      })
      if (!seleccionado) setForm({ ...inicial, propietario: propietarios[0] ? String(propietarios[0].id) : '' })
    } catch (requestError) {
      setError(errorMessage(requestError))
    } finally {
      setCargando(false)
    }
  }

  return (
    <section className="card card-pad form-card">
      <div className="section-heading"><div><h2>{seleccionado ? 'Editar paciente' : 'Registrar paciente'}</h2><p>{seleccionado ? 'El cambio se envía a Django con PATCH.' : 'El registro se guarda en la API con POST.'}</p></div></div>
      <form onSubmit={enviar} noValidate>
        <div className="form-grid">
          <div className="field"><label htmlFor="propietario">Propietario *</label><select id="propietario" name="propietario" value={form.propietario} onChange={cambiar} required><option value="">Selecciona un propietario</option>{propietarios.map((p) => <option key={p.id} value={p.id}>{p.nombres} {p.apellidos}</option>)}</select></div>
          <div className="field"><label htmlFor="nombre">Paciente *</label><input id="nombre" name="nombre" value={form.nombre} onChange={cambiar} required /></div>
          <div className="field"><label htmlFor="especie">Especie</label><select id="especie" name="especie" value={form.especie} onChange={cambiar}><option>Perro</option><option>Gato</option><option>Otro</option></select></div>
          <div className="field"><label htmlFor="raza">Raza *</label><input id="raza" name="raza" value={form.raza} onChange={cambiar} required /></div>
          <div className="field"><label htmlFor="edad">Edad (años) *</label><input id="edad" name="edad" type="number" min="0" step="1" value={form.edad} onChange={cambiar} required /></div>
          <div className="field"><label htmlFor="peso">Peso (kg) *</label><input id="peso" name="peso" type="number" min="0.01" step="0.01" value={form.peso} onChange={cambiar} required /></div>
        </div>
        {error && <p className="error-message" role="alert">{error}</p>}
        <div className="form-actions"><button className="button" type="submit" disabled={cargando || propietarios.length === 0}>{cargando ? 'Enviando…' : seleccionado ? 'Guardar cambios' : 'Crear paciente'}</button>{seleccionado && <button className="button secondary" type="button" onClick={onCancelar}>Cancelar edición</button>}</div>
      </form>
    </section>
  )
}
