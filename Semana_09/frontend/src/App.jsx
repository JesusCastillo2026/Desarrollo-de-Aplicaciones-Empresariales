import { useMemo, useState } from 'react'
import './App.css'

const nombreAplicacion = 'Clínica VetCare'

// Arreglos escritos manualmente con campos equivalentes a los serializers de Semana 08.
const propietarios = [
  { id: 1, nombres: 'Ana', apellidos: 'Rojas' },
  { id: 2, nombres: 'Luis', apellidos: 'Paredes' },
  { id: 3, nombres: 'María', apellidos: 'Salazar' },
  { id: 4, nombres: 'Carlos', apellidos: 'Núñez' },
  { id: 5, nombres: 'Elena', apellidos: 'Vargas' },
]

const pacientes = [
  { id: 1, propietario: 1, nombre: 'Max', especie: 'Perro', raza: 'Mestizo', edad: 4, peso: '18.50' },
  { id: 2, propietario: 2, nombre: 'Luna', especie: 'Gato', raza: 'Criollo', edad: 2, peso: '4.25' },
  { id: 3, propietario: 3, nombre: 'Coco', especie: 'Perro', raza: 'Cocker', edad: 6, peso: '12.80' },
  { id: 4, propietario: 4, nombre: 'Kira', especie: 'Gato', raza: 'Siamés', edad: 3, peso: '3.90' },
  { id: 5, propietario: 5, nombre: 'Toby', especie: 'Perro', raza: 'Beagle', edad: 5, peso: '16.20' },
]

const medicamentos = [
  { id: 1, nombre: 'Antipulgas Canino', descripcion: 'Protección mensual para perros', stock: 12, precio: '38.50' },
  { id: 2, nombre: 'Vacuna Triple Felina', descripcion: 'Dosis de prevención para gatos', stock: 2, precio: '52.00' },
  { id: 3, nombre: 'Shampoo Dermatológico', descripcion: 'Uso veterinario para piel sensible', stock: 0, precio: '29.90' },
  { id: 4, nombre: 'Desparasitante Oral', descripcion: 'Suspensión de amplio espectro', stock: 8, precio: '24.00' },
]

const veterinarios = [
  { id: 1, nombre_completo: 'Dra. Valeria Soto', especialidad: 'Medicina general', colegiatura: 'CMVP-20418' },
  { id: 2, nombre_completo: 'Dr. Diego Herrera', especialidad: 'Cirugía veterinaria', colegiatura: 'CMVP-19832' },
  { id: 3, nombre_completo: 'Dra. Camila Rivas', especialidad: 'Dermatología', colegiatura: 'CMVP-21607' },
]

const servicios = [
  { id: 1, nombre: 'Consulta general', duracion_minutos: 30, precio: '45.00', cupos_disponibles: 12 },
  { id: 2, nombre: 'Vacunación', duracion_minutos: 20, precio: '35.00', cupos_disponibles: 8 },
  { id: 3, nombre: 'Control dermatológico', duracion_minutos: 40, precio: '60.00', cupos_disponibles: 4 },
]

// Forma de PacienteServicioSerializer: paciente y servicio vienen anidados desde la API.
const atenciones = [
  {
    id: 301,
    paciente: { id: 1, nombre: 'Max', especie: 'Perro', raza: 'Mestizo', peso: '18.50', propietario: { id: 1, nombres: 'Ana', apellidos: 'Rojas' } },
    servicio: { id: 1, nombre: 'Consulta general', duracion_minutos: 30, precio: '45.00' },
    cantidad: 1, monto: '45.00', estado: 'PAGADO', fecha_realizacion: '2026-10-16',
  },
  {
    id: 302,
    paciente: { id: 1, nombre: 'Max', especie: 'Perro', raza: 'Mestizo', peso: '18.50', propietario: { id: 1, nombres: 'Ana', apellidos: 'Rojas' } },
    servicio: { id: 2, nombre: 'Vacunación', duracion_minutos: 20, precio: '35.00' },
    cantidad: 1, monto: '35.00', estado: 'PENDIENTE', fecha_realizacion: '2026-10-18',
  },
  {
    id: 303,
    paciente: { id: 2, nombre: 'Luna', especie: 'Gato', raza: 'Criollo', peso: '4.25', propietario: { id: 2, nombres: 'Luis', apellidos: 'Paredes' } },
    servicio: { id: 2, nombre: 'Vacunación', duracion_minutos: 20, precio: '35.00' },
    cantidad: 1, monto: '35.00', estado: 'PAGADO', fecha_realizacion: '2026-10-15',
  },
  {
    id: 304,
    paciente: { id: 3, nombre: 'Coco', especie: 'Perro', raza: 'Cocker', peso: '12.80', propietario: { id: 3, nombres: 'María', apellidos: 'Salazar' } },
    servicio: { id: 3, nombre: 'Control dermatológico', duracion_minutos: 40, precio: '60.00' },
    cantidad: 1, monto: '60.00', estado: 'PENDIENTE', fecha_realizacion: '2026-10-19',
  },
  {
    id: 305,
    paciente: { id: 5, nombre: 'Toby', especie: 'Perro', raza: 'Beagle', peso: '16.20', propietario: { id: 5, nombres: 'Elena', apellidos: 'Vargas' } },
    servicio: { id: 1, nombre: 'Consulta general', duracion_minutos: 30, precio: '45.00' },
    cantidad: 1, monto: '45.00', estado: 'PAGADO', fecha_realizacion: '2026-10-14',
  },
]

const pacientePorId = Object.fromEntries(pacientes.map((paciente) => [paciente.id, paciente]))
const atencionesPorPaciente = pacientes.map((paciente) => ({
  ...paciente,
  atenciones: atenciones.filter((atencion) => atencion.paciente.id === paciente.id),
}))

const formatoMoneda = (importe) => `S/ ${Number(importe).toFixed(2)}`
const obtenerFecha = (fecha) => new Date(`${fecha}T12:00:00`).toLocaleDateString('es-PE', {
  day: '2-digit',
  month: 'short',
})

function App() {
  const [busqueda, setBusqueda] = useState('')
  const [especieActiva, setEspecieActiva] = useState('Todos')
  const [seccionActiva, setSeccionActiva] = useState('inicio')

  const pacientesVisibles = useMemo(() => pacientes.filter((paciente) => {
    const texto = `${paciente.nombre} ${paciente.especie} ${paciente.raza}`.toLowerCase()
    const coincideTexto = texto.includes(busqueda.trim().toLowerCase())
    const coincideEspecie = especieActiva === 'Todos' || paciente.especie === especieActiva
    return coincideTexto && coincideEspecie
  }), [busqueda, especieActiva])

  const totalAtenciones = atenciones.length
  const totalEnStock = medicamentos.filter((medicamento) => medicamento.stock > 0).length
  const propietariosPorId = Object.fromEntries(propietarios.map((propietario) => [propietario.id, propietario]))

  const cambiarSeccion = (id) => setSeccionActiva(id)

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Navegación principal">
        <a className="brand" href="#inicio" onClick={() => cambiarSeccion('inicio')}>
          <span className="brand-mark" aria-hidden="true">V</span>
          <span className="brand-name">vetcare<span>CLÍNICA VETERINARIA</span></span>
        </a>

        <p className="sidebar-label">MENÚ PRINCIPAL</p>
        <nav className="main-nav">
          <a className={`nav-link ${seccionActiva === 'inicio' ? 'active' : ''}`} href="#inicio" onClick={() => cambiarSeccion('inicio')}>
            <span className="nav-icon" aria-hidden="true">⌂</span>Resumen
          </a>
          <a className={`nav-link ${seccionActiva === 'pacientes' ? 'active' : ''}`} href="#pacientes" onClick={() => cambiarSeccion('pacientes')}>
            <span className="nav-icon" aria-hidden="true">♡</span>Pacientes
          </a>
          <a className={`nav-link ${seccionActiva === 'inventario' ? 'active' : ''}`} href="#inventario" onClick={() => cambiarSeccion('inventario')}>
            <span className="nav-icon" aria-hidden="true">+</span>Medicamentos
          </a>
          <a className={`nav-link ${seccionActiva === 'atenciones' ? 'active' : ''}`} href="#atenciones" onClick={() => cambiarSeccion('atenciones')}>
            <span className="nav-icon" aria-hidden="true">▤</span>Atenciones
          </a>
          <a className={`nav-link ${seccionActiva === 'equipo' ? 'active' : ''}`} href="#equipo" onClick={() => cambiarSeccion('equipo')}>
            <span className="nav-icon" aria-hidden="true">♧</span>Equipo médico
          </a>
        </nav>

        <div className="sidebar-note">
          <span className="note-dot" />
          <div><strong>Modo de práctica</strong><span>Datos locales de muestra</span></div>
        </div>
        <div className="sidebar-user">
          <span className="user-avatar">YB</span>
          <div><strong>Yunior Bestard</strong><span>Administrador</span></div>
          <span className="user-more" aria-hidden="true">···</span>
        </div>
      </aside>

      <main className="main-content" id="inicio">
        <header className="topbar">
          <div className="breadcrumb"><span>Clínica</span><span className="breadcrumb-separator">/</span><strong>Resumen</strong></div>
          <div className="topbar-right">
            <span className="today-label">{new Date().toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
            <button className="notification-button" type="button" aria-label="Notificaciones"><span aria-hidden="true">•</span><i /></button>
          </div>
        </header>

        <section className="welcome-panel" aria-labelledby="welcome-title" style={{ '--panel-accent': '#bde8d7' }}>
          <div className="welcome-copy">
            <p className="eyebrow">PANEL DE CONTROL <span>·</span> {new Date().getFullYear()}</p>
            <h1 id="welcome-title">Un buen día para<br /><span>cuidar mejor.</span></h1>
            <p className="welcome-description">Todo lo que ocurre en {nombreAplicacion}, organizado en un solo lugar.</p>
            <a className="welcome-action" href="#pacientes" onClick={() => cambiarSeccion('pacientes')}>Ver pacientes <span aria-hidden="true">↗</span></a>
          </div>
          <div className="welcome-art" aria-hidden="true">
            <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
            <div className="pet-shape"><span className="pet-ear ear-left" /><span className="pet-ear ear-right" /><span className="pet-eye eye-left" /><span className="pet-eye eye-right" /><span className="pet-nose" /><span className="pet-smile" /></div>
            <span className="art-spark spark-one">✳</span><span className="art-spark spark-two">✦</span>
            <div className="art-tag">CUIDADO CON<br />CARIÑO</div>
          </div>
        </section>

        <section className="summary-grid" aria-label="Resumen de la clínica">
            <article className="summary-card">
            <div className="summary-icon icon-mint" aria-hidden="true">♡</div>
            <div><p>Pacientes registrados</p><strong>{pacientes.length}</strong><span className="summary-hint">Mascotas en seguimiento</span></div>
            <span className="summary-trend">+2 este mes</span>
          </article>
          <article className="summary-card">
            <div className="summary-icon icon-lilac" aria-hidden="true">▤</div>
            <div><p>Atenciones anotadas</p><strong>{totalAtenciones}</strong><span className="summary-hint">{servicios.length} servicios disponibles</span></div>
            <span className="summary-trend trend-neutral">Semana 9</span>
          </article>
          <article className="summary-card">
            <div className="summary-icon icon-peach" aria-hidden="true">＋</div>
            <div><p>Medicamentos activos</p><strong>{totalEnStock}<small> / {medicamentos.length}</small></strong><span className="summary-hint">Con unidades disponibles</span></div>
            <span className="summary-trend trend-alert">Revisar stock</span>
          </article>
        </section>

        <section className="content-section" id="pacientes" aria-labelledby="patients-heading">
          <div className="section-heading">
            <div><p className="eyebrow">REGISTRO CLÍNICO</p><h2 id="patients-heading">Pacientes</h2><p className="section-subtitle">Información basada en el serializer de Paciente de la Semana 8.</p></div>
            <a className="text-link" href="#atenciones" onClick={() => cambiarSeccion('atenciones')}>Ver atenciones <span aria-hidden="true">→</span></a>
          </div>
          <div className="list-toolbar">
            <label className="search-box"><span aria-hidden="true">⌕</span><input type="search" value={busqueda} onChange={(event) => setBusqueda(event.target.value)} placeholder="Buscar por nombre o especie" aria-label="Buscar pacientes" /></label>
            <div className="filter-group" aria-label="Filtrar por especie">
              {['Todos', 'Perro', 'Gato'].map((especie) => <button key={especie} className={`filter-chip ${especieActiva === especie ? 'selected' : ''}`} type="button" onClick={() => setEspecieActiva(especie)}>{especie === 'Todos' ? 'Todos' : `${especie}s`}</button>)}
            </div>
          </div>
          <div className="patient-grid">
            {pacientesVisibles.length > 0 ? pacientesVisibles.map((paciente) => {
              const propietario = propietariosPorId[paciente.propietario]
              return (
                <article className="patient-card" key={paciente.id}>
                  <div className={`pet-avatar pet-${paciente.especie.toLowerCase()}`} aria-hidden="true">{paciente.nombre.slice(0, 2).toUpperCase()}</div>
                  <div className="patient-info"><div className="patient-title"><h3>{paciente.nombre}</h3><span className="patient-id">#{String(paciente.id).padStart(3, '0')}</span></div><p>{paciente.raza} · {paciente.edad} años</p><span className="owner-name">Tutor: {propietario.nombres} {propietario.apellidos}</span></div>
                  <div className="patient-weight"><strong>{Number(paciente.peso).toFixed(2)} <small>kg</small></strong><span>Peso actual</span></div>
                </article>
              )
            }) : <div className="empty-state"><span aria-hidden="true">⌕</span><strong>No hay registros</strong><p>Prueba con otro nombre o cambia el filtro.</p><button type="button" onClick={() => { setBusqueda(''); setEspecieActiva('Todos') }}>Limpiar búsqueda</button></div>}
          </div>
        </section>

        <div className="two-column-layout">
          <section className="content-section inventory-section" id="inventario" aria-labelledby="inventory-heading">
            <div className="section-heading compact-heading"><div><p className="eyebrow">CONTROL DE INVENTARIO</p><h2 id="inventory-heading">Medicamentos</h2></div><span className="count-pill">{medicamentos.length} productos</span></div>
            <div className="medication-list">
              {medicamentos.map((medicamento) => (
                <article className="medication-row" key={medicamento.id}>
                  <div className="medication-symbol" aria-hidden="true">+</div>
                  <div className="medication-copy"><h3>{medicamento.nombre}</h3><p>{medicamento.descripcion}</p><span className="medication-price">{formatoMoneda(medicamento.precio)}</span></div>
                  <div className="stock-column">
                    <span className={`stock-badge ${medicamento.stock === 0 ? 'out-of-stock' : 'in-stock'}`}>{medicamento.stock === 0 ? 'Agotado' : `Stock: ${medicamento.stock}`}</span>
                    {medicamento.stock > 0 && medicamento.stock <= 3 && <span className="low-stock-message">¡Últimas unidades!</span>}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="content-section team-section" id="equipo" aria-labelledby="team-heading">
            <div className="section-heading compact-heading"><div><p className="eyebrow">INVESTIGACIÓN PROPIA</p><h2 id="team-heading">Equipo médico</h2></div><span className="count-pill">{veterinarios.length} profesionales</span></div>
            <div className="team-list">
              {veterinarios.map((veterinario) => (
                <article className="team-member" key={veterinario.id}>
                  <div className="doctor-avatar" aria-hidden="true">{veterinario.nombre_completo.split(' ').slice(-2).map((parte) => parte[0]).join('')}</div>
                  <div><h3>{veterinario.nombre_completo}</h3><p>{veterinario.especialidad}</p><span>{veterinario.colegiatura}</span></div>
                  <span className="online-dot" aria-label="Disponible" />
                </article>
              ))}
            </div>
          </section>
        </div>

        <section className="content-section attention-section" id="atenciones" aria-labelledby="attention-heading">
          <div className="section-heading"><div><p className="eyebrow">RELACIÓN PACIENTE Y SERVICIO</p><h2 id="attention-heading">Próximas atenciones</h2><p className="section-subtitle">La lista anidada agrupa registros de PacienteServicio por paciente.</p></div><span className="count-pill">{atenciones.length} registros</span></div>
          <div className="attention-grid">
            {atencionesPorPaciente.map((paciente) => {
              const atencionesDelPaciente = paciente.atenciones
              const resumenPaciente = pacientePorId[paciente.id]
              const tutor = propietariosPorId[paciente.propietario]
              return (
                <article className="attention-card" key={paciente.id}>
                  <header className="attention-patient"><div className="mini-pet-avatar" aria-hidden="true">{resumenPaciente.nombre.slice(0, 2).toUpperCase()}</div><div><h3>{paciente.nombre}</h3><p>{tutor.nombres} {tutor.apellidos}</p></div><span className="attention-count">{atencionesDelPaciente.length}</span></header>
                  <div className="attention-items">
                    {atencionesDelPaciente.length > 0 ? atencionesDelPaciente.map((atencion) => (
                      <div className="attention-item" key={atencion.id}>
                        <div className="attention-date"><strong>{obtenerFecha(atencion.fecha_realizacion)}</strong><span>{atencion.estado === 'PAGADO' ? 'Confirmada' : 'Pendiente'}</span></div>
                        <div className="attention-detail"><strong>{atencion.servicio.nombre}</strong><span>{atencion.servicio.duracion_minutos} min · {formatoMoneda(atencion.monto)}</span></div>
                        <span className={`state-dot ${atencion.estado === 'PAGADO' ? 'paid' : 'pending'}`} aria-hidden="true" />
                      </div>
                    )) : <p className="no-appointments">Sin atenciones registradas.</p>}
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <footer className="app-footer"><span>© {new Date().getFullYear()} {nombreAplicacion}</span><span>Interfaz React · Semana 9 · Datos estáticos para práctica</span></footer>
      </main>
    </div>
  )
}

export default App