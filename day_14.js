const fs = require('fs')
const knotHash = require('./day_10.js')

fs.readFile('./input_14.txt', 'utf-8', (err, data) => {
  if (err) throw err
  let input = new Array(128).fill().map((_, i) => `${data}-${i}`)

  const result = input.map(input => knotHash(input)).map(hexString =>
    hexString
      .split('')
      .map(hexChar => {
        let binary = parseInt(hexChar, 16).toString(2)
        return padToFour(binary)
      })
      .join('')
  )

  const usedCount = result
    .map(
      binaryString =>
        binaryString.split('').filter(c => c === '1').length
    )
    .reduce((acc, count) => acc + count, 0)

  const islandMatrix = result.map(row => row.split(''))
  let regionCount = 0

  const DELTAS = [[1, 0], [-1, 0], [0, 1], [0, -1]]

  for (let y = 0; y < islandMatrix.length; y++) {
    for (let x = 0; x < islandMatrix[0].length; x++) {
      if (islandMatrix[x][y] === '1') {
        regionCount++
        dfs(x, y)
      }
    }
  }

  console.log("Total sections in 'use'", usedCount)
  console.log("Total regions in 'use'", regionCount)

  /////////////////////////////
  function dfs(x, y) {
    islandMatrix[x][y] = 'visited'
    const moveset = DELTAS.map(pos => [pos[0] + x, pos[1] + y])
    moveset.filter(pos => isValid(...pos)).forEach(p => {
      dfs(...p)
    })
  }

  function isValid(x, y) {
    if (x < 0 || y < 0) {
      return false
    }
    if (x >= 128 || y >= 128) {
      return false
    }
    if (islandMatrix[x][y] === 'visited') {
      return false
    }
    return islandMatrix[x][y] === '1'
  }

  function padToFour(string) {
    const zeroCount = 4 - string.length
    let formattedString = string
    for (let i = 0; i < zeroCount; i++) {
      formattedString = `0${formattedString}`
    }
    return formattedString
  }
})
