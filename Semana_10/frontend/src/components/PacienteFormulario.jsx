import { useState } from 'react'
import Tarjeta from './Tarjeta.jsx'

const camposIniciales = { nombre: '', especie: 'Perro', peso: '', propietario: '1' }

export default function PacienteFormulario({ onAgregar }) {
  const [campos, setCampos] = useState(camposIniciales)
  const [error, setError] = useState('')
  const [confirmacion, setConfirmacion] = useState('')

  const cambiarCampo = (event) => {
    setCampos((actuales) => ({ ...actuales, [event.target.name]: event.target.value }))
    setError('')
    setConfirmacion('')
  }

  const enviar = (event) => {
    event.preventDefault()
    const nombre = campos.nombre.trim()
    const peso = Number(campos.peso)
    if (!nombre) return setError('Escribe el nombre de la mascota.')
    if (!Number.isFinite(peso) || peso <= 0) return setError('El peso debe ser mayor que cero, según la validación de la API.')

    onAgregar({
      id: Date.now(), propietario: Number(campos.propietario), nombre,
      especie: campos.especie, raza: 'Por registrar', edad: 0, peso: peso.toFixed(2),
    })
    setCampos(camposIniciales)
    setError('')
    setConfirmacion(`${nombre} se agregó a la lista.`)
  }

  return (
    <Tarjeta titulo="Registrar paciente" className="form-card">
      <form className="patient-form" onSubmit={enviar} noValidate>
        <label>Nombre
          <input name="nombre" value={campos.nombre} onChange={cambiarCampo} placeholder="Ej. Nala" />
        </label>
        <label>Especie
          <select name="especie" value={campos.especie} onChange={cambiarCampo}>
            <option>Perro</option><option>Gato</option><option>Otro</option>
          </select>
        </label>
        <label>Peso en kg
          <input name="peso" type="number" min="0.01" step="0.01" value={campos.peso} onChange={cambiarCampo} placeholder="Ej. 4.25" />
        </label>
        <label>Tutor
          <select name="propietario" value={campos.propietario} onChange={cambiarCampo}>
            <option value="1">Ana Rojas</option><option value="2">Luis Paredes</option><option value="3">María Salazar</option>
          </select>
        </label>
        <button className="submit-button" type="submit">Agregar paciente</button>
        {error && <p className="form-message form-message--error" role="alert">{error}</p>}
        {confirmacion && <p className="form-message form-message--success" role="status">{confirmacion}</p>}
      </form>
    </Tarjeta>
  )
}
