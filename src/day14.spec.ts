import { describe, expect, test } from 'vitest'
import { readFile } from './util/fileUtil'
import { runPart1, transformData } from './day14'

describe('Day14', () => {
  test('Part 1 test', () => {
    const testData = transformData(readFile('14-t'))
    expect(runPart1(testData, 11, 7)).toBe(12)
  })

  test('Part 1', () => {
    const data = transformData(readFile('14'))
    expect(runPart1(data)).toBe(229980828)
  })
})
