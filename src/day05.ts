import { readFile } from './util/fileUtil'

export type OrderRule = { before: number; after: number }
export type Update = number[]

export default function day05() {
  const data = readFile('05-t')
  let { updates, rules } = loadData(data)

  console.log(getSolutionPart1(updates, rules))
  console.log(getSolutionPart2(updates, rules))
}

export function loadData(data: string[]): {
  updates: Update[]
  rules: OrderRule[]
} {
  const rules: OrderRule[] = data
    .filter((s) => s.includes('|'))
    .map((s) => s.split('|'))
    .map((s) => {
      return { before: parseInt(s[0]), after: parseInt(s[1]) }
    })
  const updates: Update[] = data
    .filter((s) => s.includes(','))
    .map((s) => {
      return s.split(',').map((x) => parseInt(x))
    })
  return { updates, rules }
}

export function getSolutionPart1(
  updates: Update[],
  rules: OrderRule[]
): number {
  return updates
    .filter((u) => isSorted(u, rules))
    .reduce((a, c) => a + getMiddleValue(c), 0)
}

export function getSolutionPart2(
  updates: Update[],
  rules: OrderRule[]
): number {
  return updates
    .filter((u) => !isSorted(u, rules))
    .map((u) => sortUpdate(u, rules))
    .reduce((a, c) => a + getMiddleValue(c), 0)
}

function sortUpdate(update: Update, rules: OrderRule[]): Update {
  return update.sort((a, b) => {
    const x = rules.filter((r) => r.before === a && r.after === b)
    const y = rules.filter((r) => r.before === b && r.after === a)

    if (x.length > 0) {
      return -1
    } else if (y.length > 0) {
      return 1
    } else {
      return 0
    }
  })
}

function isSorted(update: Update, rules: OrderRule[]): boolean {
  const sorted = sortUpdate([...update], rules)
  return sorted.every((v, i) => v === update[i])
}

function getMiddleValue(update: Update): number {
  return update[Math.floor(update.length / 2)]
}
