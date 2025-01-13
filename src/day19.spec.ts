import { describe, expect, test } from 'vitest'
import { isDesignPossible, numberOfDesignOptions } from './day19'

describe('Day19', () => {
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

  test('Part 1', () => {
    const part1 = towels.filter((t) =>
      isDesignPossible(t, options, maxLength)
    ).length
    expect(part1).toBe(6)
  })

  test('Part 2', () => {
    const part2 = towels.reduce(
      (a, c) => a + numberOfDesignOptions(c, options, maxLength),
      0
    )
    expect(part2).toBe(16)
  })
})
