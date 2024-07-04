"use client"

import { Direction, GRID_SIZE, Point } from "@/lib/types"
import { useCallback, useEffect, useState } from "react"

export default function SnakeGrid() {
	const [snake, setSnake] = useState<Point[]>([
		{ y: 0, x: 2 },
		{ y: 0, x: 1 },
		{ y: 0, x: 0 },
	])
	const [food, setFood] = useState<Point>({ x: 0, y: 0 })
	const [direction, setDirection] = useState<Direction>("RIGHT")
	const [isGameOver, setIsGameOver] = useState<boolean>(false)

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
		if (isGameOver) return // Stop moving if game over

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
			if (isGameOver) return // Ignore key presses if game over

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
		<div className="grid-cols-20 grid-rows-20 grid border">
			{isGameOver && (
				<div className="absolute inset-0 flex flex-col items-center justify-center text-center text-4xl font-bold text-red-700">
					<div>Game Over!</div>
					<div className="mt-4 text-sm">Reload To Play Again</div>
				</div>
			)}

			{Array.from({ length: GRID_SIZE }).map((_, y) => (
				<div key={y} className="flex">
					{Array.from({ length: GRID_SIZE }).map((_, x) => (
						<div
							key={x}
							className={`h-5 w-5 border border-gray-300 ${
								snake.some((snakePart) => snakePart.x === x && snakePart.y === y) ? "bg-green-700" : ""
							} ${food.x === x && food.y === y ? "bg-red-700" : ""}`}
							style={{ boxSizing: "border-box" }}
						></div>
					))}
				</div>
			))}
		</div>
	)
}
