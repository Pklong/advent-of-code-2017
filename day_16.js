const fs = require('fs')
fs.readFile('./input_16.txt', 'utf-8', (err, data) => {
  if (err) throw err

  let result = new Array(16)
    .fill()
    .map((c, i) => String.fromCharCode('a'.charCodeAt() + i))

  const ops = {
    s: spin,
    x: exchange,
    p: partner
  }

  const instructionSet = data.split(',').map(instruction => {
    let [op, ...arg] = instruction.split('')
    arg = arg.join('')
    if (arg.length > 2) {
      const [a, b] = arg.split('/')
      return ops[op].bind(null, a, b)
    } else {
      return ops[op].bind(null, arg)
    }
  })

  const positions = {}
  const BILLION = 1000000000

  for (let i = 0; i < BILLION; i++) {
    result = dance(result, instructionSet)

    if (positions[result.join('')]) {
      const numUniquePositions = i - 1
      const billionPosition = (BILLION - 1) % numUniquePositions
      for (const position in positions) {
        if (positions[position] === numUniquePositions) {
          console.log('After 1 dance, position:', position)
        }
        if (positions[position] === billionPosition) {
          console.log('After 1 billion dances, position:', position)
        }
      }
      return
    } else {
      positions[result.join('')] = i
    }
  }

  ////////////////
  function dance(arr, danceMoves) {
    return danceMoves.reduce((dance, step) => {
      dance = step(dance)
      return dance
    }, result)
  }

  function spin(num, arr) {
    return arr.slice(-num).concat(arr.slice(0, arr.length - num))
  }

  function exchange(charPosA, charPosB, arr) {
    const newArr = arr.slice()
    const temp = newArr[charPosA]
    newArr[charPosA] = newArr[charPosB]
    newArr[charPosB] = temp
    return newArr
  }

  function partner(charA, charB, arr) {
    const newArr = arr.slice()
    const charAIdx = newArr.indexOf(charA)
    const charBIdx = newArr.indexOf(charB)
    return exchange(charAIdx, charBIdx, newArr)
  }
})
