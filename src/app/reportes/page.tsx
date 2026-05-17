/**
 * Página del módulo Reportes (placeholder).
 * Aquí irán métricas, analítica, KPIs, exportaciones, tableros
 * y visualizaciones de datos del sistema ITSM.
 */
import { LayoutDashboard } from '@/components/navegacion/layout-dashboard';
import { Tarjeta, TarjetaDescripcion, TarjetaTitulo } from '@/components/ui/tarjeta';

export default function PaginaReportes() {
  return (
    <LayoutDashboard>
      <div className="space-y-6">
        {/* Encabezado */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reportes</h1>
          <p className="mt-2 text-muted-foreground">
            Aquí irán métricas, analítica, KPIs, exportaciones y tableros BI.
          </p>
        </div>

        {/* Contenido placeholder */}
        <div className="grid gap-4 md:grid-cols-2">
          <Tarjeta>
            <TarjetaTitulo>Módulo reservado: Reportes</TarjetaTitulo>
            <TarjetaDescripcion className="mt-3">
              Área preparada para analítica operativa y ejecutiva.
            </TarjetaDescripcion>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Gráficos de volumen de tickets y tendencias
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Métricas por técnico, prioridad, categoría y SLA
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Exportaciones CSV/PDF futuras
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Dashboards personalizables e integración BI
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Alertas y umbrales configurables
              </li>
            </ul>
          </Tarjeta>

          <Tarjeta>
            <TarjetaTitulo>Métricas planeadas</TarjetaTitulo>
            <TarjetaDescripcion className="mt-3">
              KPIs que se implementarán en este módulo:
            </TarjetaDescripcion>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Tickets resueltos vs. abiertos (por período)
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Tiempo promedio de resolución (MTTR)
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Cumplimiento de SLA
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Satisfacción del usuario (CSAT)
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Carga de trabajo por técnico/equipo
              </li>
            </ul>
          </Tarjeta>
        </div>
      </div>
    </LayoutDashboard>
  );
}