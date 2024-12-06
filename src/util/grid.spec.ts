import { describe, expect, test } from 'vitest'
import { Grid } from './grid'
import { Direction } from './direction'

const testData = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]

describe('Grid', () => {
  test('Get', () => {
    const grid = new Grid(testData)
    expect(grid.get(0, 0)).toBe(1)
    expect(grid.get(2, 0)).toBe(7)
    expect(grid.get(0, 2)).toBe(3)
    expect(grid.get(-1, 2)).toBe(null)
    expect(grid.get(3, 2)).toBe(null)

    grid.print()
  })

  test('Direction', () => {
    const grid = new Grid(testData)
    expect(grid.getInDirection({ x: 1, y: 1 }, Direction.N, 1)).toBe(4)
    expect(grid.getInDirection({ x: 0, y: 0 }, Direction.SE, 2)).toBe(9)
    expect(grid.getInDirection({ x: 0, y: 0 }, Direction.SE, 3)).toBe(null)
  })

  test('Generic', () => {
    const grid = new Grid([['A', 'B']])
    expect(grid.get(0, 1)).toBe('B')
  })

  test('Transpose', () => {
    const grid = new Grid(testData)
    expect(grid.get(2, 0)).toBe(7)
    grid.transpose()
    expect(grid.get(0, 2)).toBe(7)
  })

  test('Find', () => {
    const grid = new Grid(testData)
    expect(grid.find(7)).toEqual([{ x: 2, y: 0 }])
  })
})
