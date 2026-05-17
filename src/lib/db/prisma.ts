// Utilidad para Prisma Client (próximamente)
// Esta será la conexión centralizada a la base de datos PostgreSQL

// import { PrismaClient } from '@prisma/client';

// const globalForPrisma = global as unknown as { prisma: PrismaClient };

// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
//   });

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
