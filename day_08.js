const fs = require('fs')

fs.readFile('./input_08.txt', 'utf-8', (err, data) => {
  if (err) return err

  const registers = {}
  const OPS = { inc: '+', dec: '-' }
  let maxValue = 0

  data.split('\n').forEach(l => {
    const [reg1, op, amt1, _, reg2, bool, amt2] = l.split(' ')
    // Proxies for default value?
    if (registers[reg1] === undefined) {
      registers[reg1] = 0
    }
    if (registers[reg2] === undefined) {
      registers[reg2] = 0
    }
    const opString1 = `${OPS[op]} ${amt1}`
    const opString2 = `${registers[reg2]} ${bool} ${amt2}`

    if (eval(opString2)) {
      registers[reg1] += eval(opString1)
      maxValue = Math.max(maxValue, registers[reg1])
    }
  })
  console.log(
    'Highest value after instructions:',
    Math.max(...Object.values(registers))
  )
  console.log('Highest value during instructions:', maxValue)
})
