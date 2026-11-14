import ProductoCard from './ProductoCard.jsx'

export default function Catalogo({ productos, onAgregar }) {
  return (
    <section className="card card-pad" aria-label="Catálogo de productos">
      <div className="section-heading" style={{ marginTop: 0 }}><div><h2>Catálogo</h2><p>Los productos llegan desde Practica mediante props.</p></div></div>
      {productos.length ? <div className="product-grid">{productos.map((producto) => <ProductoCard key={producto.id} producto={producto} onAgregar={onAgregar} />)}</div> : <p className="empty">No hay productos que coincidan con la búsqueda.</p>}
    </section>
  )
}
