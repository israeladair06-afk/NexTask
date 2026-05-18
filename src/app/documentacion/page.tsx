'use client';

import React, { useState } from 'react';
import { BookOpen, ExternalLink, Home, BookMarked, Code, Server, Shield, Users, Github, ArrowLeft, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/cn';

/* ============================================================
   DATOS DE LA DOCUMENTACIÓN
   Contenido estructurado de todos los documentos del proyecto.
   ============================================================ */

interface SubSeccion {
  id: string;
  titulo: string;
  contenido: React.ReactNode;
}

interface Seccion {
  id: string;
  titulo: string;
  icono: React.ReactNode;
  descripcion: string;
  subsecciones: SubSeccion[];
}

const DOCUMENTACION: Seccion[] = [
  {
    id: 'frontend',
    titulo: 'Frontend',
    icono: <Code className="h-5 w-5" />,
    descripcion: 'Dashboard, componentes, temas y convenciones UI',
    subsecciones: [
      {
        id: 'frontend-intro',
        titulo: '🎨 Documentación del Frontend',
        contenido: (
          <div className="space-y-6">
            <div className="rounded-2xl border-l-4 border-primary bg-card/50 p-6">
              <h3 className="text-lg font-semibold">Responsabilidad</h3>
              <p className="mt-2 text-muted-foreground">
                El frontend contiene toda la experiencia visual del dashboard administrativo ITSM/helpdesk.
                Su responsabilidad es presentar la interfaz de usuario, manejar la navegación y
                proporcionar los componentes reutilizables.
              </p>
              <p className="mt-2 text-sm text-yellow-500">
                ⚠️ Estado actual: UI base placeholder. No hay lógica de negocio compleja todavía.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold mb-3">📁 Carpetas del frontend</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ['src/app', 'Rutas, layouts y páginas del App Router'],
                  ['src/components/navegacion', 'Sidebar, header y layout del dashboard'],
                  ['src/components/ui', 'Componentes base estilo shadcn/ui'],
                  ['src/components/', 'Componentes reutilizables globales'],
                  ['src/images/', 'Imágenes estáticas, logos y assets de marca'],
                  ['src/features/<modulo>', 'Componentes específicos por módulo'],
                  ['src/hooks/', 'Hooks React personalizados'],
                  ['src/styles/', 'Estilos globales y variables CSS'],
                  ['src/config/', 'Proveedores, metadata y constantes'],
                ].map(([carpeta, desc]) => (
                  <div key={carpeta} className="rounded-xl border bg-card p-4">
                    <code className="text-sm font-mono text-primary">{carpeta}</code>
                    <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-base font-semibold mb-3">🖥️ Dashboard base</h3>
              <div className="overflow-hidden rounded-xl border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">Componente</th>
                      <th className="px-4 py-3 text-left font-medium">Archivo</th>
                      <th className="px-4 py-3 text-left font-medium">Descripción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {[
                      ['Layout', 'layout-dashboard.tsx', 'Layout principal del dashboard'],
                      ['Sidebar', 'sidebar.tsx', 'Navegación lateral colapsable'],
                      ['Header', 'header.tsx', 'Barra superior con búsqueda y tema'],
                      ['Páginas', '<ruta>/page.tsx', 'Cada sección con su placeholder'],
                    ].map(([comp, arch, desc]) => (
                      <tr key={comp} className="hover:bg-muted/30">
                        <td className="px-4 py-3 font-medium">{comp}</td>
                        <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{arch}</td>
                        <td className="px-4 py-3 text-muted-foreground">{desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-base font-semibold mb-3">🌗 Tema global</h3>
              <div className="rounded-xl border bg-card p-4">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <code className="text-primary text-xs">src/config/tema.tsx</code> — Proveedor y hook useTema
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <code className="text-primary text-xs">src/config/proveedores.tsx</code> — Proveedor raíz
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <code className="text-primary text-xs">src/styles/globals.css</code> — Variables CSS
                  </li>
                </ul>
                <p className="mt-3 text-xs text-muted-foreground">
                  Dark mode predeterminado · Persistencia en localStorage · Soporte tema system
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
              <h3 className="text-sm font-semibold text-primary">📐 Convenciones de UI</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>✅ Usar clases Tailwind simples y legibles</li>
                <li>✅ No duplicar estilos — crear componentes reutilizables</li>
                <li>✅ Mantener layouts responsive (mobile-first)</li>
                <li>✅ Textos placeholder claros con comentarios tipo "Aquí irá..."</li>
                <li>✅ Usar <code className="text-primary text-xs">cn()</code> para clases condicionales</li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        id: 'frontend-componentes',
        titulo: '🧩 Guía de Componentes',
        contenido: (
          <div className="space-y-6">
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ['Componentes atómicos', 'src/components/ui/', 'Botones, inputs, tarjetas'],
                ['Componentes compuestos', 'src/components/', 'Navegación, layouts'],
                ['Componentes de módulo', 'src/features/<m>/', 'Lógica específica del dominio'],
              ].map(([tipo, ruta, desc]) => (
                <div key={tipo} className="rounded-xl border bg-card p-4">
                  <h4 className="text-sm font-semibold">{tipo}</h4>
                  <code className="mt-1 block text-xs text-primary">{ruta}</code>
                  <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-sm font-semibold mb-3">📋 Estructura base de un componente</h3>
              <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs leading-relaxed">
                <code>{`'use client'; // Solo si usa hooks del cliente

import React from 'react';
import { cn } from '@/lib/cn';

interface ComponenteProps {
  titulo: string;
  descripcion?: string;
  children?: React.ReactNode;
}

export function Componente({ titulo, descripcion, children }: ComponenteProps) {
  return (
    <div className={cn('rounded-xl border bg-card p-4')}>
      <h3 className="text-sm font-semibold">{titulo}</h3>
      {descripcion && (
        <p className="mt-1 text-xs text-muted-foreground">{descripcion}</p>
      )}
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}`}</code>
              </pre>
            </div>

            <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
              <h3 className="text-sm font-semibold text-primary">✅ Buenas prácticas</h3>
              <div className="mt-3 grid gap-2 sm:grid-cols-2 text-sm text-muted-foreground">
                <span>✅ TypeScript con interfaces explícitas</span>
                <span>✅ Documentar props con JSDoc</span>
                <span>✅ Usar cn() para clases condicionales</span>
                <span>✅ Nombres en español</span>
                <span>✅ Un componente por archivo</span>
                <span>❌ Evitar any — definir tipos precisos</span>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'frontend-dashboard',
        titulo: '🖥️ Dashboard Base',
        contenido: (
          <div className="space-y-6">
            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-sm font-semibold mb-3">🧭 Sidebar</h3>
              <div className="overflow-hidden rounded-xl border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-2 text-left">Grupo</th>
                      <th className="px-4 py-2 text-left">Sección</th>
                      <th className="px-4 py-2 text-left">Ruta</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-xs">
                    {[
                      ['General', 'Dashboard', '/dashboard'],
                      ['General', 'Base de conocimiento', '/base-conocimiento'],
                      ['Operación', 'Tickets', '/tickets'],
                      ['Operación', 'Usuarios', '/usuarios'],
                      ['Análisis', 'Reportes', '/reportes'],
                      ['Sistema', 'Configuración', '/configuracion'],
                    ].map(([grupo, seccion, ruta]) => (
                      <tr key={ruta} className="hover:bg-muted/30">
                        <td className="px-4 py-2 text-muted-foreground">{grupo}</td>
                        <td className="px-4 py-2 font-medium">{seccion}</td>
                        <td className="px-4 py-2 font-mono text-muted-foreground">{ruta}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                ✅ Colapsable · Grupos visuales · Ruta activa · Tooltips · Responsive
              </p>
            </div>

            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-sm font-semibold mb-3">📌 Header</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Menú hamburguesa (visible en móvil)
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Título y subtítulo del panel
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Búsqueda global placeholder
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Toggle de tema dark/light
                </li>
              </ul>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'backend',
    titulo: 'Backend',
    icono: <Server className="h-5 w-5" />,
    descripcion: 'API, base de datos, Prisma y servicios',
    subsecciones: [
      {
        id: 'backend-intro',
        titulo: '⚙️ Documentación del Backend',
        contenido: (
          <div className="space-y-6">
            <div className="rounded-2xl border-l-4 border-primary bg-card/50 p-6">
              <h3 className="text-lg font-semibold">Responsabilidad</h3>
              <p className="mt-2 text-muted-foreground">
                El backend contiene toda la lógica del servidor: rutas API, conexión a base de datos,
                servicios externos, autenticación y procesamiento de datos.
              </p>
              <p className="mt-2 text-sm text-yellow-500">
                ⚠️ Estado actual: Estructura preparada. No hay lógica de negocio compleja todavía.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold mb-3">📁 Carpetas del backend</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ['src/server/', 'Utilidades y lógica server-only'],
                  ['src/services/', 'Clientes para APIs externas'],
                  ['src/lib/db/', 'Cliente Prisma y configuración'],
                  ['src/types/', 'Tipos compartidos'],
                  ['src/features/<m>/', 'Casos de uso por dominio'],
                  ['src/app/api/', 'Rutas API de Next.js'],
                ].map(([carpeta, desc]) => (
                  <div key={carpeta} className="rounded-xl border bg-card p-4">
                    <code className="text-sm font-mono text-primary">{carpeta}</code>
                    <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-base font-semibold mb-3">🗄️ Base de datos</h3>
              <div className="rounded-xl border bg-card p-5">
                <p className="text-sm font-medium mb-2">PostgreSQL con Docker Compose</p>
                <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs">
                  <code>{`POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=nex_task_dev
PG_PORT=5432
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/nex_task_dev`}</code>
                </pre>

                <p className="text-sm font-medium mt-4 mb-2">Comandos Prisma</p>
                <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs">
                  <code>{`pnpm prisma init           # Inicializar
pnpm prisma migrate dev    # Crear migración
pnpm prisma generate       # Generar cliente
pnpm prisma studio         # UI visual`}</code>
                </pre>
              </div>
            </div>

            <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
              <h3 className="text-sm font-semibold text-primary">📋 Reglas del backend</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>✅ No escribir queries desde componentes React</li>
                <li>✅ No mezclar lógica de dominio con presentación</li>
                <li>✅ Validar entradas con Zod</li>
                <li>✅ Centralizar clientes externos en src/services/</li>
                <li>✅ Mantener secrets en variables de entorno</li>
                <li>✅ TypeScript estricto en todo el backend</li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        id: 'backend-api',
        titulo: '🔌 Guía de APIs',
        contenido: (
          <div className="space-y-6">
            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-sm font-semibold mb-3">🏗️ Estructura de rutas</h3>
              <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs">
                <code>{`src/app/api/
├── <recurso>/           # Plural, en español
│   ├── route.ts        # GET (listar), POST (crear)
│   └── [id]/route.ts   # GET, PUT, DELETE`}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3">📝 Formato de respuestas</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border bg-card p-4">
                  <p className="text-xs font-semibold text-green-500 mb-2">✅ Éxito</p>
                  <pre className="text-xs text-muted-foreground">{`{
  "data": [...],
  "meta": { "total": 100 }
}`}</pre>
                </div>
                <div className="rounded-xl border bg-card p-4">
                  <p className="text-xs font-semibold text-red-500 mb-2">❌ Error</p>
                  <pre className="text-xs text-muted-foreground">{`{
  "error": {
    "codigo": "VALIDATION_ERROR",
    "mensaje": "Datos inválidos"
  }
}`}</pre>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
              <h3 className="text-sm font-semibold text-primary">Códigos HTTP</h3>
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                {[
                  ['200', 'Éxito'],
                  ['201', 'Creado'],
                  ['400', 'Validación'],
                  ['401', 'No auth'],
                  ['403', 'No autorizado'],
                  ['404', 'No encontrado'],
                  ['500', 'Error interno'],
                ].map(([cod, desc]) => (
                  <div key={cod} className="rounded-lg bg-card border p-2 text-center">
                    <span className="font-mono text-primary text-xs">{cod}</span>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'backend-db',
        titulo: '🗄️ Base de Datos',
        contenido: (
          <div className="space-y-6">
            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-sm font-semibold mb-3">🐘 PostgreSQL con Docker</h3>
              <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs">
                <code>{`# Iniciar solo PostgreSQL
docker-compose up db -d

# Conectarse
docker-compose exec db psql -U postgres -d nex_task_dev

# Ver logs
pnpm docker:logs db`}</code>
              </pre>
            </div>

            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-sm font-semibold mb-3">🔧 Schema de ejemplo (Prisma)</h3>
              <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs leading-relaxed">
                <code>{`model Usuario {
  id        String   @id @default(cuid())
  email     String   @unique
  nombre    String
  password  String
  rol       Rol      @default(USUARIO)
  activo    Boolean  @default(true)
  tickets   Ticket[]
}

model Ticket {
  id          String   @id @default(cuid())
  titulo      String
  estado      Estado   @default(ABIERTO)
  prioridad   Prioridad @default(MEDIA)
  usuarioId   String
  usuario     Usuario  @relation(fields: [usuarioId], references: [id])
}

enum Rol { ADMIN AGENTE USUARIO }
enum Estado { ABIERTO EN_PROGRESO RESUELTO CERRADO }
enum Prioridad { BAJA MEDIA ALTA CRITICA }`}</code>
              </pre>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'infraestructura',
    titulo: 'Infraestructura',
    icono: <Shield className="h-5 w-5" />,
    descripcion: 'Docker, PostgreSQL y herramientas',
    subsecciones: [
      {
        id: 'infra-quickstart',
        titulo: '⚡ Inicio Rápido (5 min)',
        contenido: (
          <div className="space-y-6">
            <div className="rounded-2xl border-l-4 border-green-500 bg-green-500/5 p-6">
              <h3 className="text-lg font-semibold text-green-500">🚀 Bienvenido al equipo</h3>
              <p className="mt-2 text-muted-foreground">
                Solo necesitas <strong>Docker</strong>. Aquí cómo levantar el proyecto en 5 minutos.
              </p>
            </div>

            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-sm font-semibold mb-3">1️⃣ Requisitos</h3>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Solo instalación necesaria:</p>
                <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs">
                  <code>{`docker --version      # 24.0.0+
docker-compose --version  # 2.20.0+

📥 Descarga desde: https://docker.com/get-started`}</code>
                </pre>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-sm font-semibold mb-3">2️⃣ Pasos para empezar</h3>
              <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs leading-relaxed">
                <code>{`# Paso 1: Clonar repositorio
git clone <url>
cd nex-task

# Paso 2: Copiar configuración
cp .env.example .env.local

# Paso 3: Levantar servicios ☕ (2-3 min)
docker-compose up --build

# Paso 4: Abrir en navegador
http://localhost:3000 ✅`}</code>
              </pre>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border bg-card p-4">
                <h4 className="text-sm font-semibold text-primary mb-2">✅ Esperado</h4>
                <p className="text-xs text-muted-foreground">
                  Frontend en http://localhost:3000 <br/>
                  PostgreSQL en localhost:5432
                </p>
              </div>
              <div className="rounded-xl border bg-card p-4">
                <h4 className="text-sm font-semibold text-yellow-500 mb-2">⚠️ Primera vez</h4>
                <p className="text-xs text-muted-foreground">
                  Toma 2-3 minutos descargando imágenes y dependencias
                </p>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-sm font-semibold mb-3">🐛 Problemas comunes</h3>
              <div className="space-y-3">
                {[
                  ['Puerto 3000 en uso', 'NEXT_PORT=3001 docker-compose up'],
                  ['Puerto 5432 en uso', 'PG_PORT=5433 docker-compose up'],
                  ['Docker no abre', 'Abre Docker Desktop o: sudo systemctl start docker'],
                  ['Dependencias fallan', 'docker-compose down -v && docker-compose up --build'],
                ].map(([problema, solucion]) => (
                  <div key={problema} className="rounded-lg border bg-muted/30 p-3">
                    <p className="text-xs font-semibold text-red-500">{problema}</p>
                    <code className="text-xs text-muted-foreground mt-1 block">{solucion}</code>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
              <h3 className="text-sm font-semibold text-primary">📚 Siguientes pasos</h3>
              <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                <li>✅ Ver logs: <code className="text-primary">docker-compose logs -f</code></li>
                <li>✅ Acceder BD: <code className="text-primary">docker exec -it nex-task-db-1 psql -U postgres</code></li>
                <li>✅ Prisma Studio: <code className="text-primary">docker exec -it nex-task-frontend-1 pnpm prisma studio</code></li>
                <li>✅ Leer docs: Ve a <strong>Infraestructura → Guía de Docker</strong></li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        id: 'infra-intro',
        titulo: '🐳 Infraestructura',
        contenido: (
          <div className="space-y-6">
            <div className="rounded-2xl border-l-4 border-primary bg-card/50 p-6">
              <h3 className="text-lg font-semibold">Responsabilidad</h3>
              <p className="mt-2 text-muted-foreground">
                La carpeta infra/ y los archivos raíz contienen todo para el entorno de desarrollo,
                despliegue y operación del proyecto.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold mb-3">📁 Archivos de infraestructura</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ['docker-compose.yml', 'Orquestación frontend + PostgreSQL'],
                  ['infra/docker/Dockerfile', 'Imagen Next.js'],
                  ['.env.example', 'Variables de entorno ejemplo'],
                  ['.eslintrc.json', 'Linting TypeScript/React'],
                  ['.prettierrc', 'Formateo automático'],
                  ['tsconfig.json', 'TypeScript strict mode'],
                ].map(([arch, desc]) => (
                  <div key={arch} className="rounded-xl border bg-card p-4">
                    <code className="text-sm font-mono text-primary">{arch}</code>
                    <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-base font-semibold mb-3">📋 Servicios Docker</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border bg-card p-5">
                  <h4 className="text-sm font-semibold text-primary">frontend</h4>
                  <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                    <li>Puerto: 3000</li>
                    <li>Comando: pnpm dev</li>
                    <li>Depende de: db</li>
                  </ul>
                </div>
                <div className="rounded-xl border bg-card p-5">
                  <h4 className="text-sm font-semibold text-primary">db (PostgreSQL)</h4>
                  <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                    <li>Imagen: postgres:15-alpine</li>
                    <li>Puerto: 5432</li>
                    <li>Volumen persistente</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
              <h3 className="text-sm font-semibold text-primary">📋 Buenas prácticas</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>✅ No subir .env.local — solo .env.example versionado</li>
                <li>✅ Mantener .env.example actualizado</li>
                <li>✅ No hardcodear credenciales</li>
                <li>✅ Usar scripts de package.json</li>
                <li>✅ Ejecutar pnpm check antes de commits</li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        id: 'infra-docker',
        titulo: '🐳 Guía de Docker',
        contenido: (
          <div className="space-y-6">
            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-sm font-semibold mb-3">🚀 Comandos principales</h3>
              <div className="overflow-hidden rounded-xl border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-2 text-left">Comando</th>
                      <th className="px-4 py-2 text-left">Descripción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-xs">
                    {[
                      ['pnpm docker:up', 'Construye y levanta servicios'],
                      ['pnpm docker:down', 'Detiene servicios'],
                      ['pnpm docker:logs', 'Muestra logs en tiempo real'],
                      ['pnpm docker:clean', 'Detiene y elimina volúmenes'],
                    ].map(([cmd, desc]) => (
                      <tr key={cmd} className="hover:bg-muted/30">
                        <td className="px-4 py-2 font-mono text-primary">{cmd}</td>
                        <td className="px-4 py-2 text-muted-foreground">{desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-sm font-semibold mb-3">🔄 Flujo de desarrollo</h3>
              <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs">
                <code>{`# 1. Configurar variables
cp .env.example .env.local

# 2. Iniciar servicios
pnpm docker:up

# 3. App en http://localhost:3000
# 4. PostgreSQL en localhost:5432
# 5. Hot-reload automático`}</code>
              </pre>
            </div>

            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-sm font-semibold mb-3">🔧 Solución de problemas</h3>
              <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs">
                <code>{`# Ver logs detallados
pnpm docker:logs

# Reiniciar un servicio
docker-compose restart frontend

# Reconstruir imágenes
docker-compose build --no-cache

# Limpiar todo (borra datos BD)
pnpm docker:clean`}</code>
              </pre>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'equipo',
    titulo: 'Equipo',
    icono: <Users className="h-5 w-5" />,
    descripcion: 'Flujo Git, convenciones y cómo contribuir',
    subsecciones: [
      {
        id: 'equipo-intro',
        titulo: '👥 Trabajo en Equipo',
        contenido: (
          <div className="space-y-6">
            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-sm font-semibold mb-3">📋 Flujo Git recomendado</h3>
              <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs">
                <code>{`# 1. Actualizar main
git checkout main
git pull origin main

# 2. Crear rama por tarea
git checkout -b feature/descripcion-corta

# 3. Trabajar en cambios pequeños
git add .
git commit -m "feat: descripción del cambio"

# 4. Validar antes de subir
pnpm typecheck
pnpm lint
pnpm build

# 5. Subir y crear PR
git push origin feature/descripcion-corta`}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3">📋 Convención de ramas</h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  ['feature/', 'Nueva funcionalidad'],
                  ['fix/', 'Corrección'],
                  ['docs/', 'Documentación'],
                  ['refactor/', 'Mejora interna'],
                  ['chore/', 'Mantenimiento'],
                ].map(([pref, desc]) => (
                  <div key={pref} className="rounded-xl border bg-card p-3">
                    <code className="text-sm font-mono text-primary">{'tipo/descripcion'}</code>
                    <p className="text-xs text-muted-foreground mt-1">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3">📋 Convención de commits</h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  ['feat:', 'Nueva funcionalidad'],
                  ['fix:', 'Corrección de bug'],
                  ['docs:', 'Documentación'],
                  ['style:', 'Formato/estilos'],
                  ['refactor:', 'Mejora interna'],
                  ['chore:', 'Mantenimiento'],
                ].map(([tipo, desc]) => (
                  <div key={tipo} className="rounded-lg border bg-card p-2">
                    <code className="text-xs font-mono text-primary">{tipo}</code>
                    <span className="text-xs text-muted-foreground ml-2">{desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
              <h3 className="text-sm font-semibold text-red-500">❌ Prohibido</h3>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                <li>No crear lógica de negocio dentro de src/app</li>
                <li>No duplicar componentes</li>
                <li>No subir credenciales</li>
                <li>No mezclar cambios grandes no relacionados</li>
                <li>No ignorar errores de TypeScript</li>
              </ul>
            </div>

            <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-5">
              <h3 className="text-sm font-semibold text-green-500">✅ Obligatorio</h3>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                <li>Todo módulo nuevo debe tener README</li>
                <li>Ejecutar pnpm check antes de cada commit</li>
                <li>Seguir la estructura de carpetas establecida</li>
                <li>Usar TypeScript estricto</li>
                <li>Nombres en español</li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        id: 'equipo-contribuir',
        titulo: '🤝 Cómo Contribuir',
        contenido: (
          <div className="space-y-6">
            <div className="rounded-2xl border-l-4 border-primary bg-card/50 p-6">
              <h3 className="text-lg font-semibold">Requisitos del sistema</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  ['Node.js', '18+'],
                  ['pnpm', '8+'],
                  ['Docker', '24+'],
                  ['Git', '2.40+'],
                ].map(([req, ver]) => (
                  <div key={req} className="flex items-center gap-3 rounded-xl bg-background p-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary text-xs font-bold">
                      {req[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{req}</p>
                      <p className="text-xs text-muted-foreground">{ver}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-sm font-semibold mb-3">📋 Proceso de Pull Request</h3>
              <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs">
                <code>{`# 1. Asegúrate de estar al día
git checkout main
git pull origin main
git checkout tu-rama
git rebase main

# 2. Valida tu código
pnpm check
pnpm build

# 3. Sube tu rama
git push origin tu-rama

# 4. Crea PR en GitHub con:
#    - Título descriptivo
#    - Descripción de cambios
#    - Screenshots (si aplica)

# 5. Espera revisión del equipo`}</code>
              </pre>
            </div>

            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-sm font-semibold mb-3">📋 Checklist de contribución</h3>
              <div className="space-y-2 text-sm">
                {[
                  '¿Leíste la documentación del proyecto?',
                  '¿Seguís la convención de ramas?',
                  '¿Seguís la convención de commits?',
                  '¿Ejecutaste pnpm check?',
                  '¿Ejecutaste pnpm build?',
                  '¿Los cambios están documentados?',
                ].map((item) => (
                  <label key={item} className="flex items-center gap-3 rounded-lg bg-muted/30 p-2 cursor-pointer hover:bg-muted/50">
                    <input type="checkbox" className="h-4 w-4 rounded border-primary text-primary" />
                    <span className="text-muted-foreground">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'base',
    titulo: 'Base',
    icono: <BookMarked className="h-5 w-5" />,
    descripcion: 'Stack tecnológico y arquitectura',
    subsecciones: [
      {
        id: 'base-intro',
        titulo: '🏗️ Stack Tecnológico',
        contenido: (
          <div className="space-y-6">
            <div className="rounded-2xl border-l-4 border-primary bg-card/50 p-6">
              <h3 className="text-lg font-semibold">Stack tecnológico</h3>
              <p className="mt-2 text-muted-foreground">
                Decisions tecnológicas tomadas para garantizar un proyecto enterprise moderno y escalable.
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Capa</th>
                    <th className="px-4 py-3 text-left font-medium">Tecnología</th>
                    <th className="px-4 py-3 text-left font-medium">Propósito</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    ['Framework', 'Next.js 15', 'Full-stack SSR + SSG'],
                    ['UI', 'React 19', 'Interfaz declarativa'],
                    ['Lenguaje', 'TypeScript 5.6', 'Seguridad de tipos'],
                    ['Estilos', 'Tailwind 3.4', 'Utility-first responsive'],
                    ['BD', 'PostgreSQL 15', 'Relacional ACID'],
                    ['ORM', 'Prisma 5.8', 'Tipado seguro'],
                    ['Docker', 'Docker + Compose', 'Entornos reproducibles'],
                    ['Paquetería', 'pnpm 8', 'Rápido y eficiente'],
                  ].map(([capa, tec, prop]) => (
                    <tr key={tec} className="hover:bg-muted/30">
                      <td className="px-4 py-3 font-medium">{capa}</td>
                      <td className="px-4 py-3 font-mono text-xs text-primary">{tec}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{prop}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
              <h3 className="text-sm font-semibold text-primary">📋 Buenas prácticas obligatorias</h3>
              <div className="mt-3 grid gap-2 sm:grid-cols-2 text-sm text-muted-foreground">
                <span>✅ TypeScript estricto siempre</span>
                <span>✅ Commits convencionales</span>
                <span>✅ Validación pre-commit</span>
                <span>✅ Ramas por feature</span>
                <span>✅ Documentar decisiones</span>
                <span>✅ No credenciales en código</span>
                <span>✅ Responsabilidad única</span>
                <span>✅ Nombres en español</span>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'base-arquitectura',
        titulo: '🏗️ Arquitectura Detallada',
        contenido: (
          <div className="space-y-6">
            <div className="rounded-2xl border-l-4 border-primary bg-card/50 p-6">
              <h3 className="text-lg font-semibold">Arquitectura por capas</h3>
              <pre className="mt-4 overflow-x-auto rounded-lg bg-muted p-4 text-xs leading-relaxed">
                <code>{`┌─────────────────┐
│   src/app/      │  ← Páginas (composición, NO lógica)
├─────────────────┤
│ src/components/ │  ← UI reutilizable
├─────────────────┤
│ src/features/   │  ← Lógica de dominio
├─────────────────┤
│ src/services/   │  ← Integraciones externas
├─────────────────┤
│ src/server/     │  ← Utilidades server-only
└─────────────────┘`}</code>
              </pre>
            </div>

            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-sm font-semibold mb-3">📁 Estructura completa del proyecto</h3>
              <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs leading-relaxed">
                <code>{`nex-task/
├── src/                    # Código fuente
│   ├── app/                #   App Router
│   ├── components/         #   UI reutilizable
│   │   ├── ui/             #     Botones, tarjetas
│   │   └── navegacion/     #     Sidebar, header
│   ├── features/           #   Módulos por dominio
│   ├── services/           #   Servicios externos
│   ├── server/             #   Código server-only
│   ├── hooks/              #   Hooks React
│   ├── lib/                #   Librerías internas
│   ├── utils/              #   Funciones puras
│   ├── types/              #   Tipos globales
│   ├── styles/             #   Estilos y tema
│   └── config/             #   Configuración
├── Documentacion/          # Documentación
├── infra/                  # Docker, scripts
└── docker-compose.yml      # Servicios`}</code>
              </pre>
            </div>

            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-sm font-semibold mb-3">🔮 Roadmap completo</h3>
              <div className="space-y-3">
                {[
                  ['Base enterprise', '✅ Completado'],
                  ['Autenticación', '📝 Pendiente'],
                  ['Módulo Tickets', '📝 Pendiente'],
                  ['Módulo Usuarios', '📝 Pendiente'],
                  ['Base de conocimiento', '📝 Pendiente'],
                  ['Reportes', '📝 Pendiente'],
                  ['Tiempo real', '📝 Pendiente'],
                ].map(([fase, estado]) => (
                  <div key={fase} className="flex items-center justify-between rounded-xl border bg-card p-3">
                    <span className="text-sm font-medium">{fase}</span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      estado === '✅ Completado'
                        ? 'bg-green-500/10 text-green-500'
                        : 'bg-yellow-500/10 text-yellow-500'
                    }`}>
                      {estado}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-sm font-semibold mb-3">🧩 Arquitectura de módulos (features)</h3>
              <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs">
                <code>{`src/features/<modulo>/
├── components/    # Componentes del módulo
├── services/      # Servicios del módulo
├── types/         # Tipos específicos
├── utils/         # Utilidades
└── README.md      # Documentación`}</code>
              </pre>
            </div>
          </div>
        ),
      },
    ],
  },
];

/* ============================================================
   COMPONENTE PRINCIPAL - Lector de Documentación
   ============================================================ */

export default function PaginaDocumentacion() {
  const [seccionActiva, setSeccionActiva] = useState(DOCUMENTACION[0].id);
  const [subseccionActiva, setSubseccionActiva] = useState(DOCUMENTACION[0].subsecciones[0].id);
  const [sidebarAbierta, setSidebarAbierta] = useState(true);

  const seccion = DOCUMENTACION.find((s) => s.id === seccionActiva)!;
  const subseccion = seccion?.subsecciones.find((s) => s.id === subseccionActiva);

  return (
    <div className="min-h-screen bg-background">
      {/* ========== HEADER ========== */}
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground"
            >
              NT
            </Link>
            <div className="h-4 w-px bg-border" />
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">Documentación</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Volver al dashboard
            </Link>
            <button
              onClick={() => setSidebarAbierta(!sidebarAbierta)}
              className="lg:hidden inline-flex items-center justify-center rounded-lg border bg-card p-2 text-muted-foreground hover:bg-accent"
              aria-label="Abrir menú"
            >
              {sidebarAbierta ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">
        {/* ========== SIDEBAR ========== */}
        <aside
          className={cn(
            'fixed inset-y-14 left-0 z-30 w-64 shrink-0 border-r bg-card transition-all duration-300 lg:sticky lg:block lg:h-[calc(100vh-3.5rem)] lg:overflow-y-auto',
            sidebarAbierta ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          )}
        >
          <nav className="p-3 space-y-1">
            {DOCUMENTACION.map((seccion) => {
              const activa = seccionActiva === seccion.id;
              return (
                <div key={seccion.id} className="space-y-0.5">
                  <button
                    onClick={() => {
                      setSeccionActiva(seccion.id);
                      setSubseccionActiva(seccion.subsecciones[0].id);
                      setSidebarAbierta(false);
                    }}
                    className={cn(
                      'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-all',
                      activa
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    )}
                  >
                    <span className="shrink-0">{seccion.icono}</span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{seccion.titulo}</p>
                      <p className="truncate text-[10px] text-muted-foreground/70">
                        {seccion.descripcion}
                      </p>
                    </div>
                  </button>

                  {activa && (
                    <div className="ml-4 space-y-0.5 border-l pl-2">
                      {seccion.subsecciones.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => {
                            setSubseccionActiva(sub.id);
                            setSidebarAbierta(false);
                          }}
                          className={cn(
                            'flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-xs transition-all',
                            subseccionActiva === sub.id
                              ? 'text-primary font-medium'
                              : 'text-muted-foreground hover:text-foreground'
                          )}
                        >
                          <span className={cn(
                            'h-1 w-1 rounded-full shrink-0',
                            subseccionActiva === sub.id ? 'bg-primary' : 'bg-muted-foreground/30'
                          )} />
                          <span className="truncate">{sub.titulo}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="border-t p-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-accent"
            >
              <Home className="h-3.5 w-3.5" />
              Volver al inicio
            </Link>
          </div>
        </aside>

        {/* ========== OVERLAY MÓVIL ========== */}
        {sidebarAbierta && (
          <div
            className="fixed inset-0 z-20 bg-black/50 lg:hidden"
            onClick={() => setSidebarAbierta(false)}
          />
        )}

        {/* ========== CONTENIDO PRINCIPAL ========== */}
        <main className="min-h-[calc(100vh-3.5rem)] flex-1 overflow-hidden lg:pl-0">
          <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Documentación</span>
              <span className="text-muted-foreground/40">/</span>
              <span className="text-foreground font-medium">{seccion.titulo}</span>
              <span className="text-muted-foreground/40">/</span>
              <span className="text-primary">{subseccion?.titulo.replace(/[🏗️🎨⚙️🐳👥🤝🧩📋🖥️🌗📐✅❌🔌🗄️🔧🚀🔄📁]/g, '').trim()}</span>
            </nav>

            {/* Título */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {subseccion?.titulo}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {seccion.descripcion}
              </p>
            </div>

            {/* Contenido */}
            <div className="prose-container">
              {subseccion?.contenido}
            </div>

            {/* Footer */}
            <div className="mt-12 border-t pt-6">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <p>NexTask — Documentación del proyecto</p>
                <Link
                  href="https://github.com/israeladair06-afk/NexTask"
                  target="_blank"
                  className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}