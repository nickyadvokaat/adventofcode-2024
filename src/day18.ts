import { readFile } from './util/fileUtil'
import { Grid } from './util/grid'
import { getShortestPath } from './util/getShortestPath'

const large = true
const size = large ? 71 : 7
const nBytes = large ? 1024 : 12

export default function day18() {
  const data = readFile(large ? '18' : '18-t').map((s) =>
    s.split(',').map((str) => parseInt(str))
  )
  const grid = new Grid<boolean>(
    Array.from({ length: size }, () => Array(size).fill(false))
  )

  for (let i = 0; i < data.length; i++) {
    const d = data[i]
    grid.set({ x: d[0], y: d[1] }, true)
    const shortest = getShortestPath(grid)
    if (shortest === -1) {
      console.log(d)
      break
    }
  }
}
