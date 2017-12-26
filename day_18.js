const fs = require('fs')

fs.readFile('./input_18.txt', 'utf-8', (err, data) => {
  if (err) throw err

  const ops = {
    run: true,
    step: function() {
      if (
        this.pointer < 0 ||
        this.pointer >= this.instructions.length
      ) {
        this.run = false
        return
      }
      this.instructions[this.pointer]()
      this.pointer++
    },
    set: function(reg, value) {
      this[reg] = this.retrieveValue(value)
    },
    add: function(reg, value) {
      this[reg] += this.retrieveValue(value)
    },
    mul: function(reg, value) {
      this[reg] *= this.retrieveValue(value)
    },
    rcv: function(reg) {
      if (this.queue.length === 0) {
        this.run = false
        this.pointer--
        return
      }
      this[reg] = this.queue.shift()
    },
    jgz: function(val1, val2) {
      if (this.retrieveValue(val1) > 0) {
        const adjustment = this.retrieveValue(val2)
        this.pointer += adjustment - 1
      }
    },
    mod: function(reg, value) {
      this[reg] %= this.retrieveValue(value)
    },
    retrieveValue: function(val) {
      if (isNaN(val)) {
        if (this[val] === undefined) {
          this[val] = 0
        }
        return this[val]
      } else {
        return Number(val)
      }
    }
  }

  const reg0 = Object.assign(
    {
      p: 0,
      pointer: 0,
      queue: [],
      instructions: [],
      snd: function(val) {
        reg1.queue.push(this.retrieveValue(val))
        reg1.run = true
      }
    },
    ops
  )

  const reg1 = Object.assign(
    {
      p: 1,
      queue: [],
      pointer: 0,
      instructions: [],
      snd: function(val) {
        reg0.queue.push(this.retrieveValue(val))
        reg0.run = true
        this.sendCount++
      },
      sendCount: 0
    },
    ops
  )

  const input = data.split('\n').forEach(l => {
    let [op, arg1, arg2] = l.split(' ')
    reg0.instructions.push(reg0[op].bind(reg0, arg1, arg2))
    reg1.instructions.push(reg1[op].bind(reg1, arg1, arg2))
  })

  while (reg0.run || reg1.run) {
    while (reg1.run) {
      reg1.step()
    }
    while (reg0.run) {
      reg0.step()
    }
  }
  console.log(
    'Yo how many times did program 1 send messages, dawg?',
    reg1.sendCount
  )
})
