export default function day11() {
  let lineOfStones = new LineOfStones([
    30, 71441, 3784, 580926, 2, 8122942, 0, 291,
  ])
  lineOfStones.blinkTimes(75)
  console.log(lineOfStones.getCount())
}

export class LineOfStones {
  private map = new Map<number, number>()

  constructor(input: number[]) {
    input.forEach((x) => {
      this.increment(this.map, x, 1)
    })
  }

  public blinkTimes(n: number = 1): void {
    for (let i = 0; i < n; i++) {
      this.blink()
    }
  }

  public getCount() {
    let count = 0
    this.map.forEach((n) => {
      count += n
    })
    return count
  }

  private blink(): void {
    const newMap = new Map<number, number>()
    this.map.forEach((n, s) => {
      const str = s.toString()
      if (s === 0) {
        this.increment(newMap, 1, n)
      } else if (str.length % 2 === 0) {
        this.increment(newMap, parseInt(str.slice(0, str.length / 2)), n)
        this.increment(
          newMap,
          parseInt(str.slice(str.length / 2, str.length)),
          n
        )
      } else {
        this.increment(newMap, s * 2024, n)
      }
    })
    this.map = newMap
  }

  private increment(map: Map<number, number>, stone: number, n: number) {
    map.set(stone, (map.get(stone) || 0) + n)
  }
}
