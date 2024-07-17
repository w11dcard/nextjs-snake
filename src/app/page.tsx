"use client"

import MainGrid from "@/src/components/MainGrid"

export default function Home() {
	return (
		<div className="my-3 flex flex-col items-center justify-center">
			<strong className="mb-2 text-4xl">Snake 🐍</strong>
			<MainGrid />
			<footer className="font-merienda text-accent">
				Made by{" "}
				<a className=" font-bold underline" href="https://github.com/w11dcard/">
					w11dcard.
				</a>
			</footer>
		</div>
	)
}
