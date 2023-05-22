export function getRandomResults(iterations: number) {
  let data = []
  for (let i = 0; i < iterations; i++) {
    data.push({
      id: i,
      result: Math.random() < 0.5 ? 'passed' : 'failed',
      runtime: Math.floor(Math.random() * 60)
    })
  }
  return data
}

export function getResults() {
    const rand = Math.floor(Math.random() * 21)
    return [
        {
            result: 'passed',
            number: 20 - rand,
        },
        {
            result: 'failed',
            number: rand,
        }
    ]
}