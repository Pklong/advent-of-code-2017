const fs = require('fs')

fs.readFile('./input_05.txt', 'utf-8', (err, data) => {
  if (err) return err

  const numArray = data.split('\n').map(Number)
  let pointer = 0
  let steps = 0
  while (numArray[pointer] !== undefined) {
    //pointer += numArray[pointer]++

    const value = numArray[pointer]
    const old = pointer
    pointer += value
    if (value >= 3) {
      numArray[old] -= 1
    } else {
      numArray[old] += 1
    }
    steps += 1
  }
  console.log(steps)
})
