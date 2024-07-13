"use client"

import { Direction, GRID_SIZE, Point } from "@/src/lib/types"
import { useCallback, useEffect, useState } from "react"

export default function MainGrid() {
	const [food, setFood] = useState<Point>({ x: 0, y: 0 })
	const [direction, setDirection] = useState<Direction["direction"]>("RIGHT")
	const [isGameOver, setIsGameOver] = useState<boolean>(false)
	const [snake, setSnake] = useState<Point[]>([
		{ y: 0, x: 2 },
		{ y: 0, x: 1 },
		{ y: 0, x: 0 },
	])

	const generateFood = useCallback(() => {
		let newFood: Point
		do {
			newFood = {
				x: Math.floor(Math.random() * GRID_SIZE),
				y: Math.floor(Math.random() * GRID_SIZE),
			}
		} while (snake.some((snakePart) => snakePart.x === newFood.x && snakePart.y === newFood.y))
		setFood(newFood)
	}, [])

	const moveSnake = useCallback(() => {
		if (isGameOver) return

		const newSnake = [...snake]
		const snakeHead = newSnake[0]

		if (!snakeHead || typeof snakeHead.x === "undefined" || typeof snakeHead.y === "undefined") {
			return
		}

		const newSnakeHead = { ...snakeHead }

		// Move snake based on direction
		if (direction === "UP") {
			newSnakeHead.y -= 1
		} else if (direction === "DOWN") {
			newSnakeHead.y += 1
		} else if (direction === "LEFT") {
			newSnakeHead.x -= 1
		} else if (direction === "RIGHT") {
			newSnakeHead.x += 1
		}

		// Check if snake hits the wall or itself
		if (
			newSnakeHead.x < 0 ||
			newSnakeHead.x >= GRID_SIZE ||
			newSnakeHead.y < 0 ||
			newSnakeHead.y >= GRID_SIZE ||
			newSnake.some((snakePart) => snakePart.x === newSnakeHead.x && snakePart.y === newSnakeHead.y)
		) {
			setIsGameOver(true)
			return
		}

		newSnake.unshift(newSnakeHead)

		// Check if snake eats the food
		if (newSnakeHead.x === food.x && newSnakeHead.y === food.y) {
			generateFood()
		} else {
			newSnake.pop()
		}

		setSnake(newSnake)
	}, [direction, food, generateFood, isGameOver, snake])

	// Generate initial food and start moving snake
	useEffect(() => {
		generateFood()
	}, [generateFood])

	// Start interval for snake movement
	useEffect(() => {
		const interval = setInterval(moveSnake, 100)
		return () => clearInterval(interval)
	}, [moveSnake])

	// Handle keyboard input for snake direction
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (isGameOver) return

			if (event.key === "ArrowUp" && direction !== "DOWN") {
				setDirection("UP")
			} else if (event.key === "ArrowDown" && direction !== "UP") {
				setDirection("DOWN")
			} else if (event.key === "ArrowLeft" && direction !== "RIGHT") {
				setDirection("LEFT")
			} else if (event.key === "ArrowRight" && direction !== "LEFT") {
				setDirection("RIGHT")
			}
		}
		window.addEventListener("keydown", handleKeyDown)
		return () => {
			window.removeEventListener("keydown", handleKeyDown)
		}
	}, [direction, isGameOver])

	return (
		<main className="grid-cols-20 grid-rows-20 mb-6 grid rounded border-foreground">
			{isGameOver && (
				<div className="inset-0 m-2 flex flex-col items-center rounded bg-destructive p-2 text-destructive-foreground">
					<strong className="text-3xl">Game Over!</strong>
					<p className="text-sm font-semibold">Press F5 to play again</p>
				</div>
			)}

			{Array.from({ length: GRID_SIZE }).map((_, y) => (
				<div key={y} className="flex">
					{Array.from({ length: GRID_SIZE }).map((_, x) => (
						<div
							key={x}
							className={`h-5 w-5 border border-muted ${
								snake.some((snakePart) => snakePart.x === x && snakePart.y === y) ? "bg-green-700" : ""
							} ${food.x === x && food.y === y ? "bg-red-700" : ""}`}
							style={{ boxSizing: "border-box" }}
						></div>
					))}
				</div>
			))}
		</main>
	)
}
