import { describe, expect, test } from 'vitest'
import { readFile } from './util/fileUtil'
import { scoreOfPaths, scoreOfTrailheads } from './day10'

describe('Day10', () => {
  const data = readFile('10-t').map((s) =>
    s.split('').map((str) => parseInt(str))
  )

  test('Part 1', () => {
    expect(scoreOfTrailheads(data)).toBe(36)
  })

  test('Part 2', () => {
    expect(scoreOfPaths(data)).toBe(81)
  })
})
