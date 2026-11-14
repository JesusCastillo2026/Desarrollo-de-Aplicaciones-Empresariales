import { useState } from 'react'
import ListaPractica from './practica/ListaPractica.jsx'
import PanelPacientes from './components/PanelPacientes.jsx'
import './App.css'

export default function App() {
  const [vista, setVista] = useState('practica')
  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#inicio"><span className="brand-mark">12</span><span><strong>React + Django</strong><small>AJAX y servicios web REST</small></span></a>
        <nav className="view-switch" aria-label="Seleccionar sección">
          <button className={vista === 'practica' ? 'selected' : ''} onClick={() => setVista('practica')}>CRUD de práctica</button>
          <button className={vista === 'panel' ? 'selected' : ''} onClick={() => setVista('panel')}>Panel de pacientes</button>
        </nav>
      </header>
      {vista === 'practica' ? <ListaPractica /> : <PanelPacientes />}
      <footer className="footer-note">Datos de Django REST Framework · HTTP con Axios</footer>
    </main>
  )
}
