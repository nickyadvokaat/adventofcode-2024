import { describe, expect, test } from 'vitest'
import { readFile } from './util/fileUtil'
import { getFencingPrice, transformData } from './day12'

describe('Day12', () => {
  const data = readFile('12-t')
  const grid = transformData(data)

  test('Part 1', () => {
    expect(getFencingPrice(grid)).toBe(1930)
  })

  test('Part 2', () => {
    expect(getFencingPrice(grid, true)).toBe(1206)
  })
})
