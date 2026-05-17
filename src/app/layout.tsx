import '@/styles/globals.css';
import React from 'react';
import { metadataSitio } from '@/config/metadata';
import { ProveedoresGlobales } from '@/config/proveedores';

export const metadata = metadataSitio;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ProveedoresGlobales>{children}</ProveedoresGlobales>
      </body>
    </html>
  );
}
