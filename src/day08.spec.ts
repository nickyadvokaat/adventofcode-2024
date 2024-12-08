import { describe, expect, test } from 'vitest'
import { readFile } from './util/fileUtil'
import { calculateAntinodeCount } from './day08'

describe('Day08', () => {
  const data = readFile('08-t').map((s) => s.split(''))

  test('Part 1', () => {
    expect(calculateAntinodeCount(data)).toBe(14)
  })

  test('Part 2', () => {
    expect(calculateAntinodeCount(data, true)).toBe(34)
  })
})
