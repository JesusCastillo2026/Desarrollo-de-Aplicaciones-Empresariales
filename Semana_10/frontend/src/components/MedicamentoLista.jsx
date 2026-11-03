import { useMemo, useState } from 'react'
import MedicamentoTarjeta from './MedicamentoTarjeta.jsx'

export default function MedicamentoLista({ medicamentos = [] }) {
  const [busqueda, setBusqueda] = useState('')
  const visibles = useMemo(() => medicamentos.filter((medicamento) =>
    medicamento.nombre.toLocaleLowerCase('es').includes(busqueda.trim().toLocaleLowerCase('es')),
  ), [medicamentos, busqueda])

  return (
    <>
      <div className="component-toolbar">
        <label className="search-box medication-search">
          <span aria-hidden="true">⌕</span>
          <input type="search" value={busqueda} onChange={(event) => setBusqueda(event.target.value)} placeholder="Buscar medicamento" aria-label="Buscar medicamento" />
        </label>
        <span className="count-pill">{visibles.length} resultados</span>
      </div>
      <div className="medication-list">
        {visibles.length ? visibles.map((medicamento) => (
          <MedicamentoTarjeta key={medicamento.id} id={medicamento.id} nombre={medicamento.nombre} descripcion={medicamento.descripcion} precio={medicamento.precio} stock={medicamento.stock} />
        )) : <div className="empty-state medication-empty"><strong>No hay medicamentos</strong><p>Prueba otra búsqueda.</p></div>}
      </div>
    </>
  )
}
