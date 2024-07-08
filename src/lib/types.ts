// Constant for the grid size
export const GRID_SIZE = 20

// Interface for the direction of the snake
export interface Direction {
	direction: "UP" | "DOWN" | "LEFT" | "RIGHT"
}

// Interface for a point in the grid
export interface Point {
	x: number
	y: number
}
