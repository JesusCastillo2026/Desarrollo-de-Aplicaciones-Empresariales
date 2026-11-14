import { useState } from 'react'
import Practica from './practica/Practica.jsx'
import PanelPacientes from './components/PanelPacientes.jsx'
import './App.css'

export default function App() {
  const [vista, setVista] = useState('practica')

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Laboratorio 11, inicio">
          <span className="brand-mark">11</span>
          <span><strong>React en práctica</strong><small>Comunicación entre componentes</small></span>
        </a>
        <nav className="view-switch" aria-label="Seleccionar ejercicio">
          <button className={vista === 'practica' ? 'selected' : ''} onClick={() => setVista('practica')}>Mini catálogo</button>
          <button className={vista === 'panel' ? 'selected' : ''} onClick={() => setVista('panel')}>Panel de pacientes</button>
        </nav>
      </header>
      {vista === 'practica' ? <Practica /> : <PanelPacientes />}
      <footer className="footer-note">Datos locales de demostración · La conexión con la API corresponde a la Semana 12</footer>
    </main>
  )
}
