const fs = require('fs')

fs.readFile('./input_12.txt', 'utf-8', (err, data) => {
  if (err) throw err
  const graph = {}

  data.split('\n').forEach(l => {
    const [pipe, _, ...connectedPipes] = l.split(' ')
    graph[pipe] = connectedPipes.map(p => p.replace(',', ''))
  })

  let islandCount = 0

  for (p in graph) {
    if (!graph[p]) continue
    islandCount++
    const pipes = new Set(graph[p])
    graph[p] = null
    //let connectedCount = 1

    while (!pipes.values().next().done) {
      const pipe = pipes.values().next().value
      //connectedCount++
      const connectedPipes = graph[pipe] || []
      connectedPipes.filter(p => graph[p]).forEach(p => pipes.add(p))
      graph[pipe] = null
      pipes.delete(pipe)
    }
  }

  //console.log('pipe 0 has a group of: ', connectedCount)
  console.log('islands in pipeland:', islandCount)
})
