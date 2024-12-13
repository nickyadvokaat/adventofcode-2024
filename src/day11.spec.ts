import { describe, expect, test } from 'vitest'
import { LineOfStones } from './day11'

describe('Day11', () => {
  test('Part 1', () => {
    const lineOfStones = new LineOfStones([125, 17])
    lineOfStones.blinkTimes(25)
    expect(lineOfStones.getCount()).toBe(55312)
  })

  test('Part 2', () => {
    const lineOfStones = new LineOfStones([
      30, 71441, 3784, 580926, 2, 8122942, 0, 291,
    ])
    lineOfStones.blinkTimes(75)
    expect(lineOfStones.getCount()).toBe(228651922369703)
  })
})
