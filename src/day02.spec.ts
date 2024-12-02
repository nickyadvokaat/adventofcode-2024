import { describe, expect, test } from 'vitest'
import { readFile } from './util/fileUtil'
import { isSafe, isSafeDampened } from './day02'

describe('Day02', () => {
  const testData = readFile('02-t').map((s) =>
    s.split(' ').map((n) => parseInt(n))
  )

  test('Part 1', () => {
    const example1 = testData.filter((l) => isSafe(l)).length
    expect(example1).toBe(2)
  })

  test('Part 2', () => {
    const example1 = testData.filter((l) => isSafeDampened(l)).length
    expect(example1).toBe(4)
  })
})
