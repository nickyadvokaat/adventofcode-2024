import { Coord, getStepInDirection } from './coord'
import { Direction } from './direction'

export class Grid<T> {
  private matrix: T[][]

  constructor(data: T[][]) {
    this.matrix = data
  }

  get(x: number, y: number): T | null {
    if (this.isOutOfBounds({ x, y })) {
      return null
    }
    return this.matrix[x][y]
  }

  set(coord: Coord, value: T): void {
    this.matrix[coord.x][coord.y] = value
  }

  isOutOfBounds(coord: Coord): boolean {
    return (
      coord.x < 0 ||
      coord.y < 0 ||
      coord.x >= this.matrix.length ||
      coord.y >= this.matrix[0].length
    )
  }

  getInDirection(
    coord: Coord,
    direction: Direction,
    numberOfSteps = 1
  ): T | null {
    const step = getStepInDirection(direction)
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
    console.log(s)
  }
}
