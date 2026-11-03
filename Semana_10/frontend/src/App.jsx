import { useState } from 'react'
import './App.css'
import MedicamentoLista from './components/MedicamentoLista.jsx'
import PacienteLista from './components/PacienteLista.jsx'
import PacienteFormulario from './components/PacienteFormulario.jsx'
import VeterinarioLista from './components/VeterinarioLista.jsx'
import AtencionLista from './components/AtencionLista.jsx'
import { atenciones, medicamentos as medicamentosBase, pacientes as pacientesBase, propietarios, veterinarios } from './data.js'

const nombreAplicacion = 'Clínica VetCare'

export default function App() {
  const [pacientes, setPacientes] = useState(pacientesBase)
  const [seccionActiva, setSeccionActiva] = useState('inicio')
  const cantidadMedicamentosDisponibles = medicamentosBase.filter((medicamento) => medicamento.stock > 0).length

  const agregarPaciente = (nuevoPaciente) => setPacientes((actuales) => [nuevoPaciente, ...actuales])
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
          <a className={`nav-link ${seccionActiva === 'inicio' ? 'active' : ''}`} href="#inicio" onClick={() => cambiarSeccion('inicio')}><span className="nav-icon" aria-hidden="true">⌂</span>Resumen</a>
          <a className={`nav-link ${seccionActiva === 'pacientes' ? 'active' : ''}`} href="#pacientes" onClick={() => cambiarSeccion('pacientes')}><span className="nav-icon" aria-hidden="true">♡</span>Pacientes</a>
          <a className={`nav-link ${seccionActiva === 'inventario' ? 'active' : ''}`} href="#inventario" onClick={() => cambiarSeccion('inventario')}><span className="nav-icon" aria-hidden="true">+</span>Medicamentos</a>
          <a className={`nav-link ${seccionActiva === 'atenciones' ? 'active' : ''}`} href="#atenciones" onClick={() => cambiarSeccion('atenciones')}><span className="nav-icon" aria-hidden="true">▤</span>Atenciones</a>
          <a className={`nav-link ${seccionActiva === 'equipo' ? 'active' : ''}`} href="#equipo" onClick={() => cambiarSeccion('equipo')}><span className="nav-icon" aria-hidden="true">♧</span>Equipo médico</a>
        </nav>
        <div className="sidebar-note"><span className="note-dot" /><div><strong>Modo de práctica</strong><span>Datos locales de muestra</span></div></div>
        <div className="sidebar-user"><span className="user-avatar">YB</span><div><strong>Yunior Bestard</strong><span>Administrador</span></div><span className="user-more" aria-hidden="true">···</span></div>
      </aside>

      <main className="main-content" id="inicio">
        <header className="topbar">
          <div className="breadcrumb"><span>Clínica</span><span className="breadcrumb-separator">/</span><strong>Semana 10</strong></div>
          <div className="topbar-right"><span className="today-label">Componentes, estado y eventos</span><button className="notification-button" type="button" aria-label="Notificaciones"><span aria-hidden="true">•</span><i /></button></div>
        </header>

        <section className="welcome-panel" aria-labelledby="welcome-title" style={{ '--panel-accent': '#bde8d7' }}>
          <div className="welcome-copy"><p className="eyebrow">PANEL DE CONTROL <span>·</span> SEMANA 10</p><h1 id="welcome-title">Una clínica mejor<br /><span>organizada.</span></h1><p className="welcome-description">Componentes reutilizables, datos por props e interacciones con React.</p><a className="welcome-action" href="#pacientes" onClick={() => cambiarSeccion('pacientes')}>Ver pacientes <span aria-hidden="true">↗</span></a></div>
          <div className="welcome-art" aria-hidden="true"><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="pet-shape"><span className="pet-ear ear-left" /><span className="pet-ear ear-right" /><span className="pet-eye eye-left" /><span className="pet-eye eye-right" /><span className="pet-nose" /><span className="pet-smile" /></div><span className="art-spark spark-one">✳</span><span className="art-spark spark-two">✦</span><div className="art-tag">CUIDADO CON<br />CARIÑO</div></div>
        </section>

        <section className="summary-grid" aria-label="Resumen de la clínica">
          <article className="summary-card"><div className="summary-icon icon-mint" aria-hidden="true">♡</div><div><p>Pacientes registrados</p><strong>{pacientes.length}</strong><span className="summary-hint">Lista reactiva con useState</span></div><span className="summary-trend">Actualizado</span></article>
          <article className="summary-card"><div className="summary-icon icon-lilac" aria-hidden="true">▤</div><div><p>Atenciones anotadas</p><strong>{atenciones.length}</strong><span className="summary-hint">{veterinarios.length} profesionales</span></div><span className="summary-trend trend-neutral">Semana 10</span></article>
          <article className="summary-card"><div className="summary-icon icon-peach" aria-hidden="true">＋</div><div><p>Medicamentos activos</p><strong>{cantidadMedicamentosDisponibles}<small> / {medicamentosBase.length}</small></strong><span className="summary-hint">Con unidades disponibles</span></div><span className="summary-trend trend-alert">Revisar stock</span></article>
        </section>

        <section className="content-section" id="pacientes" aria-labelledby="patients-heading">
          <div className="section-heading"><div><p className="eyebrow">GESTIÓN DE PACIENTES</p><h2 id="patients-heading">Pacientes</h2><p className="section-subtitle">Las tarjetas reciben sus datos mediante props.</p></div><span className="count-pill">{pacientes.length} registros</span></div>
          <PacienteLista pacientes={pacientes} propietarios={propietarios} />
          <div className="patient-form-wrap"><PacienteFormulario onAgregar={agregarPaciente} /><p className="form-footnote">Validación heredada de la API: el peso debe ser mayor que cero. El alta se conserva en el estado de esta sesión.</p></div>
        </section>

        <div className="two-column-layout">
          <section className="content-section inventory-section" id="inventario" aria-labelledby="inventory-heading">
            <div className="section-heading compact-heading"><div><p className="eyebrow">CONTROL DE INVENTARIO</p><h2 id="inventory-heading">Medicamentos</h2></div><span className="count-pill">{medicamentosBase.length} productos</span></div>
            <MedicamentoLista medicamentos={medicamentosBase} />
          </section>
          <section className="content-section team-section" id="equipo" aria-labelledby="team-heading">
            <div className="section-heading compact-heading"><div><p className="eyebrow">INVESTIGACIÓN PROPIA</p><h2 id="team-heading">Equipo médico</h2></div><span className="count-pill">{veterinarios.length} profesionales</span></div>
            <VeterinarioLista veterinarios={veterinarios} />
          </section>
        </div>

        <section className="content-section attention-section" id="atenciones" aria-labelledby="attention-heading">
          <div className="section-heading"><div><p className="eyebrow">RELACIÓN PACIENTE Y SERVICIO</p><h2 id="attention-heading">Próximas atenciones</h2><p className="section-subtitle">La lista anidada agrupa datos de PacienteServicio por paciente.</p></div><span className="count-pill">{atenciones.length} registros</span></div>
          <AtencionLista pacientes={pacientes} atenciones={atenciones} />
        </section>
        <footer className="app-footer"><span>© {new Date().getFullYear()} {nombreAplicacion}</span><span>Interfaz React · Semana 10 · Datos locales de práctica</span></footer>
      </main>
    </div>
  )
}
