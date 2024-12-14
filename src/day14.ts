import { readFile } from './util/fileUtil'
import { addCoord, Coord } from './util/coord'

type robot = { position: Coord; velocity: Coord }

export default function day14() {
  const data = transformData(readFile('14'))

  displayTree(data)
}

export function transformData(data: string[]): robot[] {
  return data
    .map((s) =>
      s
        .replace(/[\s]/g, ',')
        .replace(/[^0-9|,|-]/g, '')
        .split(',')
        .map((str) => parseInt(str))
    )
    .map((d) => {
      return { position: { x: d[0], y: d[1] }, velocity: { x: d[2], y: d[3] } }
    })
}

export function runPart1(
  data: robot[],
  dimX: number = 101,
  dimY: number = 103
): number {
  for (let i = 0; i < 100; i++) {
    elapseSecond(data, dimX, dimY)
  }
  return safetyFactor(data, dimX, dimY)
}

function displayTree(data: robot[]) {
  const checkCoords: Coord[] = [
    { x: 50, y: 40 },
    { x: 50, y: 41 },
    { x: 50, y: 42 },
    { x: 50, y: 43 },
    {
      x: 50,
      y: 44,
    },
  ]
  for (let i = 0; i < 14611; i++) {
    if (
      checkCoords.every((c) =>
        data.some((r) => r.position.x === c.x && r.position.y === c.y)
      )
    ) {
      print(data)
      console.log(i)
      return
    }
    elapseSecond(data, 101, 103)
  }
}

function print(data: robot[]) {
  for (let y = 0; y < 101; y++) {
    let s = ''
    for (let x = 0; x < 103; x++) {
      s += data.some((r) => r.position.x === x && r.position.y === y)
        ? '█'
        : ' '
    }
    console.log(s)
  }
}

function safetyFactor(
  data: robot[],
  dimX: number = 101,
  dimY: number = 103
): number {
  const midX = Math.floor(dimX / 2)
  const midY = Math.floor(dimY / 2)
  return (
    data.filter((r) => r.position.x < midX && r.position.y < midY).length *
    data.filter((r) => r.position.x > midX && r.position.y < midY).length *
    data.filter((r) => r.position.x < midX && r.position.y > midY).length *
    data.filter((r) => r.position.x < midX && r.position.y < midY).length
  )
}

function elapseSecond(data: robot[], dimX: number, dimY: number): void {
  data.forEach((r) => {
    r.position = addCoord(r.position, r.velocity)
    r.position.x += dimX
    r.position.x %= dimX
    r.position.y += dimY
    r.position.y %= dimY
  })
}
