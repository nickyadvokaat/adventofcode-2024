import { readFile } from './util/fileUtil'

const patternMul = /mul\((\d+),(\d+)\)/g
const patternDo = /do\(\)/g
const patternDont = /don't\(\)/g

export default function day03() {
  const text = readFile('03').reduce((a, c) => a + c, '')
  console.log(getMultiplicationSum(text))
  console.log(getEnabledMultiplicationSum(text))
}

export function getMultiplicationSum(text: string): number {
  let matches = text.matchAll(patternMul)
  let sum = 0
  for (const match of matches) {
    sum += parseInt(match[1]) * parseInt(match[2])
  }
  return sum
}

export function getEnabledMultiplicationSum(text: string): number {
  let indicesDo = []
  let indicesDont = []
  let match = null
  while ((match = patternDont.exec(text))) {
    indicesDont.push(match.index)
  }
  while ((match = patternDo.exec(text))) {
    indicesDo.push(match.index)
  }
  let sum = 0
  while ((match = patternMul.exec(text))) {
    if (lastCheckIsDo(indicesDo, indicesDont, match.index)) {
      sum += parseInt(match[1]) * parseInt(match[2])
    }
  }
  return sum
}

function lastCheckIsDo(
  doIndices: number[],
  dontIndices: number[],
  indexOfInstruction: number
): boolean {
  let lastDo = -1
  let lastDont = -2
  let i = 0
  while (i < doIndices.length && doIndices[i] < indexOfInstruction) {
    lastDo = doIndices[i]
    i++
  }
  i = 0
  while (i < dontIndices.length && dontIndices[i] < indexOfInstruction) {
    lastDont = dontIndices[i]
    i++
  }
  return lastDo > lastDont
}
