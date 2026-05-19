import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ProveedoresGlobales } from '@/config/proveedores';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'NexTask - WMS Enterprise',
  description: 'Plataforma profesional de gestión de almacenes (WMS)',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen bg-background font-sans text-foreground antialiased`}>
        <ProveedoresGlobales>{children}</ProveedoresGlobales>
      </body>
    </html>
  );
}