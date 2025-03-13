import { readFile } from './util/fileUtil'
import { Grid } from './util/grid'
import { Direction } from './util/direction'
import { Coord, getCoordInDirection } from './util/coord'

export default function day12() {
  const data = readFile('12')
  const grid = transformData(data)
  console.log(getFencingPrice(grid))
  console.log(getFencingPrice(grid, true))
}

export function transformData(data: string[]): Grid<string> {
  const grid = new Grid<string>(data.map((s) => s.split('')))
  grid.transpose()
  return grid
}

export function getFencingPrice(grid: Grid<string>, isPart2 = false): number {
  const dim = grid.getDim()
  const checkGrid = new Grid<boolean>(
    Array<Array<boolean>>(dim.x).fill(Array<boolean>(dim.y).fill(false))
  )
  checkGrid.transpose()
  let fencingPrice = 0
  while (checkGrid.first(false) !== null) {
    const startCoord = checkGrid.first(false)!
    if (!isPart2) {
      const result = checkRegionRecursive(startCoord, grid, checkGrid)
      fencingPrice += result.perimeter * result.area
    } else {
      const value = grid.getCoord(startCoord)
      const regionCoords = getRegion(startCoord, grid, checkGrid)
      let cornersInRegion = 0
      regionCoords.forEach((c) => {
        for (let direction: Direction = 0; direction < 8; direction += 2) {
          const p1 = grid.getInDirection(c, direction as Direction) === value
          const p2 =
            grid.getInDirection(c, ((direction + 1) % 8) as Direction) === value
          const p3 =
            grid.getInDirection(c, ((direction + 2) % 8) as Direction) === value
          if ((p1 && !p2 && p3) || (!p1 && !p3)) {
            cornersInRegion++
          }
        }
      })
      fencingPrice += regionCoords.length * cornersInRegion
    }
  }
  return fencingPrice
}

function getRegion(
  coord: Coord,
  grid: Grid<string>,
  checkGrid: Grid<boolean>
): Coord[] {
  const value = grid.getCoord(coord)
  checkGrid.set(coord, true)
  let regionCoords: Coord[] = [coord]
  let addedCoords: Coord[] = [coord]
  while (addedCoords.length > 0) {
    let newAdded = []
    for (let addedCoord of addedCoords) {
      for (let direction: Direction = 0; direction < 8; direction += 2) {
        const c = getCoordInDirection(addedCoord, direction as Direction)
        if (grid.getCoord(c) === value && checkGrid.getCoord(c) === false) {
          newAdded.push(c)
          checkGrid.set(c, true)
        }
      }
    }
    addedCoords = newAdded
    addedCoords.forEach((c) => regionCoords.push(c))
  }
  return regionCoords
}

function checkRegionRecursive(
  startCoord: Coord,
  grid: Grid<string>,
  checkGrid: Grid<boolean>
): {
  area: number
  perimeter: number
} {
  if (checkGrid.getCoord(startCoord)) {
    return { area: 0, perimeter: 0 }
  }
  checkGrid.set(startCoord, true)
  const value = grid.getCoord(startCoord)
  let around: Coord[] = []
  let perimeter = 4
  for (let direction: Direction = 0; direction < 8; direction += 2) {
    const c = getCoordInDirection(startCoord, direction as Direction)
    if (grid.getCoord(c) === value) {
      perimeter -= 1
      if (checkGrid.getCoord(c) === false) {
        around.push(c)
      }
    }
  }
  return around
    .map((a) => {
      return checkRegionRecursive(a, grid, checkGrid)
    })
    .reduce(
      (a, b) => {
        return { area: a.area + b.area, perimeter: a.perimeter + b.perimeter }
      },
      { area: 1, perimeter }
    )
}
