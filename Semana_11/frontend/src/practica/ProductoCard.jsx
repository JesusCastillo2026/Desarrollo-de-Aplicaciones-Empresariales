export default function ProductoCard({ producto, onAgregar }) {
  const agotado = producto.stock === 0
  return (
    <article className="product-card">
      <div><h3>{producto.nombre}</h3><p className="price">S/ {Number(producto.precio).toFixed(2)}</p></div>
      <div className="product-meta"><span className={`pill ${agotado ? 'out' : ''}`}>{agotado ? 'Agotado' : `Stock: ${producto.stock}`}</span><button className="button small" type="button" disabled={agotado} onClick={() => onAgregar(producto)}>Agregar</button></div>
    </article>
  )
}
