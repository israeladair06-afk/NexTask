/**
 * Página del módulo Base de Conocimiento (placeholder).
 * Aquí irá el sistema RAG completo: artículos, búsqueda semántica,
 * embeddings, generación aumentada por recuperación (RAG) y más.
 */
import { LayoutDashboard } from '@/components/navegacion/layout-dashboard';
import { Tarjeta, TarjetaDescripcion, TarjetaTitulo } from '@/components/ui/tarjeta';

export default function PaginaBaseConocimiento() {
  return (
    <LayoutDashboard>
      <div className="space-y-6">
        {/* Encabezado */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Base de conocimiento</h1>
          <p className="mt-2 text-muted-foreground">
            Aquí irá el sistema RAG, artículos, embeddings y búsqueda inteligente.
          </p>
        </div>

        {/* Contenido placeholder */}
        <div className="grid gap-4 md:grid-cols-2">
          <Tarjeta>
            <TarjetaTitulo>Módulo reservado: Base de conocimiento + RAG</TarjetaTitulo>
            <TarjetaDescripcion className="mt-3">
              Este módulo queda preparado visualmente, pero sin lógica compleja todavía.
            </TarjetaDescripcion>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Buscador full-text de artículos
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Búsqueda semántica con embeddings
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Generación de respuestas con LLM mediante RAG
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Administración de artículos, categorías y fuentes
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Integración futura con LangChain, colas y almacenamiento vectorial
              </li>
            </ul>
          </Tarjeta>

          <Tarjeta>
            <TarjetaTitulo>Arquitectura RAG prevista</TarjetaTitulo>
            <TarjetaDescripcion className="mt-3">
              El sistema de base de conocimiento usará:
            </TarjetaDescripcion>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                PostgreSQL para metadatos y artículos
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Base de datos vectorial (pgvector o similar)
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Proveedor LLM (OpenAI, Anthropic, local)
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Pipeline de embeddings y chunking
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Cache con Redis para respuestas frecuentes
              </li>
            </ul>
          </Tarjeta>
        </div>
      </div>
    </LayoutDashboard>
  );
}