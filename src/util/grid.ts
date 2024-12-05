export type Coord = { x: number; y: number }

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

export class Grid<T> {
  private matrix: T[][]

  constructor(data: T[][]) {
    this.matrix = data
  }

  get(x: number, y: number): T | null {
    if (
      x < 0 ||
      y < 0 ||
      x >= this.matrix.length ||
      y >= this.matrix[0].length
    ) {
      return null
    }
    return this.matrix[x][y]
  }

  getInDirection(
    coord: Coord,
    direction: Direction,
    numberOfSteps = 1
  ): T | null {
    const step = getStepDirection(direction)
    return this.get(
      coord.x + step.x * numberOfSteps,
      coord.y + step.y * numberOfSteps
    )
  }

  find(value: T): Coord[] {
    let result: Coord[] = []
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix[0].length; j++) {
        if (this.matrix[i][j] === value) {
          result.push({ x: i, y: j })
        }
      }
    }
    return result
  }

  transpose() {
    this.matrix = this.matrix[0].map((_, colIndex) =>
      this.matrix.map((row) => row[colIndex])
    )
  }

  print() {
    let s = ''
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix[0].length; j++) {
        s += this.matrix[j][i]
      }
      s += '\n'
    }
  }
}

function getStepDirection(direction: Direction): Coord {
  switch (direction) {
    case Direction.N:
      return { x: 0, y: -1 }
    case Direction.NE:
      return { x: 1, y: -1 }
    case Direction.E:
      return { x: 1, y: 0 }
    case Direction.SE:
      return { x: 1, y: 1 }
    case Direction.S:
      return { x: 0, y: 1 }
    case Direction.SW:
      return { x: -1, y: 1 }
    case Direction.W:
      return { x: -1, y: 0 }
    case Direction.NW:
      return { x: -1, y: -1 }
  }
}
