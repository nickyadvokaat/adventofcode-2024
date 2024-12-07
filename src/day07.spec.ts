import { describe, expect, test } from 'vitest'
import { findCalibrationRecursive } from './day07'

describe('Day07', () => {
  test('Test calibration', () => {
    expect(findCalibrationRecursive(190, [10, 19])).toBe(true)
    expect(findCalibrationRecursive(83, [17, 5])).toBe(false)
  })
})
