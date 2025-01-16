import { Grid } from './grid'
import { Coord, getCoordInDirection } from './coord'
import { Direction } from './direction'

export function getShortestPathGrid(
  grid: Grid<boolean>,
  startCoord: Coord = {
    x: 0,
    y: 0,
  }
): Grid<number> {
  const distGrid = new Grid<number>(
    Array.from({ length: grid.getDim().y }, () =>
      Array(grid.getDim().x).fill(-1)
    )
  )
  distGrid.set(startCoord, 0)
  let neighbours: Coord[] = [startCoord]
  let d = 0
  while (neighbours.length > 0) {
    d++
    let newNeighbours: Coord[] = []
    neighbours.forEach((n) => {
      for (let i = 0; i < 8; i += 2) {
        const newCoord = getCoordInDirection(n, i as Direction)
        if (!grid.getCoord(newCoord) && distGrid.getCoord(newCoord) === -1) {
          distGrid.set(newCoord, d)
          newNeighbours.push(newCoord)
        }
      }
    })
    neighbours = newNeighbours
  }
  return distGrid
}

export function getShortestPath(
  grid: Grid<boolean>,
  startCoord: Coord = {
    x: 0,
    y: 0,
  },
  endCoordOptional: Coord | null = null
): number {
  const endCoord = endCoordOptional ?? {
    x: grid.getDim().x - 1,
    y: grid.getDim().y - 1,
  }
  const distGrid = getShortestPathGrid(grid, startCoord)
  return distGrid.getCoord(endCoord)!
}
