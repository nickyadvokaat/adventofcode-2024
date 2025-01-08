import { readFile } from './util/fileUtil'

export default function day25() {
  const data = readFile('25-t')
  const { locks, keys } = getLocksAndKeys(data)
  console.log('fitting pairs', getNumberOfFittingPairs(locks, keys))
}

export function getLocksAndKeys(data: string[]): {
  locks: number[][]
  keys: number[][]
} {
  const locks: number[][] = []
  const keys: number[][] = []
  let newValue: number[] = [0, 0, 0, 0, 0]
  let isKey = false
  for (let i = 0; i < data.length; i++) {
    const s = data[i]
    if (s === '') {
      newValue = [0, 0, 0, 0, 0]
    } else if (i % 8 === 0) {
      isKey = s.indexOf('#') === -1
    } else if (i % 8 === 6) {
      if (isKey) {
        keys.push([...newValue])
      } else {
        locks.push([...newValue])
      }
    } else {
      Array.from(s).forEach((v, i) => {
        if (v === '#') newValue[i]++
      })
    }
  }
  return { locks, keys }
}

export function getNumberOfFittingPairs(
  locks: number[][],
  keys: number[][]
): number {
  let count = 0
  locks.forEach((lock) => {
    keys.forEach((key) => {
      let fits = true
      for (let i = 0; i < lock.length; i++) {
        if (lock[i] + key[i] > 5) {
          fits = false
        }
      }
      if (fits) count++
    })
  })
  return count
}
