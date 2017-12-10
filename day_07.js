const fs = require('fs')

fs.readFile('./input_07.txt', 'utf-8', (err, data) => {
  if (err) return err

  const deezNodes = {}
  const result = data
    .split('\n')
    .map(line => {
      const [value, weight, arrow, ...children] = line.split(' ')
      return (deezNodes[value] = Node(value, weight, children))
    })
    .forEach(node => {
      node.children.forEach(child => {
        deezNodes[child].parent = node
      })
      node.childWeights = node.children.map(c => findWeight(c))
    })

  const root = Object.values(deezNodes).find(n => !n.parent)
  console.log(`the tree's root is ${root.value}`)
  let children = root.children.slice()

  while (children.length) {
    let node = deezNodes[children.pop()]
    if (!same(node.childWeights)) {
      while (!same(node.childWeights)) {
        const uniqueNumber = findUniqueNumber(node.childWeights)
        const unbalancedIdx = node.childWeights.findIndex(
          e => e === uniqueNumber
        )
        node = deezNodes[node.children[unbalancedIdx]]
      }
      const unbalancedValue = findUniqueNumber(node.parent.childWeights)
      const balancedValue = node.parent.childWeights.find(
        e => e !== unbalancedValue
      )
      const correction = balancedValue - unbalancedValue + node.weight
      console.log(
        `To balance the tree, ${node.value}'s weight should be ${correction}`
      )
      return
    }
    children = children.concat(node.children)
  }

  ////////////////////////

  function findUniqueNumber(arr) {
    const stash = {}
    for (let i = 0; i < arr.length; i++) {
      const el = arr[i]
      if (stash[el]) {
        stash[el]++
      } else {
        stash[el] = 1
      }
    }
    return Number(Object.keys(stash).filter(k => stash[k] === 1)[0])
  }

  function findWeight(n) {
    const node = deezNodes[n]
    if (!node.children.length) {
      return node.weight
    }
    return (
      node.children
        .map(child => findWeight(child))
        .reduce((acc, weight) => acc + weight, 0) + node.weight
    )
  }

  function removeCommas(arr) {
    return arr.map(str => str.replace(',', ''))
  }

  function same(arr) {
    return arr.every(e => e === arr[0])
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
})
