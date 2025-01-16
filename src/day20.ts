import { readFile } from './util/fileUtil'
import { Grid } from './util/grid'
import { addCoord, Coord } from './util/coord'
import { getShortestPathGrid } from './util/getShortestPath'

export default function day20() {
  const { grid, start, end } = transformData(readFile('20'))
  console.log(getNumberOfShortcuts(grid, start, end, 2, 100))
  console.log(getNumberOfShortcuts(grid, start, end, 20, 100))
}

export function transformData(data: string[]): {
  grid: Grid<boolean>
  start: Coord
  end: Coord
} {
  const gridData = data.map((s) => s.split('').map((str) => str === '#'))
  const grid = new Grid<boolean>(gridData)
  grid.transpose()
  let start: Coord = { x: 0, y: 0 }
  let end: Coord = { x: 0, y: 0 }
  data.forEach((s, y) => {
    s.split('').forEach((c, x) => {
      if (c === 'S') start = { x, y }
      if (c === 'E') end = { x, y }
    })
  })
  return { grid, start, end }
}

export function getNumberOfShortcuts(
  grid: Grid<boolean>,
  start: Coord,
  end: Coord,
  maxCheatLength = 20,
  minimumPicosecondsToSave = 100
): number {
  const shortestPathGrid = getShortestPathGrid(grid, start)
  let numberOfShortcuts = 0
  for (let x = 0; x < grid.getDim().x; x++) {
    for (let y = 0; y < grid.getDim().y; y++) {
      let cheatStart = { x, y }
      if (grid.getCoord(cheatStart)) {
        continue
      }
      const pathLengthAtCheatStart = shortestPathGrid.getCoord(cheatStart)!
      for (let cheatLength = 2; cheatLength <= maxCheatLength; cheatLength++) {
        for (let cheatX = 0; cheatX <= cheatLength; cheatX++) {
          const cheatY = cheatLength - cheatX
          for (let i = -1; i <= (cheatX === 0 ? -1 : 1); i += 2) {
            for (let j = -1; j <= (cheatY === 0 ? -1 : 1); j += 2) {
              const cheatEnd = addCoord(cheatStart, {
                x: i * cheatX,
                y: j * cheatY,
              })
              if (
                grid.getCoord(cheatEnd) === false &&
                pathLengthAtCheatStart +
                  cheatLength +
                  minimumPicosecondsToSave <=
                  shortestPathGrid.getCoord(cheatEnd)!
              ) {
                numberOfShortcuts++
              }
            }
          }
        }
      }
    }
  }
  return numberOfShortcuts
}
