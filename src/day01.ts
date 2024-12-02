import { readFile } from './util/fileUtil'

export default function day01() {
    const data = readFile('01')

    console.log(getDistanceAndSimilarity(data))
}

export function getDistanceAndSimilarity(data: string[]): { distance: number, similarity: number } {
    const leftList = data.map(s => s.split('   ')[0]).map(s => Number(s)).sort()
    const rightList = data.map(s => s.split('   ')[1]).map(s => Number(s)).sort()

    let distance = 0
    let similarity = 0

    for(let i = 0; i < leftList.length; i++) {
        distance += Math.abs(leftList[i] - rightList[i])
        similarity += leftList[i] * rightList.filter(d => d === leftList[i]).length
    }
    return {distance, similarity}
}
