import { readFile } from './util/fileUtil'

export default function day07() {
  const { sums, values } = transformData(readFile('07-t'))

  let solution = 0
  for (let i = 0; i < values.length; i++) {
    if (findCalibrationRecursive(sums[i], values[i])) {
      solution += sums[i]
    }
  }
  console.log(solution)
}

export function transformData(data: string[]): {
  sums: number[]
  values: number[][]
} {
  const sums = data.map((s) => parseInt(s.split(':')[0]))
  const values = data.map((s) =>
    s
      .split(': ')[1]
      .split(' ')
      .map((i) => parseInt(i))
  )
  return { sums, values }
}

export function findCalibrationRecursive(
  sum: number,
  values: number[],
  acc: number = 0
): boolean {
  if (values.length === 0) {
    return sum === acc
  }
  if (acc > sum) {
    return false
  }
  if (acc === 0) {
    return findCalibrationRecursive(sum, values.toSpliced(0, 1), values[0])
  }
  return (
    findCalibrationRecursive(sum, values.toSpliced(0, 1), acc + values[0]) ||
    findCalibrationRecursive(sum, values.toSpliced(0, 1), acc * values[0]) ||
    findCalibrationRecursive(
      sum,
      values.toSpliced(0, 1),
      parseInt(`${acc}${values[0]}`)
    )
  )
}
