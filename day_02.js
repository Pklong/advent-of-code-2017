const fs = require('fs')

fs.readFile('./input_02.txt', 'utf-8', (err, data) => {
  if (err) return err

  const checkSum = data
    .split('\n')
    .map(row => row.split('\t').map(Number))
    .map(numArray => Math.max(...numArray) - Math.min(...numArray))
    .reduce((acc, sum) => acc + sum, 0)
  console.log(checkSum)

  const divSum = data
    .split('\n')
    .map(row => row.split('\t').map(Number))
    .map(numArray => {
      // YOLO
      for (let i = 0; i < numArray.length; i++) {
        for (let j = i + 1; j < numArray.length; j++) {
          const num1 = numArray[i]
          const num2 = numArray[j]
          if (num1 % num2 === 0) {
            return num1 / num2
          } else if (num2 % num1 === 0) {
            return num2 / num1
          }
        }
      }
    })
    .reduce((acc, sum) => acc + sum, 0)
  console.log(divSum)
})
