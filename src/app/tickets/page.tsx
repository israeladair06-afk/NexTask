/**
 * Página del módulo Tickets (placeholder).
 * Aquí irá la gestión completa de tickets: listado, creación, detalle,
 * filtros, asignaciones, SLA, comentarios y más.
 */
import { LayoutDashboard } from '@/components/navegacion/layout-dashboard';
import { Tarjeta, TarjetaDescripcion, TarjetaTitulo } from '@/components/ui/tarjeta';

export default function PaginaTickets() {
  return (
    <LayoutDashboard>
      <div className="space-y-6">
        {/* Encabezado */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tickets</h1>
          <p className="mt-2 text-muted-foreground">
            Aquí irán los módulos de tickets, SLA, prioridades y asignaciones.
          </p>
        </div>

        {/* Contenido placeholder */}
        <div className="grid gap-4 md:grid-cols-2">
          <Tarjeta>
            <TarjetaTitulo>Módulo reservado: Tickets</TarjetaTitulo>
            <TarjetaDescripcion className="mt-3">
              Plantilla lista para implementar la operación del helpdesk.
            </TarjetaDescripcion>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Tabla de tickets con filtros, búsqueda y paginación
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Creación, edición, comentarios e historial
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Estados, prioridades, categorías y SLA
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Asignación a técnicos, equipos y departamentos
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Eventos en tiempo real mediante WebSockets futuros
              </li>
            </ul>
          </Tarjeta>

          <Tarjeta>
            <TarjetaTitulo>¿Qué necesitas para empezar?</TarjetaTitulo>
            <TarjetaDescripcion className="mt-3">
              Cuando el equipo esté listo para implementar tickets:
            </TarjetaDescripcion>
            <ol className="mt-5 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
                  1
                </span>
                Definir modelo de datos (Prisma)
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
                  2
                </span>
                Crear servicios en <code className="text-primary">features/tickets/services</code>
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
                  3
                </span>
                Construir componentes de UI
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
                  4
                </span>
                Conectar con APIs
              </li>
            </ol>
          </Tarjeta>
        </div>
      </div>
    </LayoutDashboard>
  );
}