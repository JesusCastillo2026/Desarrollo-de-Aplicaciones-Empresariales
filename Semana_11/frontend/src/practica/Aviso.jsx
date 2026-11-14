import { useEffect } from 'react'

export default function Aviso({ nombre, onCerrar }) {
  useEffect(() => {
    const temporizador = window.setTimeout(onCerrar, 3000)
    return () => window.clearTimeout(temporizador)
  }, [nombre, onCerrar])

  return <div className="notice" role="status">Agregado: {nombre}</div>
}
