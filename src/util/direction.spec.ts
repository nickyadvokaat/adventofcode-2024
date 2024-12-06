import { describe, expect, test } from 'vitest'
import { Direction, DirectionToRight } from './direction'

describe('Direction', () => {
  test('ToRight', () => {
    expect(DirectionToRight(Direction.N)).toBe(Direction.E)
    expect(DirectionToRight(Direction.W)).toBe(Direction.N)
  })
})
