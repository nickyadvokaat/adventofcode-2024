import { readFile } from './util/fileUtil'

export default function day19() {
  const data = readFile('19')
  const options = data.filter((s) => s.includes(','))[0].split(', ')
  const towels = data.filter((s) => !s.includes(',') && s.length > 0)
  const maxLength = options.reduce((a, c) => Math.max(a, c.length), 0)
  const part1 = towels.filter((t) =>
    isDesignPossible(t, options, maxLength)
  ).length
  console.log(part1)
  const part2 = towels.reduce(
    (a, c) => a + numberOfDesignOptions(c, options, maxLength),
    0
  )
  console.log(part2)
}

export function isDesignPossible(
  t: string,
  options: string[],
  maxLength: number,
  index = 0
): boolean {
  if (index === t.length) return true
  for (let i = 1; i <= Math.min(maxLength, t.length - index); i++) {
    const sub = t.slice(index, index + i)
    if (options.some((o) => o === sub)) {
      if (isDesignPossible(t, options, maxLength, index + i)) return true
    }
  }
  return false
}

export function numberOfDesignOptions(
  t: string,
  options: string[],
  maxLength: number,
  index = 0,
  mem = new Map<string, number>()
): number {
  if (index === t.length) {
    return 1
  }
  let result = 0
  for (let i = 1; i <= Math.min(maxLength, t.length - index); i++) {
    if (options.some((o) => o === t.slice(index, index + i))) {
      const key = t.slice(index + i, t.length)
      if (mem.has(key)) {
        result += mem.get(key)!
      } else {
        let n = numberOfDesignOptions(t, options, maxLength, index + i, mem)
        mem.set(key, n)
        result += n
      }
    }
  }
  return result
}
