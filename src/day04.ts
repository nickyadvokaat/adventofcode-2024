import { readFile } from './util/fileUtil'
import { Grid } from './util/grid'
import { Direction } from './util/direction'

export default function day04() {
  const data = readFile('04').map((s) => s.split(''))
  const grid = new Grid(data)
  grid.transpose()

  console.log(solutionPart1(grid))
  console.log(solutionPart2(grid))
}

export function solutionPart1(grid: Grid<string>): number {
  return grid.find('X').reduce((a, coord) => {
    let add = 0
    for (const [_, value] of Object.entries(Direction)) {
      let word = ''
      for (let step = 0; step < 4; step++) {
        word += grid.getInDirection(coord, value, step) || ''
      }
      if (word === 'XMAS') {
        add++
      }
    }
    return a + add
  }, 0)
}

export function solutionPart2(grid: Grid<string>): number {
  return grid.find('A').reduce((a, coord) => {
    const firstDiagonal =
      (grid.getInDirection(coord, Direction.NE) || '') +
      (grid.getInDirection(coord, Direction.SW) || '')
    const secondDiagonal =
      (grid.getInDirection(coord, Direction.NW) || '') +
      (grid.getInDirection(coord, Direction.SE) || '')
    if (
      (firstDiagonal === 'MS' || firstDiagonal === 'SM') &&
      (secondDiagonal === 'MS' || secondDiagonal === 'SM')
    ) {
      return a + 1
    }
    return a
  }, 0)
}
