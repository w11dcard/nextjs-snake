"use client"

import { useEffect, useState } from "react"

const GRID_SIZE = 20

interface Point {
	x: number
	y: number
}

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"

export default function SnakeGrid() {
	const [snake, setSnake] = useState<Point[]>([
		{ y: 0, x: 2 },
		{ y: 0, x: 1 },
		{ y: 0, x: 0 },
	])
	const [food, setFood] = useState<Point>({ x: 0, y: 0 })
	const [direction, setDirection] = useState<Direction>("DOWN")
	const [isGameOver, setIsGameOver] = useState<boolean>(false)

	const generateFood = () => {
		let newFood: Point
		do {
			newFood = {
				x: Math.floor(Math.random() * GRID_SIZE),
				y: Math.floor(Math.random() * GRID_SIZE),
			}
		} while (snake.some((snakePart) => snakePart.x === newFood.x && snakePart.y === newFood.y))
		setFood(newFood)
	}

	const moveSnake = () => {
		const newSnake = [...snake]
		const snakeHead = newSnake[0]
		if (direction === "UP") {
			snakeHead.y -= 1
		}
		if (direction === "DOWN") {
			snakeHead.y += 1
		}
		if (direction === "LEFT") {
			snakeHead.x -= 1
		}
		if (direction === "RIGHT") {
			snakeHead.x += 1
		}

		setSnake(newSnake)
	}

	useEffect(() => {
		generateFood()
	}, [])

	useEffect(() => {
		const interval = setInterval(moveSnake, 60)
		return () => clearInterval(interval)
	}, [snake, direction])

	return (
		<div className="grid-cols-20 grid-rows-20 grid border">
			{Array.from({ length: GRID_SIZE }).map((_, y) => (
				<div key={y} className="flex">
					{Array.from({ length: GRID_SIZE }).map((_, x) => (
						<div
							key={x}
							style={{ boxSizing: "border-box" }}
							className={`h-5 w-5 border border-gray-300 ${
								snake.some((snakePart) => snakePart.x === x && snakePart.y === y) ? "bg-green-700" : ""
							} ${food.x === x && food.y === y ? "bg-red-700" : ""}`}
						></div>
					))}
				</div>
			))}
		</div>
	)
}
