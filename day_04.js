const fs = require('fs')

function makeLetterCountArray(word) {
  const alpha = new Array(26).fill(0)
  word.split('').forEach(l => alpha[l.charCodeAt() - 97]++)
  return alpha
}

fs.readFile('./input_04.txt', 'utf-8', (err, data) => {
  if (err) return err
  const result = data
    .split('\n')
    .map(l => {
      const words = l.split(' ')
      const letterCounts = words.map(w => makeLetterCountArray(w))
      const uniqueCounts = new Set(
        letterCounts.map(count => JSON.stringify(count))
      )
      return Array.from(uniqueCounts).length === letterCounts.length
        ? 1
        : 0

      //const uniqueWords = new Set(words)
      //return Array.from(uniqueWords).length === words.length ? 1 : 0
    })
    .reduce((acc, el) => acc + el, 0)
  // remove 1 due to EOF newline, smh
  console.log(result - 1)
})
