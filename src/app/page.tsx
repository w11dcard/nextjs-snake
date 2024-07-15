"use client"

import MainGrid from "@/src/components/MainGrid"

export default function Home() {
	return (
		<div className="mt-8 flex flex-col items-center justify-center">
			<strong className="mb-4 text-4xl">Snake</strong>
			<MainGrid />
			<footer className="text-accent">
				Made by{" "}
				<a className="font-bold underline" href="https://github.com/w11dcard/">
					w11dcard.
				</a>
			</footer>
		</div>
	)
}
