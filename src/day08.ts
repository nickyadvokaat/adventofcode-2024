import { readFile } from './util/fileUtil'
import { Grid } from './util/grid'
import { distanceToCoord } from './util/coord'

export default function day08() {
  const data = readFile('08').map((s) => s.split(''))

  console.log(calculateAntinodeCount(data))
  console.log(calculateAntinodeCount(data, true))
}

export function calculateAntinodeCount(
  data: string[][],
  hasResonantHarmonics = false
): number {
  const grid = new Grid<string>(data)
  grid.transpose()
  const markingGrid = new Grid<string>(data)
  markingGrid.transpose()
  const uniqueValues = grid.getUniquevalues().filter((v) => v !== '.')
  uniqueValues.forEach((v) => {
    const instances = grid.find(v)
    for (let i = 0; i < instances.length; i++) {
      for (let j = 0; j < instances.length; j++) {
        if (i === j) continue
        const from = instances[i]
        const to = instances[j]
        const diff = distanceToCoord(from, to)

        if (hasResonantHarmonics) {
          let check = true
          let step = 1
          while (check) {
            let toMark = {
              x: from.x + diff.x * step,
              y: from.y + diff.y * step,
            }
            if (markingGrid.isOutOfBounds(toMark)) {
              check = false
            } else {
              markingGrid.set(toMark, '#')
              step++
            }
          }
        } else {
          markingGrid.set(
            {
              x: from.x + diff.x * 2,
              y: from.y + diff.y * 2,
            },
            '#'
          )
        }
      }
    }
  })
  return markingGrid.find('#').length
}
