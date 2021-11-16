#!/usr/bin/env node
const { Select } = require('enquirer')
const Space = ' '
const MapData = {
  '00': ['01', '10'],
  '01': ['00', '02', '11'],
  '02': ['01', '12'],
  10: ['00', '11', '20'],
  11: ['01', '10', '12', '21'],
  12: ['02', '11', '22'],
  20: ['10', '21'],
  21: ['20', '11', '22'],
  22: ['12', '21']
}

async function main () {
  console.clear()
  const array = makeFirstArray()
  displayBoard(array)
  let spacePoint = '22'
  for (let i = 1; i <= 50; i++) {
    const candidate = makeCandidate(array, spacePoint)
    const candidateArray = Object.keys(candidate).sort()
    const prompt = new Select({
      name: 'choseNumber',
      message: `[Select a number you want to move:] ${i}/50`,
      choices: candidateArray
    })
    await prompt.run()
      .then(choseNumber => {
        const choseNumberPoint = candidate[choseNumber]
        array[spacePoint[0]][spacePoint[1]] = array[choseNumberPoint[0]][choseNumberPoint[1]]
        array[choseNumberPoint[0]][choseNumberPoint[1]] = Space
        spacePoint = choseNumberPoint
        require('readline').cursorTo(process.stdout, 0, 0)
        displayBoard(array)
      }).catch(console.error)
    if (array.toString() === [[1, 2, 3], [4, 5, 6], [7, 8, ' ']].toString()) {
      console.log('\n')
      console.log(`GREAT! You cleared in ${i} moves!`)
      return
    }
  }
  console.log('\n')
  console.log('GAME OVER... Hang in there!')
}

function makeFirstArray () {
  const array = [1, 2, 3, 4, 5, 6, 7, 8]
  for (let i = 0; i < 10; i++) {
    const indexForShuffle = [0, 1, 2, 3, 4, 5, 6, 7]
    const indexArr = []
    let rand
    for (let i = 0, len = indexForShuffle.length; i < 2; i++, len--) {
      rand = Math.floor(Math.random() * len)
      indexArr.push(indexForShuffle.splice(rand, 1)[0])
    }
    [array[indexArr[0]], array[indexArr[1]]] = [array[indexArr[1]], array[indexArr[0]]]
  }
  const split = (array, n) => array.reduce((a, c, i) => i % n === 0 ? [...a, [c]] : [...a.slice(0, -1), [...a[a.length - 1], c]], [])
  const array2 = split(array, 3)
  array2[2].push(Space)
  return array2
}

function displayBoard (array) {
  console.log('Let\'s complete this puzzle within 50 moves.' + '\n')
  console.log('  ---+---+---')
  array.forEach(line => {
    const lineSet = line.join('   ')
    console.log(`   ${lineSet}`)
    console.log('  ---+---+---')
  })
  console.log('\n')
}

function makeCandidate (array, spacePoint) {
  const searchNumberArray = MapData[spacePoint]
  const candidate = {}
  searchNumberArray.forEach((point, i) => {
    candidate[array[point[0]][point[1]]] = point
  })
  return candidate
}

main()
