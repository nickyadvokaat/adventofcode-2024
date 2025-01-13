import { readFile } from './util/fileUtil'

export default function day22() {
  const data = readFile('22').map((s) => parseInt(s))
  const priceLists = data.map((n) => getPriceList(n))
  const changeLists = priceLists.map((n) => getDiffList(n))
  let max = 0
  for (let i = -9; i <= 9; i++) {
    for (let j = -9; j <= 9; j++) {
      for (let k = -9; k <= 9; k++) {
        for (let l = -9; l <= 9; l++) {
          const sequence = [i, j, k, l]
          let sum = 0
          changeLists.forEach((cl, index) => {
            const fi = firstIndex(cl, sequence)
            if (fi !== -1) sum += priceLists[index][fi + 4]
          })
          if (sum > max) {
            max = sum
            console.log(sequence, max)
          }
        }
      }
    }
  }
  console.log(max)
}

export function firstIndex(changes: number[], sequence: number[]): number {
  for (let i = 0; i < changes.length - 3; i++) {
    if (changes[i] !== sequence[0]) continue
    if (changes[i + 1] !== sequence[1]) continue
    if (changes[i + 2] !== sequence[2]) continue
    if (changes[i + 3] !== sequence[3]) continue
    return i
  }
  return -1
}

export function getPriceList(n: number, amount = 2000): number[] {
  let arr: number[] = [n % 10]
  for (let i = 0; i < amount - 1; i++) {
    n = step(n)
    arr.push(n % 10)
  }
  return arr
}

export function getDiffList(arr: number[]): number[] {
  const diff: number[] = []
  for (let i = 0; i < arr.length - 1; i++) {
    diff[i] = arr[i + 1] - arr[i]
  }
  return diff
}

export function part1(data: number[], steps = 2000): number {
  return data.reduce((a, n) => {
    let x = n
    for (let i = 0; i < steps; i++) {
      x = step(x)
    }
    return a + x
  }, 0)
}

function step(n: number): number {
  const mask = 16777216 - 1
  n = (n ^ (n << 6)) & mask
  n = (n ^ (n >> 5)) & mask
  return (n ^ (n << 11)) & mask
}
