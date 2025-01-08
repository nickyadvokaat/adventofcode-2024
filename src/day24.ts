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

  console.log(nodes)

  const z = nodes
    .filter((n) => n.name.includes('z'))
    .sort((a, b) => b.name.localeCompare(a.name))
    .map((n) => (n.value ? '1' : '0'))
    .join('')
  const number = parseInt(z, 2)

  console.log(z, number)
}

function getNode(nodes: node[], name: string): node {
  return nodes.find((n) => n.name === name)!
}
