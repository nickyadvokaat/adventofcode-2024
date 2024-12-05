import { describe, expect, test } from 'vitest'
import { readFile } from './util/fileUtil'
import { Grid } from './util/grid'
import { solutionPart1, solutionPart2 } from './day04'

let grid: Grid<string>

describe('Day04', () => {
  const data = readFile('04-t').map((s) => s.split(''))
  grid = new Grid(data)
  grid.transpose()

  test('Part 1', () => {
    expect(solutionPart1(grid)).toBe(18)
  })

  test('Part 2', () => {
    expect(solutionPart2(grid)).toBe(9)
  })
})
