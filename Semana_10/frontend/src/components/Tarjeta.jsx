export default function Tarjeta({ titulo, children, className = '' }) {
  return (
    <section className={`component-card ${className}`.trim()}>
      {titulo && <header className="component-card__header"><h3>{titulo}</h3></header>}
      <div className="component-card__body">{children}</div>
    </section>
  )
}
