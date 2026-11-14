import { useState } from 'react'
import { productos } from './datos.js'
import Buscador from './Buscador.jsx'
import Catalogo from './Catalogo.jsx'
import Carrito from './Carrito.jsx'
import Aviso from './Aviso.jsx'

export default function Practica() {
  const [carrito, setCarrito] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [aviso, setAviso] = useState(null)
  const productosFiltrados = productos.filter((producto) => producto.nombre.toLowerCase().includes(busqueda.toLowerCase()))

  const agregarAlCarrito = (producto) => {
    setCarrito((actual) => {
      const existente = actual.find((linea) => linea.id === producto.id)
      return existente
        ? actual.map((linea) => linea.id === producto.id ? { ...linea, cantidad: linea.cantidad + 1 } : linea)
        : [...actual, { id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 }]
    })
    setAviso(producto.nombre)
  }

  const quitarDelCarrito = (id) => setCarrito((actual) => actual.filter((linea) => linea.id !== id))

  return (
    <section className="page">
      <p className="eyebrow">Parte 1 · Ejercicios 1–8</p>
      <h1 className="page-title">Un catálogo que comparte su estado</h1>
      <p className="page-lead">El componente padre conserva el texto de búsqueda y el carrito. Catálogo, tarjetas y carrito reciben datos y funciones por props para coordinar sus acciones.</p>
      <div className="toolbar">
        <Buscador valor={busqueda} onCambiar={setBusqueda} />
        <span className="pill">{productosFiltrados.length} productos encontrados</span>
      </div>
      <div className="content-grid">
        <Catalogo productos={productosFiltrados} onAgregar={agregarAlCarrito} />
        <Carrito lineas={carrito} onQuitar={quitarDelCarrito} onVaciar={() => setCarrito([])} />
      </div>
      {aviso && <Aviso nombre={aviso} onCerrar={() => setAviso(null)} />}
    </section>
  )
}
