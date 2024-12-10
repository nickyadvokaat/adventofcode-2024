import { readFile } from './util/fileUtil'
import { Grid } from './util/grid'
import { Coord, getCoordInDirection } from './util/coord'
import { Direction } from './util/direction'

export default function day10() {
  const data = readFile('10').map((s) =>
    s.split('').map((str) => parseInt(str))
  )
  console.log(scoreOfTrailheads(data))
  console.log(scoreOfPaths(data))
}

export function scoreOfTrailheads(data: number[][]): number {
  const grid = new Grid<number>(data)
  grid.transpose()
  return grid.find(0).reduce((acc, cur) => {
    const trailheadScore = getTrailheadScoreRecursive(grid, cur, 0)
    const set = new Set<string>()
    trailheadScore.map((p) => `${p.x}-${p.y}`).forEach((s) => set.add(s))
    return acc + set.size
  }, 0)
}

export function scoreOfPaths(data: number[][]): number {
  const grid = new Grid<number>(data)
  grid.transpose()
  return grid.find(0).reduce((acc, cur) => {
    return acc + getTrailheadScoreRecursive(grid, cur, 0).length
  }, 0)
}

function getTrailheadScoreRecursive(
  grid: Grid<number>,
  coord: Coord,
  height: number
): Coord[] {
  if (height === 9) {
    return [coord]
  }
  let result: Coord[] = []
  for (let direction: Direction = 0; direction < 8; direction += 2) {
    const c = getCoordInDirection(coord, direction as Direction)
    if (grid.getCoord(c) === height + 1) {
      result.push(...getTrailheadScoreRecursive(grid, c, height + 1))
    }
  }
  return result
}
