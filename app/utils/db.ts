import { PrismaClient } from '@prisma/client/edge'; // Import Edge-compatible Prisma Client

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// Using globalThis for Edge compatibility
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClientSingleton;
};

// Check if prisma client already exists in the global scope, otherwise create a new instance
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

// In non-production environments, assign the prisma client to the global object
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
