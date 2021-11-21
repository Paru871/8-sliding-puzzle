#!/usr/bin/env node
const { Select } = require('enquirer')
const Space = ' '
const MapData = {
  '00': ['01', '10'],
  '01': ['00', '02', '11'],
  '02': ['01', '12'],
  // eslint-disable-next-line quote-props
  '10': ['00', '11', '20'],
  // eslint-disable-next-line quote-props
  '11': ['01', '10', '12', '21'],
  // eslint-disable-next-line quote-props
  '12': ['02', '11', '22'],
  // eslint-disable-next-line quote-props
  '20': ['10', '21'],
  // eslint-disable-next-line quote-props
  '21': ['20', '11', '22'],
  // eslint-disable-next-line quote-props
  '22': ['12', '21']
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
        movePuzzlePiece(array, choseNumberPoint, spacePoint)
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
  const array2 = splitByNumber(array, 3)
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

// 動かせる候補数字の配列を作成
function makeCandidate (array, spacePoint) {
  const searchNumberArray = MapData[spacePoint]
  const candidate = {}
  searchNumberArray.forEach((point, i) => {
    candidate[array[point[0]][point[1]]] = point
  })
  return candidate
}

// 配列を指定個数ずつに分割
function splitByNumber (array, number) {
  const length = Math.ceil(array.length / number)
  return new Array(length).fill().map((_, i) =>
    array.slice(i * number, (i + 1) * number)
  )
}

// タイルの入れ替え
function movePuzzlePiece (array, choseNumberPoint, spacePoint) {
  array[spacePoint[0]][spacePoint[1]] = array[choseNumberPoint[0]][choseNumberPoint[1]]
  array[choseNumberPoint[0]][choseNumberPoint[1]] = Space
  return array
}

main()
