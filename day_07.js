const fs = require('fs')

function removeCommas(arr) {
  return arr.map(str => str.replace(',', ''))
}

function formatWeight(str) {
  return Number(str.substring(1, str.length - 1))
}

function Node(value, weight, children = [], parent = null) {
  return {
    value,
    weight: formatWeight(weight),
    children: removeCommas(children),
    parent
  }
}

fs.readFile('./input_07.txt', 'utf-8', (err, data) => {
  if (err) return err

  const deezNodes = {}
  data
    .split('\n')
    .map(line => {
      const [value, weight, arrow, ...children] = line.split(' ')
      return (deezNodes[value] = Node(value, weight, children))
    })
    .forEach(node => {
      node.children.forEach(childNodeValue => {
        deezNodes[childNodeValue].parent = node
      })
    })

  const root = Object.values(deezNodes).find(n => !n.parent)
  console.log(root)
})
