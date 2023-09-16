import { PrismaClient } from "@prisma/client";

declare global {
    var primsa: PrismaClient | undefined;
}

const prisma = global.primsa || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    global.primsa = prisma;
}

export default prisma;
