import { readFile } from './util/fileUtil'

type node = { name: string; value: boolean | undefined }
type operator = 'AND' | 'OR' | 'XOR'
type connection = {
  nodeA: string
  operator: operator
  nodeB: string
  nodeC: string
  isDone: boolean
}

export default function day24() {
  const data = readFile('24')
  const { nodes, connections } = getNodesAndConnections(data)

  while (connections.some((c) => !c.isDone)) {
    const notDone = connections.filter((c) => !c.isDone)
    const ready = notDone.filter((c) => {
      return (
        getNode(nodes, c.nodeA).value !== undefined &&
        getNode(nodes, c.nodeB).value !== undefined
      )
    })
    ready.forEach((connection) => {
      let valueA = getNode(nodes, connection.nodeA).value!
      let valueB = getNode(nodes, connection.nodeB).value!
      let value = false
      switch (connection.operator) {
        case 'OR':
          value = valueA || valueB
          break
        case 'AND':
          value = valueA && valueB
          break
        case 'XOR':
          value = (valueA && !valueB) || (!valueA && valueB)
          break
      }
      getNode(nodes, connection.nodeC).value = value
      connection.isDone = true
    })
  }
  const z = nodes
    .filter((n) => n.name.includes('z'))
    .sort((a, b) => b.name.localeCompare(a.name))
    .map((n) => (n.value ? '1' : '0'))
    .join('')

  console.log('part1:', parseInt(z, 2))
  const result = ['z19', 'sbg', 'z37', 'dsd', 'z12', 'djg', 'hjm', 'mcq']
  console.log('part2:', result.sort((a, b) => a.localeCompare(b)).join(','))

  swapOutput(connections, 'z19', 'sbg')
  swapOutput(connections, 'z37', 'dsd')
  swapOutput(connections, 'z12', 'djg')
  swapOutput(connections, 'hjm', 'mcq')

  const graphviz = require('graphviz')
  const g = graphviz.digraph('G')
  nodes.forEach((n) => {
    let color = 'blue'
    if (n.name.includes('z')) color = 'red'
    if (n.name.includes('x')) color = 'yellow'
    if (n.name.includes('y')) color = 'purple'
    const n1 = g.addNode(n.name, { color: color })
    n1.set('style', 'filled')
  })

  connections.forEach((c) => {
    let e = g.addEdge(c.nodeA, c.nodeC)
    e.set('color', getColor(c.operator))
    e = g.addEdge(c.nodeB, c.nodeC)
    e.set('color', getColor(c.operator))
  })
  g.output('png', 'day24-2.png')
}

export function getNodesAndConnections(data: string[]): {
  nodes: node[]
  connections: connection[]
} {
  const nodes: node[] = data
    .filter((s) => s.includes(':'))
    .map((s) => {
      const split = s.split(': ')
      return { name: split[0], value: split[1] === '1' }
    })
  const connections: connection[] = []
  data
    .filter((s) => s.includes('>'))
    .forEach((s) => {
      const split = s.replace('-> ', '').split(' ')
      connections.push({
        nodeA: split[0],
        operator: split[1] as operator,
        nodeB: split[2],
        nodeC: split[3],
        isDone: false,
      })
      const newNodes = [split[0], split[2], split[3]]
      newNodes.forEach((node) => {
        if (!nodes.some((n) => n.name === node)) {
          nodes.push({ name: node, value: undefined })
        }
      })
    })
  return { nodes, connections }
}

function getNode(nodes: node[], name: string): node {
  return nodes.find((n) => n.name === name)!
}

function getColor(operator: operator): string {
  switch (operator) {
    case 'OR':
      return 'blue'
    case 'AND':
      return 'red'
    case 'XOR':
      return 'green'
  }
}

function swapOutput(connections: connection[], nameA: string, nameB: string) {
  const connectionA = connections.find((c) => c.nodeC === nameA)!
  const connectionB = connections.find((c) => c.nodeC === nameB)!

  const s = connectionA.nodeC
  connectionA.nodeC = connectionB.nodeC
  connectionB.nodeC = s
}
