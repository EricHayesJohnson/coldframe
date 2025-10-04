/**
 * Prisma Client Singleton
 *
 * This file ensures we only ever create one instance of the PrismaClient.
 * Import this from anywhere in the backend when you need to query the DB.
 */
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
