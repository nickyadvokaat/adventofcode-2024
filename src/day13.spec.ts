import { describe, expect, test } from 'vitest'
import { readFile } from './util/fileUtil'
import { calculateTokensToWinPrizes, mapMachineData } from './day13'

describe('Day13', () => {
  const data = mapMachineData(readFile('13'))

  test('Part 1', () => {
    expect(calculateTokensToWinPrizes(data)).toBe(40069)
  })

  test('Part 1', () => {
    expect(calculateTokensToWinPrizes(data, true)).toBe(71493195288102)
  })
})
