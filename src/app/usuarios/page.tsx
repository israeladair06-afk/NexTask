import { LayoutDashboard } from '@/components/navegacion/layout-dashboard';
import { Tarjeta, TarjetaDescripcion, TarjetaTitulo } from '@/components/ui/tarjeta';

export default function PaginaUsuarios() {
  return (
    <LayoutDashboard>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Usuarios</h1>
          <p className="mt-2 text-muted-foreground">Aquí irá la administración de usuarios, roles, permisos y equipos.</p>
        </div>

        <Tarjeta>
          <TarjetaTitulo>Módulo reservado: Usuarios</TarjetaTitulo>
          <TarjetaDescripcion className="mt-3">Base visual para gestión de usuarios sin lógica real por ahora.</TarjetaDescripcion>
          <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
            <li>• Listado de usuarios con búsqueda</li>
            <li>• Roles, permisos, equipos y departamentos</li>
            <li>• Estados activo/inactivo</li>
            <li>• Integración futura con autenticación y auditoría</li>
          </ul>
        </Tarjeta>
      </div>
    </LayoutDashboard>
  );
}
