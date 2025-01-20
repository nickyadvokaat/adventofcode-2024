import { readFile } from './util/fileUtil'
import { Grid } from './util/grid'
import { Direction, DirectionToRight } from './util/direction'
import { Coord, getCoordInDirection } from './util/coord'

type MoveHistoryItem = { direction: Direction; position: Coord }

export default function day06() {
  const { grid, startPosition } = transformData(readFile('06'))

  console.log('Part 1', distinctPositionsVisited(grid, startPosition).length)
  console.log('Part 2', obstructionPositions(grid, startPosition).length)
}

export function transformData(data: string[]): {
  grid: Grid<boolean>
  startPosition: Coord
} {
  const data2 = data.map((s) => s.split(''))
  const tempGrid = new Grid(data2)
  tempGrid.transpose()
  const startPosition = tempGrid.find('^')[0]
  const grid = new Grid(data2.map((a) => a.map((s) => s === '#')))
  grid.transpose()
  return { grid, startPosition }
}

export function distinctPositionsVisited(
  grid: Grid<boolean>,
  startPosition: Coord
): Coord[] {
  const { moveHistory } = runGuardPath(grid, startPosition)

  const result: Coord[] = []
  moveHistory
    .map((m) => m.position)
    .forEach((p) => {
      if (!result.some((r) => r.x === p.x && r.y === p.y)) {
        result.push(p)
      }
    })
  return result
}

export function runGuardPath(
  grid: Grid<boolean>,
  startPosition: Coord
): {
  moveHistory: MoveHistoryItem[]
  didLoop: boolean
} {
  let direction: Direction = Direction.N
  let moveHistory: MoveHistoryItem[] = []
  while (true) {
    moveHistory.push({ direction: direction, position: startPosition })
    if (grid.getInDirection(startPosition, direction) === true) {
      direction = DirectionToRight(direction)
    } else {
      startPosition = getCoordInDirection(startPosition, direction)
    }
    if (
      grid.isOutOfBounds(startPosition) ||
      moveHistory.some(
        (item) =>
          item.position.x === startPosition.x &&
          item.position.y === startPosition.y &&
          item.direction === direction
      )
    ) {
      break
    }
  }
  return { didLoop: !grid.isOutOfBounds(startPosition), moveHistory }
}

export function obstructionPositions(
  grid: Grid<boolean>,
  startPosition: Coord
): Coord[] {
  return distinctPositionsVisited(grid, startPosition)
    .filter((o) => !(o.x === startPosition.x && o.y === startPosition.y))
    .filter((c) => {
      grid.set(c, true)
      const { didLoop } = runGuardPath(grid, startPosition)
      grid.set(c, false)
      return didLoop
    })
}
