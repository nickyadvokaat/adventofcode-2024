import { describe, expect, test } from 'vitest'
import { readFile } from './util/fileUtil'
import { getNumberOfShortcuts, transformData } from './day20'

describe('Day20', () => {
  const testData = readFile('20-t')
  const { grid, start, end } = transformData(testData)

  test('Transform data', () => {
    expect(grid.getDim()).toEqual({ x: 15, y: 15 })
    expect(start).toEqual({ x: 1, y: 3 })
    expect(end).toEqual({ x: 5, y: 7 })
  })

  test('Part 1', () => {
    expect(getNumberOfShortcuts(grid, start, end, 2, 38)).toBe(3)
  })

  test('Part 2', () => {
    expect(getNumberOfShortcuts(grid, start, end, 20, 72)).toBe(29)
  })
})
