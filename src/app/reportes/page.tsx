import { LayoutDashboard } from '@/components/navegacion/layout-dashboard';
import { Tarjeta, TarjetaDescripcion, TarjetaTitulo } from '@/components/ui/tarjeta';

export default function PaginaReportes() {
  return (
    <LayoutDashboard>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reportes</h1>
          <p className="mt-2 text-muted-foreground">Aquí irán métricas, analítica, KPIs, exportaciones y tableros BI.</p>
        </div>

        <Tarjeta>
          <TarjetaTitulo>Módulo reservado: Reportes</TarjetaTitulo>
          <TarjetaDescripcion className="mt-3">Área preparada para analítica operativa y ejecutiva.</TarjetaDescripcion>
          <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
            <li>• Gráficos de volumen de tickets y tendencias</li>
            <li>• Métricas por técnico, prioridad, categoría y SLA</li>
            <li>• Exportaciones CSV/PDF futuras</li>
            <li>• Dashboards personalizables e integración BI</li>
          </ul>
        </Tarjeta>
      </div>
    </LayoutDashboard>
  );
}
