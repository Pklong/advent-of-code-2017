const fs = require('fs')

fs.readFile('./input_06.txt', 'utf-8', (err, data) => {
  if (err) return err
  const numArray = data.split('\t').map(Number)

  function getMaxIdx(arr) {
    return arr.indexOf(Math.max(...arr))
  }

  const arrLength = numArray.length
  const configurations = {}
  let steps = 0
  while (true) {
    let maxIdx = getMaxIdx(numArray)
    const allocation = numArray[maxIdx]
    numArray[maxIdx] = 0

    for (let i = 0; i < allocation; i++) {
      maxIdx++
      numArray[maxIdx % arrLength]++
    }

    steps++
    if (configurations[JSON.stringify(numArray)]) {
      //console.log(steps)
      console.log(steps - configurations[JSON.stringify(numArray)])
      break
    }
    configurations[JSON.stringify(numArray)] = steps
  }
})
