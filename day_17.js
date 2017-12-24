const fs = require('fs')

fs.readFile('./input_17.txt', 'utf-8', (err, data) => {
  if (err) throw err

  const steps = Number(data)
  const circularBuffer = [0]
  let pointer = 0
  /* for (let i = 1; i <= 2017; i++) {
   *   pointer = (pointer + steps) % circularBuffer.length + 1
   *   circularBuffer.splice(pointer, 0, i)
   * }
   * console.log(circularBuffer[pointer + 1])*/
  let firstIndex
  for (let i = 1; i <= 50000000; i++) {
    pointer = (pointer + steps) % circularBuffer.length + 1
    if (pointer === 1) {
      firstIndex = i
    }
    circularBuffer.push(null)
  }
  console.log('Final number inserted after 0 is', firstIndex)
})
