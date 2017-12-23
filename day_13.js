const fs = require('fs')

fs.readFile('./input_13.txt', 'utf-8', (err, data) => {
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

  const fireWall = new Array(lastLayer + 1)
    .fill(undefined)
    .map((e, i) => {
      if (result[i]) {
        return Layer(result[i])
      } else {
        return Layer(0)
      }
    })

  let totalSeverity = 0

  for (let i = 0; i < fireWall.length; i++) {
    const layer = fireWall[i]
    if (layer.length === 0) continue
    const time = (delay + i) % (layer.length * 2 - 2)
    if (time === 0) {
      totalSeverity += i * layer.length
    }
  }

  let delay = 0
  let caught = true

  while (caught) {
    caught = false
    for (let i = 0; i < fireWall.length; i++) {
      const layer = fireWall[i]
      if (layer.length === 0) continue
      const time = (delay + i) % (layer.length * 2 - 2)
      if (time === 0) {
        delay++
        caught = true
        break
      }
    }
  }
  console.log(
    'if starting immediately, your caught level is',
    totalSeverity
  )
  console.log('To avoid getting caught, start on picosecond ', delay)
})

// wrote this to simulate moving through firewall
// before steps % length * 2 - 2 insight...
function Layer(length) {
  return {
    dir: 1,
    pointer: 0,
    length,
    scan: function() {
      if (
        this.pointer + this.dir >= this.length ||
        this.pointer + this.dir < 0
      ) {
        this.dir = this.dir > 0 ? -1 : 1
      }
      this.pointer += this.dir
    },
    reset: function() {
      this.pointer = 0
      this.dir = 1
    }
  }
}
