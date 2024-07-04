"use client"

import SnakeGrid from "@/components/SnakeGrid"

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center">
			<h1>Snake Game</h1>
			<SnakeGrid />
		</main>
	)
}
