import { LayoutDashboard } from '@/components/navegacion/layout-dashboard';
import { Tarjeta, TarjetaDescripcion, TarjetaTitulo } from '@/components/ui/tarjeta';

export default function PaginaBaseConocimiento() {
  return (
    <LayoutDashboard>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Base de conocimiento</h1>
          <p className="mt-2 text-muted-foreground">Aquí irá el sistema RAG, artículos, embeddings y búsqueda inteligente.</p>
        </div>

        <Tarjeta>
          <TarjetaTitulo>Módulo reservado: Base de conocimiento + RAG</TarjetaTitulo>
          <TarjetaDescripcion className="mt-3">
            Este módulo queda preparado visualmente, pero sin lógica compleja todavía.
          </TarjetaDescripcion>
          <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
            <li>• Buscador full-text de artículos</li>
            <li>• Búsqueda semántica con embeddings</li>
            <li>• Generación de respuestas con LLM mediante RAG</li>
            <li>• Administración de artículos, categorías y fuentes</li>
            <li>• Integración futura con LangChain, colas y almacenamiento vectorial</li>
          </ul>
        </Tarjeta>
      </div>
    </LayoutDashboard>
  );
}
