import { readFile } from './util/fileUtil'
import { Grid } from './util/grid'
import { Direction, DirectionToRight } from './util/direction'
import { Coord, getCoordInDirection } from './util/coord'

type MoveHistoryItem = { direction: Direction; position: Coord }

export default function day06() {
  const data = readFile('06').map((s) => s.split(''))
  const grid = new Grid(data)
  grid.transpose()

  console.log(runGuardPath(grid))

  let i = 0
  let total = grid.find('.').length
  let count = 0
  grid.find('.').forEach((c) => {
    count++
    console.log(count + '/' + total)
    grid.set(c, '#')
    const { didLoop } = runGuardPath(grid)
    if (didLoop) i++
    grid.set(c, '.')
  })
  console.log(i)
}

function runGuardPath(grid: Grid<string>): {
  pathLength: number
  didLoop: boolean
} {
  let direction: Direction = Direction.N
  let position = grid.find('^')[0]
  let moveHistory: MoveHistoryItem[] = []
  let done = false
  while (!done) {
    moveHistory.push({ direction: direction, position: position })
    if (grid.getInDirection(position, direction) === '#') {
      direction = DirectionToRight(direction)
    } else {
      position = getCoordInDirection(position, direction)
    }
    if (
      grid.isOutOfBounds(position) ||
      moveHistory.some(
        (item) =>
          item.position.x === position.x &&
          item.position.y === position.y &&
          item.direction === direction
      )
    ) {
      done = true
    }
  }
  const set = new Set()
  moveHistory
    .map((m) => m.position)
    .map((p) => `${p.x}-${p.y}`)
    .forEach((s) => set.add(s))

  return { didLoop: !grid.isOutOfBounds(position), pathLength: set.size }
}
