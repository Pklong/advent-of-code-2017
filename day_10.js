const fs = require('fs')

fs.readFile('./input_10.txt', 'utf-8', (err, data) => {
  if (err) throw err

  let skipSize = 0
  let pointer = 0
  let circle = new Array(256).fill(undefined).map((e, i) => i)

  const input = data
    /* .split(',')
   * .map(Number)*/
    .split('')
    .map(e => e.charCodeAt())
    .concat([17, 31, 73, 47, 23])

  for (let i = 0; i < 64; i++) {
    input.forEach(el => {
      let subArray = circle.slice(pointer, pointer + el)
      const wrap = Math.abs(subArray.length - el)
      if (wrap > 0) {
        subArray = subArray.concat(circle.slice(0, wrap))
      }

      subArray = subArray.reverse()

      if (wrap > 0) {
        circle = subArray
          .slice(subArray.length - wrap)
          .concat(circle.slice(wrap, pointer))
          .concat(subArray.slice(0, subArray.length - wrap))
      } else {
        circle = circle
          .slice(0, pointer)
          .concat(subArray)
          .concat(circle.slice(pointer + el))
      }

      pointer = (el + skipSize + pointer) % 256
      skipSize++
    })
  }
  const denseHash = new Array(16).fill(undefined)
  const hexString = denseHash
    .map((e, i) => {
      const segLocationStart = i * 16
      const segLocationEnd = (i + 1) * 16
      let denseHashNum = circle[segLocationStart]

      for (let j = segLocationStart + 1; j < segLocationEnd; j++) {
        denseHashNum = denseHashNum ^ circle[j]
      }
      return denseHashNum
    })
    .reduce((acc, el) => {
      const hex = el.toString(16)
      return hex.length === 1 ? `${acc}0${hex}` : `${acc}${hex}`
    }, '')
  console.log(hexString)
})
