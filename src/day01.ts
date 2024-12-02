import { readFile } from './util/fileUtil'

export default function day01() {
    const data = readFile('01')
    const leftList = data.map(s => s.split('   ')[0]).map(s => Number(s)).sort()
    const rightList = data.map(s => s.split('   ')[1]).map(s => Number(s)).sort()

    let distance = 0
    for(let i = 0; i < data.length; i++) {
        distance += Math.abs(leftList[i] - rightList[i])
    }
    console.log(distance)

    let similarity = 0
    for(let i = 0; i < data.length; i++) {
        similarity += leftList[i] * rightList.filter(d => d === leftList[i]).length
    }
    console.log(similarity)
}