export const Direction = {
  N: 0,
  NE: 1,
  E: 2,
  SE: 3,
  S: 4,
  SW: 5,
  W: 6,
  NW: 7,
} as const

export type Direction = (typeof Direction)[keyof typeof Direction]

export function DirectionToRight(direction: Direction): Direction {
  return ((direction + 2) % 8) as Direction
}
