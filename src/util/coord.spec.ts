import { describe, expect, test } from 'vitest'
import { distanceToCoord } from './coord'

describe('Coord', () => {
  test('distanceToCoord', () => {
    expect(distanceToCoord({ x: 5, y: 3 }, { x: 5, y: 3 })).toEqual({
      x: 0,
      y: 0,
    })
    expect(distanceToCoord({ x: 5, y: 3 }, { x: 8, y: 9 })).toEqual({
      x: 3,
      y: 6,
    })
  })
})
