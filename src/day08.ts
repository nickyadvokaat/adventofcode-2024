import { readFile } from './util/fileUtil'
import { Grid } from './util/grid'
import { distanceToCoord } from './util/coord'

export default function day08() {
  const data = readFile('08').map((s) => s.split(''))
  const grid = new Grid<string>(data)
  grid.transpose()
  const markingGrid = new Grid<string>(data)
  markingGrid.transpose()
  const uniqueValues = grid.getUniquevalues().filter((v) => v !== '.')
  uniqueValues.forEach((v) => {
    const instances = grid.find(v)
    console.log(instances)
    for (let i = 0; i < instances.length; i++) {
      for (let j = 0; j < instances.length; j++) {
        if (i !== j) {
          const coord = distanceToCoord(instances[i], instances[j])
          markingGrid.set(
            {
              x: instances[i].x + coord.x * 2,
              y: instances[i].y + coord.y * 2,
            },
            '#'
          )
        }
      }
    }
  })
  markingGrid.print()
  console.log(markingGrid.find('#').length)
}
