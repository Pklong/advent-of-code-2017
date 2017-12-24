const fs = require('fs')

const GenA = 16807
const GenB = 48271
const divisor = 2147483647

fs.readFile('./input_15.txt', 'utf-8', (err, data) => {
  if (err) throw err
  const start = data
    .split('\n')
    .map(l => l.split(' '))
    .map(l => l.filter(l => Number(l))[0])
    .map(Number)

  let countA = 0
  let countB = 0
  const valuesA = []
  const valuesB = []
  const limit = 5000000

  while (valuesA.length < limit) {
    start[0] *= GenA
    start[0] %= divisor
    if (start[0] % 4 === 0) {
      valuesA.push(pad(start[0].toString(2)).slice(-16))
    }
  }

  while (valuesB.length < limit) {
    start[1] *= GenB
    start[1] %= divisor
    if (start[1] % 8 === 0) {
      valuesB.push(pad(start[1].toString(2)).slice(-16))
    }
  }

  for (let i = 0; i < limit; i++) {
    if (valuesA[i] === valuesB[i]) {
      countB++
    }
  }
  console.log(countB)

  //PART 1
  /* for (let i = 0; i < 40000000; i++) {
   *   start[0] *= GenA
   *   start[1] *= GenB
   *   start[0] %= divisor
   *   start[1] %= divisor
   *   const [a, b] = start.map(n => pad(n.toString(2)).slice(-16))
   *   if (a === b) {
   *     countA++
   *   }
   * }
   * console.log(countA)*/
})

function pad(str) {
  const length = 32 - str.length
  let formattedString = str
  for (let i = 0; i < length; i++) {
    formattedString = `0${formattedString}`
  }
  return formattedString
}
