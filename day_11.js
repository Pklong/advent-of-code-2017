const fs = require('fs')

fs.readFile('./input_11.txt', 'utf-8', (err, data) => {
  if (err) throw err

  let pos = [0, 0]
  let farthest = 0
  let steps = 0

  const dirs = {
    s: [0, -1],
    n: [0, 1],
    e: [1, 0],
    w: [-1, 0],
    se: [1, -1],
    sw: [-1, -1],
    ne: [1, 1],
    nw: [-1, 1]
  }

  const move = (pos, dir) => {
    const [x, y] = dirs[dir]
    return [pos[0] + x, pos[1] + y]
  }

  data.split(',').forEach(e => {
    pos = move(pos, e)
    if (Math.max(...pos) > farthest) {
      farthest = Math.max(...pos)
    }
  })

  // Before realizing steps is just the max (abs) coordinate ¯\_(ツ)_/¯...
  while (pos[0] || pos[1]) {
    let dir = ''
    if (pos[1]) {
      if (pos[1] > 0) {
        dir += 's'
      } else {
        dir += 'n'
      }
    }

    if (pos[0]) {
      if (pos[0] > 0) {
        dir += 'w'
      } else {
        dir += 'e'
      }
    }
    pos = move(pos, dir)
    steps++
  }

  console.log('steps away', steps)
  console.log('farthest away', farthest)
})
