import { LayoutDashboard } from '@/components/navegacion/layout-dashboard';
import { Tarjeta, TarjetaDescripcion, TarjetaTitulo } from '@/components/ui/tarjeta';

export default function PaginaTickets() {
  return (
    <LayoutDashboard>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tickets</h1>
          <p className="mt-2 text-muted-foreground">Aquí irán los módulos de tickets, SLA, prioridades y asignaciones.</p>
        </div>

        <Tarjeta>
          <TarjetaTitulo>Módulo reservado: Tickets</TarjetaTitulo>
          <TarjetaDescripcion className="mt-3">Plantilla lista para implementar la operación del helpdesk.</TarjetaDescripcion>
          <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
            <li>• Tabla de tickets con filtros, búsqueda y paginación</li>
            <li>• Creación, edición, comentarios e historial</li>
            <li>• Estados, prioridades, categorías y SLA</li>
            <li>• Asignación a técnicos, equipos y departamentos</li>
            <li>• Eventos en tiempo real mediante WebSockets futuros</li>
          </ul>
        </Tarjeta>
      </div>
    </LayoutDashboard>
  );
}
