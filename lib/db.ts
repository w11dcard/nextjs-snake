/* In production, a new PrismaClient instance is created to ensure robust connection handling and scalability.
In development, a single PrismaClient instance is reused across imports for optimal performance and resource usage. */

import { PrismaClient } from "@prisma/client"

declare const global: {
	prisma?: PrismaClient
}

let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
	prisma = new PrismaClient()
} else {
	if (!global.prisma) {
		global.prisma = new PrismaClient()
	}
	prisma = global.prisma
}

export default prisma
