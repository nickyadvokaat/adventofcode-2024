import { describe, expect, test } from 'vitest'
import { readFile } from './util/fileUtil'
import { getLocksAndKeys, getNumberOfFittingPairs } from './day25'

describe('Day25', () => {
  const testData = readFile('25-t')

  test('Test part 1', () => {
    const { locks, keys } = getLocksAndKeys(testData)

    expect(locks).toEqual([
      [0, 5, 3, 4, 3],
      [1, 2, 0, 5, 3],
    ])

    expect(keys).toEqual([
      [5, 0, 2, 1, 3],
      [4, 3, 4, 0, 2],
      [3, 0, 2, 0, 1],
    ])

    expect(getNumberOfFittingPairs(locks, keys)).toBe(3)
  })
})
