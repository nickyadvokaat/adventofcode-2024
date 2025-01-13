import { readFile } from './util/fileUtil'

export default function day19() {
  const data = readFile('19-t')
  const options = data.filter((s) => s.includes(','))[0].split(', ')
  const towels = data.filter((s) => !s.includes(',') && s.length > 0)

  console.log(options, towels)
  const maxLength = options.reduce((a, c) => Math.max(a, c.length), 0)
  const part1 = towels.filter((t) =>
    isDesignPossible(t, options, maxLength)
  ).length
  console.log(part1)
}

export function isDesignPossible(
  t: string,
  options: string[],
  maxLength: number,
  index = 0
): boolean {
  // console.log(t.slice(0, index - 1), index === t.length)
  if (index === t.length) return true
  for (let i = 1; i <= Math.min(maxLength, t.length - index); i++) {
    const sub = t.slice(index, index + i)
    if (options.some((o) => o === sub)) {
      if (isDesignPossible(t, options, maxLength, index + i)) return true
    }
  }
  return false
}
