// Arreglos de prueba con la estructura de los serializers de Semana 08.
export const propietarios = [
  { id: 1, nombres: 'Ana', apellidos: 'Rojas' },
  { id: 2, nombres: 'Luis', apellidos: 'Paredes' },
  { id: 3, nombres: 'María', apellidos: 'Salazar' },
  { id: 4, nombres: 'Carlos', apellidos: 'Núñez' },
  { id: 5, nombres: 'Elena', apellidos: 'Vargas' },
]

export const pacientes = [
  { id: 1, propietario: 1, nombre: 'Max', especie: 'Perro', raza: 'Mestizo', edad: 4, peso: '18.50' },
  { id: 2, propietario: 2, nombre: 'Luna', especie: 'Gato', raza: 'Criollo', edad: 2, peso: '4.25' },
  { id: 3, propietario: 3, nombre: 'Coco', especie: 'Perro', raza: 'Cocker', edad: 6, peso: '12.80' },
  { id: 4, propietario: 4, nombre: 'Kira', especie: 'Gato', raza: 'Siamés', edad: 3, peso: '3.90' },
  { id: 5, propietario: 5, nombre: 'Toby', especie: 'Perro', raza: 'Beagle', edad: 5, peso: '16.20' },
]

export const medicamentos = [
  { id: 1, nombre: 'Antipulgas Canino', descripcion: 'Protección mensual para perros', stock: 12, precio: '38.50' },
  { id: 2, nombre: 'Vacuna Triple Felina', descripcion: 'Dosis de prevención para gatos', stock: 2, precio: '52.00' },
  { id: 3, nombre: 'Shampoo Dermatológico', descripcion: 'Uso veterinario para piel sensible', stock: 0, precio: '29.90' },
  { id: 4, nombre: 'Desparasitante Oral', descripcion: 'Suspensión de amplio espectro', stock: 8, precio: '24.00' },
]

export const veterinarios = [
  { id: 1, nombre_completo: 'Dra. Valeria Soto', especialidad: 'Medicina general', colegiatura: 'CMVP-20418' },
  { id: 2, nombre_completo: 'Dr. Diego Herrera', especialidad: 'Cirugía veterinaria', colegiatura: 'CMVP-19832' },
  { id: 3, nombre_completo: 'Dra. Camila Rivas', especialidad: 'Dermatología', colegiatura: 'CMVP-21607' },
]

export const servicios = [
  { id: 1, nombre: 'Consulta general', duracion_minutos: 30, precio: '45.00', cupos_disponibles: 12 },
  { id: 2, nombre: 'Vacunación', duracion_minutos: 20, precio: '35.00', cupos_disponibles: 8 },
  { id: 3, nombre: 'Control dermatológico', duracion_minutos: 40, precio: '60.00', cupos_disponibles: 4 },
]

// Forma de PacienteServicioSerializer: paciente y servicio vienen anidados desde la API.
export const atenciones = [
  {
    id: 301,
    paciente: { id: 1, nombre: 'Max', especie: 'Perro', raza: 'Mestizo', peso: '18.50', propietario: { id: 1, nombres: 'Ana', apellidos: 'Rojas' } },
    servicio: { id: 1, nombre: 'Consulta general', duracion_minutos: 30, precio: '45.00' },
    cantidad: 1, monto: '45.00', estado: 'PAGADO', fecha_realizacion: '2026-10-16',
  },
  {
    id: 302,
    paciente: { id: 1, nombre: 'Max', especie: 'Perro', raza: 'Mestizo', peso: '18.50', propietario: { id: 1, nombres: 'Ana', apellidos: 'Rojas' } },
    servicio: { id: 2, nombre: 'Vacunación', duracion_minutos: 20, precio: '35.00' },
    cantidad: 1, monto: '35.00', estado: 'PENDIENTE', fecha_realizacion: '2026-10-18',
  },
  {
    id: 303,
    paciente: { id: 2, nombre: 'Luna', especie: 'Gato', raza: 'Criollo', peso: '4.25', propietario: { id: 2, nombres: 'Luis', apellidos: 'Paredes' } },
    servicio: { id: 2, nombre: 'Vacunación', duracion_minutos: 20, precio: '35.00' },
    cantidad: 1, monto: '35.00', estado: 'PAGADO', fecha_realizacion: '2026-10-15',
  },
  {
    id: 304,
    paciente: { id: 3, nombre: 'Coco', especie: 'Perro', raza: 'Cocker', peso: '12.80', propietario: { id: 3, nombres: 'María', apellidos: 'Salazar' } },
    servicio: { id: 3, nombre: 'Control dermatológico', duracion_minutos: 40, precio: '60.00' },
    cantidad: 1, monto: '60.00', estado: 'PENDIENTE', fecha_realizacion: '2026-10-19',
  },
  {
    id: 305,
    paciente: { id: 5, nombre: 'Toby', especie: 'Perro', raza: 'Beagle', peso: '16.20', propietario: { id: 5, nombres: 'Elena', apellidos: 'Vargas' } },
    servicio: { id: 1, nombre: 'Consulta general', duracion_minutos: 30, precio: '45.00' },
    cantidad: 1, monto: '45.00', estado: 'PAGADO', fecha_realizacion: '2026-10-14',
  },
]


export const pacientesPorId = Object.fromEntries(pacientes.map((paciente) => [paciente.id, paciente]))
export const atencionesPorPaciente = pacientes.map((paciente) => ({
  ...paciente,
  atenciones: atenciones.filter((atencion) => atencion.paciente.id === paciente.id),
}))
