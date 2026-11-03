import { useState } from 'react'

const moneda = (importe) => `S/ ${Number(importe).toFixed(2)}`

export default function MedicamentoTarjeta({ id, nombre, descripcion = 'Producto veterinario', precio, stock = 0 }) {
  const [agregados, setAgregados] = useState(0)
  const agotado = Number(stock) <= 0
  const agregar = () => setAgregados((actuales) => actuales + 1)

  return (
    <article className="medication-row medication-row--interactive" data-medicamento-id={id}>
      <div className="medication-symbol" aria-hidden="true">+</div>
      <div className="medication-copy">
        <h3>{nombre}</h3>
        <p>{descripcion}</p>
        <span className="medication-price">{moneda(precio)}</span>
      </div>
      <div className="stock-column">
        <span className={`stock-badge ${agotado ? 'out-of-stock' : 'in-stock'}`}>
          {agotado ? 'Agotado' : `Stock: ${stock}`}
        </span>
        {!agotado && stock <= 3 && <span className="low-stock-message">¡Últimas unidades!</span>}
        <button className="add-counter" type="button" onClick={agregar} disabled={agotado} aria-label={`Agregar ${nombre}`}>
          Agregar{agregados > 0 && <span className="counter-value"> {agregados}</span>}
        </button>
      </div>
    </article>
  )
}
