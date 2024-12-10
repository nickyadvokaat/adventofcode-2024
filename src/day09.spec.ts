import { describe, expect, test } from 'vitest'
import { diskChecksum1, diskChecksum2 } from './day09'

describe('Day09', () => {
  const data = '2333133121414131402'.split('').map((c) => parseInt(c))

  test('Part 1', () => {
    expect(diskChecksum1(data)).toBe(1928)
  })

  test('Part 2', () => {
    expect(diskChecksum2(data)).toBe(2858)
  })
})
