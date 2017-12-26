const fs = require('fs')

/* '|': 'north-south',
 * '-': 'east-west',
 * '+': 'rotate',
 * ' ':  false,
*/

fs.readFile('./input_19.txt', 'utf-8', (err, data) => {
  if (err) throw err

  const dirs = {
    n: [0, -1],
    w: [-1, 0],
    e: [1, 0],
    s: [0, 1],
    '[0,1]': 's',
    '[1,0]': 'e',
    '[-1,0]': 'w',
    '[0,-1]': 'n'
  }

  const alphabet = new Array(26)
    .fill()
    .map((e, i) => String.fromCharCode(65 + i))

  const DELTAS = [[0, 1], [1, 0], [-1, 0], [0, -1]]
  const grid = data.split('\n').map(l => l.split(''))

  const letters = []
  let steps = 0
  let dir = 's'
  let pos = [grid[0].indexOf('|'), 0]
  let prevPos = null

  function move(d, pos) {
    const [x, y] = dirs[d]
    return [x + pos[0], y + pos[1]]
  }

  function getLoc(pos) {
    const [y, x] = pos
    return grid[x][y]
  }

  function checkDir(pos, dir) {
    const [x, y] = pos
    let newDir
    if (getLoc(pos) === '+') {
      const switchTrack = dir === 'n' || dir === 's' ? '-' : '|'
      DELTAS.filter(
        d => JSON.stringify(d) !== JSON.stringify(dirs[dir])
      )
        .map(d => {
          const [dx, dy] = d
          const m = { move: [dx + x, dy + y], dir: d }
          return m
        })
        .filter(d => JSON.stringify(d.move) !== JSON.stringify(prevPos))
        .forEach(d => {
          const loc = getLoc(d.move)
          if (loc === switchTrack || alphabet.includes(loc)) {
            newDir = dirs[JSON.stringify(d.dir)]
          }
        })
      return newDir
    } else {
      return dir
    }
  }

  function step() {
    prevPos = pos
    pos = move(dir, pos)
    if (alphabet.includes(getLoc(pos))) {
      letters.push(getLoc(pos))
    }
    dir = checkDir(pos, dir)
    steps++
  }

  while (getLoc(pos) !== ' ') {
    step()
  }
  console.log('Letters seen:', letters.join(''))
  console.log('Steps taken:', steps)
})
