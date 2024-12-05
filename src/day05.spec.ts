import { describe, expect, test } from 'vitest'
import { readFile } from './util/fileUtil'
import { getSolutionPart1, getSolutionPart2, loadData } from './day05'

describe('Day05', () => {
  const data = readFile('05-t')
  let { updates, rules } = loadData(data)

  test('Part 1', () => {
    expect(getSolutionPart1(updates, rules)).toBe(143)
  })

  test('Part 2', () => {
    expect(getSolutionPart2(updates, rules)).toBe(123)
  })
})
