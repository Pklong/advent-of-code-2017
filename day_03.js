function move(pos, dir) {
  switch (dir) {
    case 'u':
      return [pos[0], pos[1] - 1]
    case 'd':
      return [pos[0], pos[1] + 1]
    case 'l':
      return [pos[0] - 1, pos[1]]
    case 'r':
      return [pos[0] + 1, pos[1]]
    default:
      console.log('uh oh!')
  }
}

function surroundingValues(pos) {
  const deltas = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [-1, 1],
    [-1, -1],
    [1, -1]
  ]
  return deltas
    .map(d => String([d[0] + pos[0], d[1] + pos[1]]))
    .filter(d => whereYaBeen[d])
    .map(d => whereYaBeen[d])
    .reduce((acc, el) => acc + el, 0)
}

const whereYaBeen = { '0,0': 1 }
let value = 1
let steps = 1
const dirs = ['r', 'd', 'l', 'u']
let dir = 0
let pos = [0, 0]

while (run) {
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < steps; j++) {
      pos = move(pos, dirs[dir % dirs.length])
      // value += 1
      value = surroundingValues(pos)
      whereYaBeen[String(pos)] = value
      if (value > 361527) {
        console.log(value)
        /* console.log(
         *   'Manhattan Distance:',
         *   pos.map(Math.abs).reduce((acc, num) => acc + num, 0)
         * )*/
        return
      }
    }
    dir += 1
  }
  steps += 1
}
