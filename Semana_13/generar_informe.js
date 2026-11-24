const fs = require('node:fs');
const path = require('node:path');

const W = 612;
const H = 792;
const M = 48;
const pages = [];
let ops = [];
let y = 102;

function pdfColor(hex) {
  const v = hex.replace('#', '');
  return [0, 2, 4].map(i => (parseInt(v.slice(i, i + 2), 16) / 255).toFixed(3)).join(' ');
}

const cp1252Extra = new Map([
  ['€', 0x80], ['‚', 0x82], ['ƒ', 0x83], ['„', 0x84], ['…', 0x85], ['†', 0x86], ['‡', 0x87],
  ['ˆ', 0x88], ['‰', 0x89], ['Š', 0x8a], ['‹', 0x8b], ['Œ', 0x8c], ['Ž', 0x8e], ['‘', 0x91],
  ['’', 0x92], ['“', 0x93], ['”', 0x94], ['•', 0x95], ['–', 0x96], ['—', 0x97], ['˜', 0x98],
  ['™', 0x99], ['š', 0x9a], ['›', 0x9b], ['œ', 0x9c], ['ž', 0x9e], ['Ÿ', 0x9f],
]);

function hexText(value) {
  const bytes = [];
  for (const ch of String(value)) {
    const cp = ch.codePointAt(0);
    const b = cp1252Extra.has(ch) ? cp1252Extra.get(ch) : cp;
    bytes.push((b >= 0 && b <= 255) ? b.toString(16).padStart(2, '0') : '3f');
  }
  return `<${bytes.join('').toUpperCase()}>`;
}

function text(value, x, top, size = 10, color = '#24364c', font = 'F1') {
  const yy = H - top;
  ops.push(`BT /${font} ${size} Tf ${pdfColor(color)} rg 1 0 0 1 ${x.toFixed(2)} ${yy.toFixed(2)} Tm ${hexText(value)} Tj ET`);
}

function rect(x, top, width, height, fill = '#ffffff', stroke = null, lineWidth = 1) {
  const yy = H - top - height;
  if (fill) ops.push(`${pdfColor(fill)} rg ${stroke ? `${pdfColor(stroke)} RG ${lineWidth} w` : ''} ${x} ${yy} ${width} ${height} re ${stroke ? 'B' : 'f'}`);
}

function line(x1, top1, x2, top2, color = '#cbd5e1', width = 1) {
  ops.push(`${pdfColor(color)} RG ${width} w ${x1} ${H - top1} m ${x2} ${H - top2} l S`);
}

function box(label, detail, x, top, width, height, fill, stroke, titleColor = '#173c70') {
  rect(x, top, width, height, fill, stroke, 1.2);
  text(label, x + 10, top + 22, 11, titleColor, 'F2');
  let ty = top + 40;
  for (const item of detail) {
    text(item, x + 10, ty, 8.2, '#344b65');
    ty += 13;
  }
}

function arrow(x1, y1, x2, y2, color = '#3478c7') {
  line(x1, y1, x2, y2, color, 1.8);
  const a = Math.atan2(y2 - y1, x2 - x1);
  const len = 7;
  const p1 = [x2 - len * Math.cos(a - Math.PI / 6), y2 - len * Math.sin(a - Math.PI / 6)];
  const p2 = [x2 - len * Math.cos(a + Math.PI / 6), y2 - len * Math.sin(a + Math.PI / 6)];
  ops.push(`${pdfColor(color)} rg ${x2} ${H - y2} m ${p1[0]} ${H - p1[1]} l ${p2[0]} ${H - p2[1]} l h f`);
}

function wrap(str, limit = 88) {
  const words = String(str).split(/\s+/);
  const out = [];
  let lineText = '';
  for (const word of words) {
    if (!lineText) lineText = word;
    else if ((lineText + ' ' + word).length <= limit) lineText += ' ' + word;
    else { out.push(lineText); lineText = word; }
  }
  if (lineText) out.push(lineText);
  return out;
}

function paragraph(str, options = {}) {
  const size = options.size ?? 10.2;
  const leading = options.leading ?? 14;
  const color = options.color ?? '#344b65';
  const limit = options.limit ?? Math.floor(525 / (size * 0.49));
  for (const row of wrap(str, limit)) { text(row, M, y, size, color); y += leading; }
  y += options.after ?? 5;
}

function heading(str, level = 1) {
  const size = level === 1 ? 14 : 11;
  y += 3;
  text(str, M, y, size, level === 1 ? '#143d70' : '#126b61', 'F2');
  y += level === 1 ? 21 : 17;
}

function bullet(str) {
  text('•', M + 2, y, 10, '#2279bc', 'F2');
  const lines = wrap(str, 84);
  lines.forEach((row, i) => { text(row, M + 15, y + i * 13, 9.5, '#344b65'); });
  y += lines.length * 13 + 3;
}

function codeBlock(lines, options = {}) {
  const x = M;
  const width = 516;
  const limit = options.limit ?? 94;
  const rows = lines.flatMap(row => wrap(row || ' ', limit));
  const size = options.size ?? 8.2;
  const leading = options.leading ?? 11.2;
  const height = rows.length * leading + 14;
  rect(x, y, width, height, '#f1f5f9', '#d6deea', 0.8);
  let cy = y + 14;
  for (const row of rows) { text(row, x + 10, cy, size, '#21354d', 'F3'); cy += leading; }
  y += height + 8;
}

function table(headers, rows, widths, options = {}) {
  const fontSize = options.fontSize ?? 8.4;
  const leading = options.leading ?? 10.5;
  const limitPerCol = widths.map(w => Math.max(9, Math.floor((w - 12) / (fontSize * 0.48))));
  const headerHeight = 24;
  rect(M, y, widths.reduce((a, b) => a + b, 0), headerHeight, '#e8eff8', '#cbd5e1', 0.7);
  let x = M;
  headers.forEach((h, i) => { text(h, x + 6, y + 16, fontSize, '#143d70', 'F2'); x += widths[i]; });
  y += headerHeight;
  for (const row of rows) {
    const cells = row.map((cell, i) => wrap(cell, limitPerCol[i]));
    const lines = Math.max(...cells.map(c => c.length));
    const rh = Math.max(26, lines * leading + 12);
    rect(M, y, widths.reduce((a, b) => a + b, 0), rh, '#ffffff', '#d8e0ea', 0.5);
    x = M;
    cells.forEach((cell, i) => {
      cell.forEach((s, j) => text(s, x + 6, y + 14 + j * leading, fontSize, '#344b65'));
      x += widths[i];
    });
    y += rh;
  }
  y += 7;
}

function startPage(title, subtitle = '') {
  ops = [];
  rect(0, 0, W, H, '#ffffff');
  rect(0, 0, W, 9, '#173f73');
  text('DESARROLLO DE APLICACIONES EMPRESARIALES  /  LABORATORIO 13', M, 34, 8, '#66788e', 'F2');
  text(title, M, 66, 19, '#102d52', 'F2');
  if (subtitle) text(subtitle, M, 84, 9, '#66788e');
  line(M, 94, W - M, 94, '#d9e1eb', 0.8);
  y = 112;
}

function endPage() {
  line(M, 752, W - M, 752, '#d9e1eb', 0.7);
  text('PikaFit · Informe adaptado al proyecto integrador · Sección C24T', M, 770, 7.5, '#78889c');
  text(`Página ${pages.length + 1}`, W - M - 48, 770, 7.5, '#78889c');
  pages.push(ops.join('\n'));
}

// Portada
ops = [];
rect(0, 0, W, H, '#f4f7fb');
rect(0, 0, W, 252, '#123a68');
rect(M, 54, 52, 52, '#2ba897');
text('P', M + 17, 88, 26, '#ffffff', 'F2');
text('PROYECTO INTEGRADOR · PIKAFIT', M, 158, 11, '#a6c7e8', 'F2');
text('Laboratorio 13', M, 203, 31, '#ffffff', 'F2');
text('Aplicaciones empresariales aplicadas a PikaFit', M, 232, 14, '#e5eef8');
text('Curso: Desarrollo de Aplicaciones Empresariales', M, 318, 12, '#173f73', 'F2');
text('Estudiante: Jesús Castillo', M, 351, 11, '#344b65');
text('Sección: C24T', M, 376, 11, '#344b65');
text('Proyecto integrador: PikaFit', M, 401, 11, '#344b65');
rect(M, 454, 516, 104, '#e8f4f3', '#afd9d3', 1);
text('Criterio de adaptación', M + 14, 480, 10, '#126b61', 'F2');
const coverNote = wrap('El laboratorio se desarrolla sobre el proyecto indicado por el docente. Se documenta la arquitectura real de PikaFit: API Node/Express, MongoDB, web HTML/JavaScript y aplicación Android Kotlin.', 92);
coverNote.forEach((r, i) => text(r, M + 14, 502 + i * 15, 9, '#344b65'));
text('Repositorio del proyecto', M, 614, 9, '#66788e', 'F2');
text('github.com/JesusCastillo2026/PikaFit-Proyecto-Integrador', M, 635, 9, '#173f73');
text('Informe de desarrollo y documentación técnica · 24 de noviembre de 2026', M, 724, 8.5, '#66788e');
endPage();

// Pág. 2: objetivo, método y stack real
startPage('Objetivo y alcance', 'Ejercicios del laboratorio resueltos con el proyecto integrador PikaFit');
heading('Objetivo del trabajo');
paragraph('Analizar los módulos y roles de PikaFit; redactar requisitos verificables y reglas de negocio; describir la arquitectura y el flujo de emisión/validación de pases médicos; relacionar las rutas de la API con las pantallas; y documentar la estructura de servidor, web y Android para que el sistema pueda evolucionar de forma organizada.');
heading('Cómo se adaptó la guía');
paragraph('La guía ofrece ejemplos de Django y React, pero el repositorio consultado de PikaFit no usa esas tecnologías. Para responder a la indicación del docente y mantener fidelidad al proyecto, el análisis se hizo sobre el código actual: Express agrupa las rutas API, MongoDB almacena las colecciones, la web consume la API con fetch y Android se comunica mediante un cliente HTTP Kotlin.');
rect(M, y, 516, 90, '#fff7e8', '#e8ca8c', 0.8);
text('Importante para interpretar la estructura', M + 12, y + 22, 10, '#805b17', 'F2');
const note = wrap('No se presentan apps Django, componentes React ni Axios como existentes en PikaFit. Sus equivalentes se explican mediante los módulos reales src/, la interfaz Web/ y Android/. Así se evita atribuir al proyecto una implementación que no tiene.', 88);
note.forEach((r, i) => text(r, M + 12, y + 43 + i * 14, 9, '#554b3c'));
y += 108;
heading('Tecnologías identificadas');
bullet('Servidor y API: Node.js, Express y JavaScript; rutas REST con JSON y autenticación por token.');
bullet('Persistencia: MongoDB; src/db.js conecta, crea índices únicos y define índices por consulta.');
bullet('Web: HTML, CSS y JavaScript; Web/app.js centraliza solicitudes fetch y adapta el panel al rol.');
bullet('Móvil: Kotlin y Jetpack Compose; Api.kt envía solicitudes HTTP en Dispatchers.IO.');
bullet('Control de calidad: Node Test Runner mediante npm test; la configuración del proyecto define npm start y npm run seed:admin.');
endPage();

// Pág. 3: comercio, roles y requisitos
startPage('Modelo de negocio, módulos y requisitos', 'Clasificación de PikaFit y criterios comprobables');
heading('Modelo de servicio');
paragraph('PikaFit combina B2C para los socios que usan membresías y funciones de entrenamiento con B2B para gimnasios y clínicas afiliadas que administran sedes, máquinas o validaciones. Web y Android son canales que consumen la misma API; m-commerce y social commerce describen canales, no el tipo de relación comercial.');
heading('Roles clave');
table(['Rol', 'Responsabilidad'], [
  ['SOCIO', 'Consulta la membresía, usa entrenamiento y puede generar un pase si está activo.'],
  ['ADMIN / ADMIN_B2B', 'Administra usuarios, sedes, máquinas, roles y materiales según permisos.'],
  ['MEDICO / RECEPCION_CLINICA', 'Registra evaluaciones o valida pases vinculados a una clínica.'],
  ['ADMIN_CLINICA / AUDITOR', 'Consulta reportes clínicos autorizados o eventos de auditoría.'],
  ['COACH', 'Da seguimiento a los socios asignados y consulta el panel de entrenamiento.'],
], [146, 370], {fontSize:8.4});
heading('Requisitos funcionales prioritarios');
table(['ID', 'Requisito', 'Aceptación resumida'], [
  ['RF-01', 'Acceder con correo o DNI.', 'Token + perfil con datos válidos; rechazo controlado si no.'],
  ['RF-02', 'Mostrar un panel por rol.', 'Cada rol ve únicamente secciones autorizadas.'],
  ['RF-03', 'Emitir pase médico temporal.', 'Solo socio activo; devuelve código/QR y vencimiento.'],
  ['RF-04', 'Validar pase una vez.', 'Uso repetido o vencido se rechaza.'],
  ['RF-05', 'Consultar reportes clínicos.', 'Solo clínica asociada; entrega resumen y CSV.'],
], [38, 197, 281], {fontSize:8.0, leading:9.7});
heading('Requisitos no funcionales');
paragraph('Se definieron controles verificables de autorización por rol (401/403), hash de contraseñas, aislamiento de datos clínicos por clinicId, límite de 32 KB para JSON y accesibilidad/respuesta de interfaz en web y móvil.');
endPage();

// Pág. 4 diagramas
startPage('Arquitectura y operación principal', 'Flujo real: cliente → API Express → MongoDB');
heading('Arquitectura de PikaFit');
box('Web PikaFit', ['HTML / CSS / JS', 'fetch() · sessionStorage'], 50, y, 150, 82, '#e8f1ff', '#78a7ed');
box('Android', ['Kotlin · Compose', 'HTTP / JSON'], 50, y + 102, 150, 82, '#e9f8f2', '#6dc5a0', '#116149');
box('API REST', ['Node.js · Express', 'token · roles · reglas'], 240, y + 46, 155, 92, '#eaf0ff', '#718ce0', '#263b84');
box('MongoDB', ['users · passes', 'clínica · sesiones'], 440, y + 46, 128, 92, '#fff3df', '#e3b25f', '#795119');
arrow(200, y + 42, 240, y + 79);
arrow(200, y + 143, 240, y + 109);
arrow(395, y + 92, 440, y + 92);
text('HTTP + JSON', 196, y + 26, 7.3, '#52637a');
text('driver', 405, y + 82, 7.3, '#52637a');
y += 220;
paragraph('Los clientes no se conectan directamente con MongoDB. Express comprueba identidad, rol y reglas del dominio; la capa de datos consulta o actualiza las colecciones y devuelve una respuesta JSON con el estado HTTP correspondiente.');
heading('Flujo del pase médico');
const flow = [
  ['1', 'Socio autenticado', 'membresía activa'],
  ['2', 'POST /api/medical-passes', 'API autoriza emisión'],
  ['3', 'Pase temporal', 'digest + expiración'],
  ['4', 'Recepción valida', 'clínica y vigencia'],
  ['5', 'Resultado', 'uso único registrado'],
];
let fx = 50;
for (let i = 0; i < flow.length; i++) {
  const [n, a, b] = flow[i];
  rect(fx, y, 94, 62, i === 2 ? '#fff3df' : '#f3f7fc', '#cbd5e1', 0.8);
  text(`${n}. ${a}`, fx + 6, y + 21, 7.2, '#173f73', 'F2');
  text(b, fx + 6, y + 41, 6.9, '#52637a');
  if (i < flow.length - 1) arrow(fx + 94, y + 31, fx + 112, y + 31);
  fx += 112;
}
y += 80;
paragraph('El reporte mensual descarga CSV. El número de tarjeta no debe transitar por la API ni almacenarse en MongoDB; una pasarela externa gestionaría ese dato si PikaFit incorpora pagos.');
endPage();

// Pág. 5: reglas, rutas, entidades
startPage('Reglas de negocio y mapa de rutas', 'La API es la autoridad de permisos y consistencia');
heading('Reglas de negocio');
table(['Regla', 'Aplicación', 'Previene'], [
  ['Membresía activa requerida para emitir pase.', 'Express: middleware de membresía.', 'Pase a socio vencido.'],
  ['Pase vence y se consume una sola vez.', 'API + medical_passes.', 'Reutilización o duplicado.'],
  ['Ruta clínica exige rol y clinicId asociado.', 'Autenticación + autorización Express.', 'Lectura entre clínicas.'],
  ['Contraseña se guarda como hash; secretos quedan en servidor.', 'Módulo auth/config.', 'Filtración de credenciales.'],
  ['La validación siempre se repite en servidor.', 'Controlador API.', 'Manipulación desde el navegador.'],
], [190, 165, 161], {fontSize:7.8, leading:9.5});
heading('Mapa de rutas API e interfaz');
table(['Método / API', 'Uso principal', 'Pantalla'], [
  ['POST /api/auth/login', 'Autenticar usuario.', 'Acceso web / Android'],
  ['GET /api/me', 'Consultar perfil y rol.', 'Panel personal'],
  ['POST /api/medical-passes', 'Emitir pase vigente.', 'Panel socio'],
  ['POST /api/clinic/passes/validate', 'Validar QR/código.', 'Recepción'],
  ['GET /api/clinic/passes/history', 'Consultar validaciones.', 'Admin clínica'],
  ['GET /api/clinic/reports/monthly.csv', 'Exportar actividad.', 'Reporte clínico'],
  ['GET/POST /api/sites', 'Consultar/crear sedes.', 'Admin B2B'],
], [210, 190, 116], {fontSize:7.7, leading:9.2});
heading('Entidades del dominio');
paragraph('Colecciones verificadas en el esquema del proyecto: users, medical_passes, role_audit, membership_notifications, medical_evaluations, sites, machines, exercises, routines y workout_sessions. La entidad principal del flujo es medical_passes y se relaciona con la identidad del socio y con la clínica que la valida.');
endPage();

// Pág. 6 snippets server y web
startPage('Código explicado: autorización y cliente web', 'Fragmentos transcritos de src/server.js y Web/app.js');
heading('1. Emitir pase solo a un usuario autenticado y activo');
paragraph('La ruta aplica autenticación y validación de membresía antes de crear el pase. El helper encapsula la creación y la respuesta 201 señala que se generó un recurso nuevo.');
codeBlock([
  "app.post('/api/medical-passes', authenticate, activeMembership, asyncRoute(async (req, res) => {",
  '  const pass = await createPass(req.user);',
  '  res.status(201).json({ pass });',
  '}));',
], {size:8.0, limit:100});
paragraph('La secuencia muestra por qué la regla se impone en el servidor y no depende de que la web o Android oculten un botón.');
heading('2. Cliente web que centraliza la solicitud');
paragraph('Web/app.js crea una función api(path, options) con fetch. Añade el encabezado de contenido y, si existe, el token Bearer; luego trata la respuesta y convierte un HTTP no exitoso en un error legible.');
codeBlock([
  'async function api(path, options = {}) {',
  '  const response = await fetch(path, {',
  '    ...options,',
  '    headers: { "Content-Type": "application/json",',
  '      ...(token ? { Authorization: `Bearer ${token}` } : {}),',
  '      ...options.headers },',
  '  });',
  '  const result = await response.json().catch(() => ({}));',
  '  if (!response.ok) throw new Error(result.error || "Solicitud fallida");',
  '  return result;',
  '}',
], {size:7.5, leading:10.4, limit:100});
paragraph('La interfaz separa la solicitud HTTP de cada formulario o panel. El token se añade automáticamente y el servidor conserva la decisión final sobre permisos.');
endPage();

// Pág. 7 snippets mongo android
startPage('Código explicado: datos e integración móvil', 'Fragmentos de src/db.js y Android/.../Api.kt');
heading('3. Índices que protegen consistencia y consulta');
paragraph('Al iniciar la conexión, src/db.js asegura índices. El correo es único; el digest del pase también, y el campo de retención tiene TTL para limpiar registros que ya cumplieron su período definido.');
codeBlock([
  "db.collection('users').createIndex({ email: 1 }, { unique: true }),",
  "db.collection('medical_passes').createIndex({ tokenDigest: 1 }, { unique: true }),",
  "db.collection('medical_passes').createIndex({ retentionUntil: 1 }, { expireAfterSeconds: 0 }),",
], {size:7.7, limit:100});
paragraph('Los índices únicos evitan duplicados para las claves declaradas y los índices de consulta ayudan al acceso. El índice TTL no reemplaza la validación de expiración de la lógica de negocio.');
heading('4. Cliente Android y trabajo de red');
paragraph('Api.kt modela la respuesta y realiza la petición fuera del hilo principal. La función createPass delega al método request, que agrega token y procesa HTTP/JSON.');
codeBlock([
  'suspend fun createPass(token: String): PassResult = request(',
  '  "/api/medical-passes", method = "POST", token = token,',
  ').let { gson.fromJson(it, PassEnvelope::class.java).pass }',
  '',
  '): String = withContext(Dispatchers.IO) {',
  '  val connection = URL(BuildConfig.API_BASE_URL + path).openConnection()',
  '  // configura método, token, JSON y tiempos de espera',
  '}',
], {size:7.8, limit:100});
paragraph('Dispatchers.IO evita bloquear la interfaz Compose mientras responde la red. El cliente transforma la respuesta JSON en objetos Kotlin y lanza un error controlado ante respuestas HTTP fallidas.');
heading('Fuentes de código');
paragraph('Repositorio PikaFit: github.com/JesusCastillo2026/PikaFit-Proyecto-Integrador. Archivos citados: src/server.js, src/db.js, Web/app.js y Android/app/src/main/java/com/pikafit/mobile/Api.kt.');
endPage();

// Pág. 8 verificación y conclusión
startPage('Verificación, evidencias y conclusión', 'Entrega reproducible y límites de esta documentación');
heading('Procedimiento para obtener evidencias de ejecución');
codeBlock([
  'Set-Location Semana_13/PikaFit',
  'npm ci',
  'Copy-Item .env.example .env',
  '# Completar .env local sin compartir secretos',
  'npm test',
  'npm start',
], {size:8.5, limit:100});
paragraph('Con MongoDB ejecutándose, npm start conecta la API y sirve la web en localhost. Los diagramas incluidos sintetizan la arquitectura, la estructura de carpetas y el flujo del pase médico, según el código revisado; no son capturas de pantalla de una ejecución.');
heading('Archivos de código que se incluyen en Semana 13');
paragraph('Abre Semana_13/PikaFit en VS Code. En src/users.js identifica ROLES; en src/auth.js revisa authenticate, requireRole y activeMembership; en src/server.js ubica las rutas protegidas; en src/passes.js sigue emisión y validación; y en src/db.js observa conexión e índices de MongoDB. La guía GUIA_LABORATORIO_13.md contiene el recorrido para exponerlo.');
heading('Evidencias incluidas y estado');
bullet('Diagrama de arquitectura web/Android/API/MongoDB basado en las fuentes del repositorio.');
bullet('Diagrama del flujo del pase médico y esquema de estructura real de carpetas.');
bullet('Copia del proyecto ejecutable y guía con las ubicaciones de roles, permisos, API, pases y MongoDB.');
bullet('No se adjuntan capturas de una ejecución local en este informe: no se inició PikaFit ni se conectó a MongoDB en esta sesión.');
heading('Conclusión personal');
paragraph('Al realizar este laboratorio comprendí que primero debo entender la estructura real del proyecto antes de proponer cambios. En PikaFit, la web y Android cumplen funciones distintas, pero ambas se comunican con la API, que valida los permisos y aplica las reglas antes de consultar MongoDB. También identifiqué que la documentación de rutas, roles y entidades ayuda a mantener el sistema ordenado y a evitar errores de acceso.');
heading('Referencias del proyecto');
paragraph('Repositorio integrador: https://github.com/JesusCastillo2026/PikaFit-Proyecto-Integrador');
paragraph('README fuente, src/server.js, src/db.js, Web/app.js, Android/.../Api.kt y MongoDB Compass/esquemas/colecciones.json.');
endPage();

function makePdf(streams) {
  const objects = [];
  const addObject = body => { objects.push(Buffer.from(body, 'binary')); return objects.length; };
  const catalogId = addObject('');
  const pagesId = addObject('');
  const font1Id = addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
  const font2Id = addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
  const font3Id = addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>');
  const pageIds = [];
  for (const content of streams) {
    const streamBuf = Buffer.from(content, 'ascii');
    const contentId = addObject(`<< /Length ${streamBuf.length} >>\nstream\n${streamBuf.toString('binary')}\nendstream`);
    const pageId = addObject(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /Font << /F1 ${font1Id} 0 R /F2 ${font2Id} 0 R /F3 ${font3Id} 0 R >> >> /Contents ${contentId} 0 R >>`);
    pageIds.push(pageId);
  }
  objects[catalogId - 1] = Buffer.from(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`, 'binary');
  objects[pagesId - 1] = Buffer.from(`<< /Type /Pages /Kids [${pageIds.map(id => `${id} 0 R`).join(' ')}] /Count ${pageIds.length} >>`, 'binary');
  const chunks = [Buffer.from('%PDF-1.4\n%âãÏÓ\n', 'binary')];
  const offsets = [0];
  let offset = chunks[0].length;
  objects.forEach((body, index) => {
    offsets.push(offset);
    const obj = Buffer.concat([Buffer.from(`${index + 1} 0 obj\n`, 'ascii'), body, Buffer.from('\nendobj\n', 'ascii')]);
    chunks.push(obj);
    offset += obj.length;
  });
  const xrefOffset = offset;
  let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i < offsets.length; i++) xref += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  xref += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  chunks.push(Buffer.from(xref, 'ascii'));
  return Buffer.concat(chunks);
}

const pdf = makePdf(pages);
const out = path.join(__dirname, 'Informe_Laboratorio_13_PikaFit.pdf');
fs.writeFileSync(out, pdf);
console.log(`PDF generado: ${out} (${pdf.length} bytes; ${pages.length} páginas)`);
