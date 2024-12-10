import { readFile } from './util/fileUtil'

type block = { value: number; repeat: number }

export default function day09() {
  const data = readFile('09')[0]
    .split('')
    .map((c) => parseInt(c))
  console.log(diskChecksum1(data))
  console.log(diskChecksum2(data))
}

export function diskChecksum1(data: number[]): number {
  let input = []
  for (let i = 0; i < data.length; i += 2) {
    for (let j = 0; j < data[i]; j++) {
      input.push(`${i / 2}`)
    }
    for (let j = 0; j < data[i + 1]; j++) {
      input.push('.')
    }
  }
  let start = 0
  let end = input.length - 1
  while (true) {
    while (input[start] !== '.' && start < input.length) start++
    while (input[end] == '.' && end > 0) end--
    if (end <= start) break
    input[start] = input[end]
    input[end] = '.'
  }
  return input
    .filter((v) => v !== '.')
    .map((v) => parseInt(v))
    .reduce((acc, v, currentIndex) => acc + v * currentIndex, 0)
}

export function diskChecksum2(data: number[]): number {
  let blocks: block[] = []
  for (let i = 0; i < data.length; i += 2) {
    blocks.push({ value: i / 2, repeat: data[i] })
    if (i + 1 < data.length && data[i + 1] !== 0) {
      blocks.push({ value: -1, repeat: data[i + 1] })
    }
  }
  let indexOfBlockToMove = blocks.length - 1
  while (indexOfBlockToMove > 0) {
    if (blocks[indexOfBlockToMove].value !== -1) {
      const indexOfFirstFittingSpace = blocks.findIndex(
        (b) => b.value === -1 && b.repeat >= blocks[indexOfBlockToMove].repeat
      )
      if (
        indexOfFirstFittingSpace !== -1 &&
        indexOfFirstFittingSpace < indexOfBlockToMove
      ) {
        const spaceRepeat = blocks[indexOfFirstFittingSpace].repeat
        const blockRepeat = blocks[indexOfBlockToMove].repeat
        if (blockRepeat <= spaceRepeat) {
          blocks[indexOfFirstFittingSpace] = blocks[indexOfBlockToMove]
          blocks[indexOfBlockToMove] = { value: -1, repeat: blockRepeat }
          if (blockRepeat < spaceRepeat) {
            blocks.splice(indexOfFirstFittingSpace + 1, 0, {
              value: -1,
              repeat: spaceRepeat - blockRepeat,
            })
            indexOfBlockToMove++
          }
        }
      }
    }
    indexOfBlockToMove--
  }

  let sum = 0
  let index = 0
  blocks.forEach((b) => {
    if (b.value !== -1) {
      for (let i = 0; i < b.repeat; i++) {
        sum += b.value * (i + index)
      }
    }
    index += b.repeat
  })
  return sum
}
