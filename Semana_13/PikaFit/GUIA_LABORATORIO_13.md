# Guía para explicar el Laboratorio 13 con PikaFit

Esta carpeta contiene una copia del código fuente público de [PikaFit-Proyecto-Integrador](https://github.com/JesusCastillo2026/PikaFit-Proyecto-Integrador), revisión `ec57ff5f5615f094eaeaae5f388b54c96bd22994`. El archivo `.env` no está incluido. La guía relaciona los temas del laboratorio con archivos que puedes abrir en Visual Studio Code.

## Abrir y ejecutar

1. En VS Code, selecciona **Archivo > Abrir carpeta** y abre `Semana_13/PikaFit`.
2. Comprueba que MongoDB esté instalado y en ejecución. MongoDB Compass es opcional para revisar las colecciones.
3. En una terminal abierta en esta carpeta, instala las dependencias y crea tu configuración local:

   ```powershell
   npm ci
   Copy-Item .env.example .env
   ```

4. Edita `.env` en tu equipo. Conserva el URI local de MongoDB o coloca el que uses; cambia `JWT_SECRET`, `PASS_SECRET` y `ADMIN_SEED_PASSWORD` por valores propios. No compartas ni subas el archivo `.env`.
5. Crea la cuenta administradora y ejecuta la aplicación:

   ```powershell
   npm run seed:admin
   npm start
   ```

6. Abre `http://localhost:3000`. Inicia sesión con el correo y la contraseña definidos localmente en `.env`. Desde el panel de administración podrás crear usuarios de prueba y asignar roles. Usa únicamente datos ficticios durante la exposición.

La app móvil es un cliente adicional: ábrela en Android Studio desde `Semana_13/PikaFit/Android`. Para ejecutar Android y la API a la vez, sigue el apartado Android del `README.md` de esta carpeta y usa el puerto indicado allí.

## Dónde identificar cada tema

| Tema para explicar | Archivo | Qué buscar |
|---|---|---|
| Roles disponibles | `src/users.js` | `ROLES`: constantes que enumeran los roles del sistema. |
| Autenticación | `src/auth.js` | `login`, `authenticate`: contraseña, token Bearer e identidad de la sesión. |
| Autorización por rol | `src/auth.js` | `requireRole(...roles)`: compara el rol de la sesión y responde 403 si no está permitido. |
| Regla de membresía | `src/auth.js` | `activeMembership`: restringe la emisión del pase a un socio con membresía vigente. |
| Rutas y roles permitidos | `src/server.js` | Busca `app.get`, `app.post`, `authenticate`, `requireRole` y `activeMembership`. |
| Emisión y validación | `src/passes.js` | `createPass`, `validatePass`, vencimiento, consumo de un solo uso e historial. |
| Persistencia e índices | `src/db.js` | `connect`, colecciones e índices MongoDB. |
| Llamadas de la web | `Web/app.js` | Busca `fetch(` y `async function api`; ahí se agrega la sesión y se procesa la respuesta. |
| Llamadas de Android | `Android/app/src/main/java/com/pikafit/mobile/Api.kt` | Funciones del cliente HTTP; comprueba que la red se ejecute en `Dispatchers.IO`. |
| Esquemas MongoDB | `MongoDB Compass/esquemas/colecciones.json` | Campos y colecciones de referencia para inspeccionar en Compass. |

### Recorrido breve de roles y pases

1. En `src/users.js`, muestra los nombres de roles reconocidos por la aplicación.
2. En `src/auth.js`, explica que `authenticate` valida el token y carga al usuario; `requireRole` decide si su rol puede continuar.
3. En `src/server.js`, localiza `POST /api/medical-passes`: pasa por `authenticate` y `activeMembership` antes de emitir. Luego muestra `POST /api/clinic/passes/validate`, que exige `RECEPCION_CLINICA`.
4. En `src/passes.js`, sigue cómo se crea el pase y cómo se verifica su vencimiento y su uso previo.
5. En `src/db.js`, señala que los datos e índices se guardan en MongoDB. Los clientes web y Android consumen la API; no consultan la base directamente.

## Qué explicar al profesor

> “En el Laboratorio 13 analicé el proyecto integrador PikaFit. Aquí puedo señalar los roles en `src/users.js`, la autenticación y autorización en `src/auth.js`, las rutas protegidas en `src/server.js`, el proceso de pases en `src/passes.js` y la persistencia en `src/db.js`. La web y Android consumen la API; el servidor verifica permisos antes de trabajar con MongoDB. La carpeta contiene el código fuente del proyecto para abrirlo y recorrerlo en VS Code.”

## Alcance y seguridad

La copia corresponde a la revisión indicada arriba y se conserva el código del proyecto; esta guía agrega instrucciones para la exposición. No incluye dependencias instaladas, base de datos con cuentas, claves ni `.env`. Para ejecutarlo, cada integrante configura su propio entorno y crea usuarios de prueba. Las funciones que dependen de servicios externos requieren las credenciales correspondientes; no son necesarias para mostrar roles, rutas y flujo de pases.
