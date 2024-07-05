"use client"

import SnakeGrid from "@/src/components/SnakeGrid"

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center">
			<h1 className="font-bold">Snake</h1>
			<SnakeGrid />
		</main>
	)
}
