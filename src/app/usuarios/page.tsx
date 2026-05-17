/**
 * Página del módulo Usuarios (placeholder).
 * Aquí irá la administración completa de usuarios: listado, roles,
 * permisos, equipos, departamentos y perfiles.
 */
import { LayoutDashboard } from '@/components/navegacion/layout-dashboard';
import { Tarjeta, TarjetaDescripcion, TarjetaTitulo } from '@/components/ui/tarjeta';

export default function PaginaUsuarios() {
  return (
    <LayoutDashboard>
      <div className="space-y-6">
        {/* Encabezado */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Usuarios</h1>
          <p className="mt-2 text-muted-foreground">
            Aquí irá la administración de usuarios, roles, permisos y equipos.
          </p>
        </div>

        {/* Contenido placeholder */}
        <div className="grid gap-4 md:grid-cols-2">
          <Tarjeta>
            <TarjetaTitulo>Módulo reservado: Usuarios</TarjetaTitulo>
            <TarjetaDescripcion className="mt-3">
              Base visual para gestión de usuarios sin lógica real por ahora.
            </TarjetaDescripcion>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Listado de usuarios con búsqueda y filtros
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Roles y permisos (Admin, Agente, Usuario)
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Equipos y departamentos
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Estados activo/inactivo
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Integración futura con autenticación y auditoría
              </li>
            </ul>
          </Tarjeta>

          <Tarjeta>
            <TarjetaTitulo>Preparado para integración</TarjetaTitulo>
            <TarjetaDescripcion className="mt-3">
              Este módulo se conectará con:
            </TarjetaDescripcion>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                NextAuth.js para autenticación
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Prisma para modelo de datos
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Módulo de Tickets (asignación)
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Reportes y métricas por usuario
              </li>
            </ul>
          </Tarjeta>
        </div>
      </div>
    </LayoutDashboard>
  );
}