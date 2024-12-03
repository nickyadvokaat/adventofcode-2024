import { describe, expect, test } from 'vitest'
import { getEnabledMultiplicationSum, getMultiplicationSum } from './day03'

const test1 =
  'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))'
const test2 =
  "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"

describe('Day03', () => {
  test('Part 1', () => {
    expect(getMultiplicationSum(test1)).toBe(161)
  })

  test('Part 2', () => {
    expect(getEnabledMultiplicationSum(test2)).toBe(48)
  })
})
