const fs = require('fs')

fs.readFile('./test.txt', 'utf-8', (err, data) => {
  if (err) throw err
  let lastLayer = 0
  const result = data
    .split('\n')
    .map(l => l.split(':').map(Number))
    .reduce((acc, el) => {
      if (lastLayer < el[0]) {
        lastLayer = el[0]
      }
      acc[el[0]] = el[1]
      return acc
    }, {})
  const fireWall = new Array(lastLayer).fill(undefined).map((e, i) => {
    if (result[i]) {
      const layer = [i, new Array(result[i]).fill(false)]
      layer[1][0] = true
      return layer
    } else {
      return [i, []]
    }
  })
  console.log(fireWall)
})

function scan(pointer, arr, dir) {}

// position of pointer
// direction of pointer
// check out of bounds
// increment / decrement
