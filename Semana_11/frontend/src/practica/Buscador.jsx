export default function Buscador({ valor, onCambiar }) {
  return (
    <label className="search-field">
      <span aria-hidden="true">⌕</span>
      <input type="search" value={valor} onChange={(event) => onCambiar(event.target.value)} placeholder="Buscar productos…" aria-label="Buscar productos" />
    </label>
  )
}
