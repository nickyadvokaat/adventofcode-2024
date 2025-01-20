import { describe, expect, test } from 'vitest'
import { readFile } from './util/fileUtil'
import {
  distinctPositionsVisited,
  obstructionPositions,
  transformData,
} from './day06'

describe('Day06', () => {
  test('Part 1', () => {
    const { grid, startPosition } = transformData(readFile('06-t'))
    expect(distinctPositionsVisited(grid, startPosition).length).toBe(41)
  })

  test('Part 2', () => {
    const { grid, startPosition } = transformData(readFile('06-t'))
    expect(obstructionPositions(grid, startPosition).length).toBe(6)
  })
})
