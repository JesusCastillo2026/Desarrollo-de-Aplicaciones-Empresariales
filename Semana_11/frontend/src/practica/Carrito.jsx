import { useEffect, useMemo } from 'react'

const moneda = (valor) => `S/ ${valor.toFixed(2)}`

export default function Carrito({ lineas, onQuitar, onVaciar }) {
  const unidades = useMemo(() => lineas.reduce((suma, linea) => suma + linea.cantidad, 0), [lineas])
  const total = useMemo(() => lineas.reduce((suma, linea) => suma + Number(linea.precio) * linea.cantidad, 0), [lineas])

  useEffect(() => {
    document.title = `Carrito (${unidades}) — Cafetería`
    return () => { document.title = 'Laboratorio 11 | Comunicación entre componentes' }
  }, [unidades])

  return (
    <aside className="card card-pad" aria-label="Carrito de compras">
      <div className="section-heading" style={{ marginTop: 0 }}><div><h2>Carrito</h2><p>{unidades} {unidades === 1 ? 'unidad' : 'unidades'}</p></div>{lineas.length > 0 && <button className="button secondary small" type="button" onClick={onVaciar}>Vaciar</button>}</div>
      {lineas.length === 0 ? <p className="empty">El carrito está vacío.</p> : <>
        <div className="cart-lines">{lineas.map((linea) => <div className="cart-line" key={linea.id}><div><strong>{linea.nombre}</strong><small>{linea.cantidad} × {moneda(Number(linea.precio))}</small></div><button className="button danger small" type="button" onClick={() => onQuitar(linea.id)} aria-label={`Quitar ${linea.nombre}`}>Quitar</button></div>)}</div>
        <div className="cart-total"><span>Total</span><span>{moneda(total)}</span></div>
      </>}
    </aside>
  )
}
