import { readFile } from './util/fileUtil'
import { Grid } from './util/grid'
import { Direction } from './util/direction'
import { Coord, getCoordInDirection } from './util/coord'

export default function day12() {
  const data = readFile('12').map((s) => s.split(''))
  const grid = new Grid<string>(data)
  grid.transpose()
  grid.print()
  const arr = Array<Array<boolean>>(data.length).fill(
    Array<boolean>(data[0].length).fill(false)
  )
  const checkGrid = new Grid<boolean>(arr)
  checkGrid.transpose()

  let sum = 0
  while (checkGrid.first(false) !== null) {
    const coord = checkGrid.first(false)!
    const result = checkRecursive(coord, grid, checkGrid)
    sum += result.perimeter * result.area
  }
  console.log(sum)
}

function checkRecursive(
  coord: Coord,
  grid: Grid<string>,
  checkGrid: Grid<boolean>
): {
  area: number
  perimeter: number
} {
  if (checkGrid.getCoord(coord)) {
    return { area: 0, perimeter: 0 }
  }
  checkGrid.set(coord, true)
  const value = grid.getCoord(coord)
  let around: Coord[] = []
  let perimeter = 4
  for (let direction: Direction = 0; direction < 8; direction += 2) {
    const c = getCoordInDirection(coord, direction as Direction)
    if (grid.getCoord(c) === value) {
      perimeter -= 1
      if (checkGrid.getCoord(c) === false) {
        around.push(c)
      }
    }
  }
  return around
    .map((a) => {
      return checkRecursive(a, grid, checkGrid)
    })
    .reduce(
      (a, b) => {
        return { area: a.area + b.area, perimeter: a.perimeter + b.perimeter }
      },
      { area: 1, perimeter }
    )
}
