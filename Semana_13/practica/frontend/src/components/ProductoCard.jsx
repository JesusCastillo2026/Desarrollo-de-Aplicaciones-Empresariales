export default function ProductoCard({ producto }) {
  return <article><h2>{producto.nombre}</h2><p>{producto.descripcion}</p><strong>S/ {Number(producto.precio).toFixed(2)}</strong></article>
}
