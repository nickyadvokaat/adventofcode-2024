import * as fs from 'fs'

export function readFile(day: string): string[] {
    return fs
        .readFileSync('data/day' + day + '.txt', 'utf8')
        .split('\n')
}
