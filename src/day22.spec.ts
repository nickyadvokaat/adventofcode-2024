import { describe, expect, test } from 'vitest'
import { firstIndex, getDiffList, getPriceList, part1 } from './day22'

describe('Day22', () => {
  test('Part 1', () => {
    const testData = [1, 10, 100, 2024]
    expect(part1(testData)).toBe(37327623)
  })

  test('Part 2', () => {
    const priceList = getPriceList(123, 4)
    expect(priceList).toEqual([3, 0, 6, 5])
    const diffList = getDiffList(priceList)
    expect(diffList).toEqual([-3, 6, -1])
  })

  test('Part 2 - indexing', () => {
    const priceList = getPriceList(1)
    const diffList = getDiffList(priceList)
    const index = firstIndex(diffList, [-2, 1, -1, 3])
    expect(priceList[index + 4]).toBe(7)
  })
})
