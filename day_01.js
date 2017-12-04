const fs = require('fs')

fs.readFile('./input_01.txt', 'utf-8', (err, data) => {
  if (err) return err

  let tally = 0

  for (let i = 0; i < data.length; i++) {
    const circular = (data.length / 2 + i) % data.length
    // if (data[i] === data[i + 1])
    if (data[i] === data[circular]) {
      tally += +data[i]
    }
  }

  /* console.log(
   *   data[0] === data[data.length - 1] ? tally + +data[0] : tally
   * )*/

  console.log(tally)
})
