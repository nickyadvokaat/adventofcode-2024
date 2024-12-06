import { readFile } from './util/fileUtil'
import { Grid } from './util/grid'
import { Direction, DirectionToRight } from './util/direction'
import { Coord, getCoordInDirection } from './util/coord'

type MoveHistoryItem = { direction: Direction; position: Coord }

export default function day06() {
  const data = readFile('06').map((s) => s.split(''))
  const grid = new Grid(data)
  grid.transpose()

  const { moveHistory } = runGuardPath(grid)

  const set = new Set<string>()
  moveHistory
    .map((m) => m.position)
    .map((p) => `${p.x}-${p.y}`)
    .forEach((s) => set.add(s))
  console.log(set.size)

  const startPosition = grid.find('^')[0]
  let possibleObjectLocations: Coord[] = []
  set.forEach((s) => {
    const split = s.split('-')
    possibleObjectLocations.push({
      x: parseInt(split[0]),
      y: parseInt(split[1]),
    })
  })
  possibleObjectLocations = possibleObjectLocations.filter(
    (o) => !(o.x === startPosition.x && o.y === startPosition.y)
  )

  const solutionPart2 = possibleObjectLocations.filter((c) => {
    grid.set(c, '#')
    const { didLoop } = runGuardPath(grid)
    grid.set(c, '.')
    return didLoop
  }).length
  console.log(solutionPart2)
}

function runGuardPath(grid: Grid<string>): {
  moveHistory: MoveHistoryItem[]
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
  return { didLoop: !grid.isOutOfBounds(position), moveHistory }
}
