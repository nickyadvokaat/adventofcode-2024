import { readFile } from './util/fileUtil'

export default function day13() {
  const data = mapMachineData(readFile('13'))
  console.log(calculateTokensToWinPrizes(data))
  console.log(calculateTokensToWinPrizes(data, true))
}

export function mapMachineData(input: string[]): number[] {
  return input
    .filter((s) => s !== '')
    .reduce((a, c, index) => (index === 0 ? a + c : a + ',' + c), '')
    .replace(/[^0-9|,]/g, '')
    .split(',')
    .map((s) => parseInt(s))
}

export function calculateTokensToWinPrizes(
  data: number[],
  isPart2 = false
): number {
  let sum = 0
  const inc = isPart2 ? 10000000000000 : 0
  for (let i = 0; i < data.length; i += 6) {
    sum += calculateTokensForMachine(
      data[i],
      data[i + 1],
      data[i + 2],
      data[i + 3],
      data[i + 4] + inc,
      data[i + 5] + inc
    )
  }
  return sum
}

function calculateTokensForMachine(
  aX: number,
  aY: number,
  bX: number,
  bY: number,
  x: number,
  y: number
): number {
  const det = aX * bY - aY * bX
  const a = (x * bY - y * bX) / det
  const b = (aX * y - aY * x) / det
  return a % 1 || b % 1 ? 0 : a * 3 + b
}
