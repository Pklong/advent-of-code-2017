const fs = require('fs')

// PART 1:
// always garbage or group state
// group state started by {
// group state paused by <
// group state ended by }
// garbage state started by <
// garbage state ended by >
// everything above negated by a preceeding !
// tally every group state ended by length of active groups
// PART 2:
// tally non-cancelled steps in garbage state

fs.readFile('./input_09.txt', 'utf-8', (err, data) => {
  if (err) return err

  const streamLength = data.length
  const stack = []

  let score = 0
  let garbageCount = 0
  let groupState = true

  for (let i = 0; i < streamLength; i++) {
    const char = data[i]

    if (char === '!') {
      i += 1
    } else if (groupState) {
      if (char === '{') {
        stack.push(char)
      } else if (char === '}') {
        score += stack.length
        stack.pop()
      } else if (char === '<') {
        groupState = !groupState
      }
    } else {
      if (char === '>') {
        groupState = !groupState
      } else {
        garbageCount++
      }
    }
  }
  console.log('Total score of all groups:', score)
  console.log('Total garbageCount of all groups:', garbageCount)
})
