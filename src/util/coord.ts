import { Direction } from './direction'

export type Coord = { x: number; y: number }

export function getCoordInDirection(
  coord: Coord,
  direction: Direction,
  numberOfSteps = 1
): Coord {
  const step = getStepInDirection(direction)
  return {
    x: coord.x + step.x * numberOfSteps,
    y: coord.y + step.y * numberOfSteps,
  }
}

export function getStepInDirection(direction: Direction): Coord {
  switch (direction) {
    case Direction.N:
      return { x: 0, y: -1 }
    case Direction.NE:
      return { x: 1, y: -1 }
    case Direction.E:
      return { x: 1, y: 0 }
    case Direction.SE:
      return { x: 1, y: 1 }
    case Direction.S:
      return { x: 0, y: 1 }
    case Direction.SW:
      return { x: -1, y: 1 }
    case Direction.W:
      return { x: -1, y: 0 }
    case Direction.NW:
      return { x: -1, y: -1 }
  }
}

export function distanceToCoord(from: Coord, to: Coord): Coord {
  return { x: to.x - from.x, y: to.y - from.y }
}

export function addCoord(a: Coord, b: Coord): Coord {
  return { x: a.x + b.x, y: a.y + b.y }
}
