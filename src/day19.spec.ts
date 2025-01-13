import { describe, expect, test } from 'vitest'
import { isDesignPossible } from './day19'

describe('Day19', () => {
  test('Part 1', () => {
    const options = ['r', 'wr', 'b', 'g', 'bwu', 'rb', 'gb', 'br']
    const towels = [
      'brwrr',
      'bggr',
      'gbbr',
      'rrbgbr',
      'ubwu',
      'bwurrg',
      'brgr',
      'bbrgwb',
    ]
    const maxLength = options.reduce((a, c) => Math.max(a, c.length), 0)
    const part1 = towels.filter((t) =>
      isDesignPossible(t, options, maxLength)
    ).length
    expect(part1).toBe(6)
  })
})
