import { describe, expect, test } from 'vitest'
import { findCalibrationRecursive, transformData } from './day07'
import { readFile } from './util/fileUtil'

describe('Day07', () => {
  test('Test calibration', () => {
    expect(findCalibrationRecursive(190, [10, 19])).toBe(true)
    expect(findCalibrationRecursive(83, [17, 5])).toBe(false)
  })

  test('Test calibration on test data', () => {
    const { sums, values } = transformData(readFile('07-t'))
    let solution = 0
    for (let i = 0; i < values.length; i++) {
      if (findCalibrationRecursive(sums[i], values[i])) {
        solution += sums[i]
      }
    }
    expect(solution).toBe(11387)
  })
})
