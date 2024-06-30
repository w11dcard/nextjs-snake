import { PrismaClient } from "@prisma/client"

declare const global: {
	prisma?: PrismaClient
}

let prisma: PrismaClient

if (typeof window === "undefined") {
	if (process.env.NODE_ENV === "production") {
		prisma = new PrismaClient()
	} else {
		if (!global.prisma) {
			global.prisma = new PrismaClient()
		}
		prisma = global.prisma
	}
} else {
	prisma = new PrismaClient()
}

export default prisma
