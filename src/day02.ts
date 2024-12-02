import { readFile } from './util/fileUtil'

export default function day02() {
  const data = readFile('02').map((s) => s.split(' ').map((n) => parseInt(n)))
  const solution1 = data.filter((l) => isSafe(l)).length
  const solution2 = data.filter((l) => isSafeDampened(l)).length
  console.log(solution1)
  console.log(solution2)
}

export function isSafeDampened(input: number[]): boolean {
  if (isSafe(input)) return true

  for (let i = 0; i < input.length; ++i) {
    if (isSafe(input.toSpliced(i, 1))) return true
  }
  return false
}

export function isSafe(input: number[]): boolean {
  return isAllIncreasing(input) || isAllIncreasing(input.reverse())
}

function isAllIncreasing(input: number[]): boolean {
  for (let i = 0; i < input.length - 1; i++) {
    const a = input[i]
    const b = input[i + 1]
    if (a >= b || b - a < 1 || b - a > 3) return false
  }
  return true
}
