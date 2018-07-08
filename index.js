const util = require('util')
const readlineSync = require('readline-sync')
const Game = require('./game.js')

let state = 'BEGIN'

let size = 3
let playerX = null
let playerO = null
let game = null
let position = null
let moveCount = 0

readlineSync.setDefaultOptions({prompt: '>> '})

while(true) {

	switch(state) {
		case 'BEGIN':
			state = 'SIZE'
			break

		case 'SIZE':
			size = readlineSync.question('Size of game? (size>=3):\n>> ')|0
			if( size < 3 ) break

			if(size > 15) {
				let yes = readlineSync.keyInYN(`Size $size need a very big screen to play, are you sure?\n>> `)
				if (!yes) break
			}

			state = 'PLAYER1'

		case 'PLAYER1':

			playerX = readlineSync.question('Enter name for Player 1:\n>> ')
			if( !playerX.length ) break

			console.log()

			state = 'PLAYER2'
			break

		case 'PLAYER2':

			playerO = readlineSync.question('Enter name for Player 2:\n>> ')
			if( !playerO.length ) break
			if( playerO == playerX ) {
				console.log('try a different name different than Player 1.')
				break
			}

			console.log()

			state = 'PLAY'
			break

		case 'PLAY':
			game = new Game(size, playerX, playerO)
			state = 'PLAY1'
			break

		case 'PLAY1':

			displayGameTable(game.table)

			position = readlineSync.question(`${game.playerX}, choose a box to place an 'x' into:\n>> `)
			position = (position|0) - 1
			if( !game.checkMove(position) ) {
				console.log('Bad move')
				break
			}

			console.log()

			game.addMove(position, 'x')
			if( game.isWin(position) ) {
				state = 'PLAYER1WIN'
				break
			}

			if( ++moveCount >= game.size*game.size ) {
				state = 'DRAW'
				break
			}

			state = 'PLAY2'
			break

		case 'PLAY2':

			displayGameTable(game.table)

			position = readlineSync.question(`${game.playerO}, choose a box to place an 'o' into:\n>> `)
			position = (position|0) - 1
			if( !game.checkMove(position) ) {
				console.log('Bad move')
				break
			}

			console.log()

			game.addMove(position, 'o')
			if( game.isWin(position) ) {
				state = 'PLAYER2WIN'
				break
			}

			if( ++moveCount >= game.size*game.size ) {
				state = 'DRAW'
				break
			}

			state = 'PLAY1'
			break

		case 'PLAYER1WIN':
			displayGameTable(game.table)
			console.log(`Congratulations ${game.playerX}! You have won.`)
			state = 'EXIT'
			break

		case 'PLAYER2WIN':
			displayGameTable(game.table)
			console.log(`Congratulations ${game.playerO}! You have won.`)
			state = 'EXIT'
			break

		case 'DRAW':
			displayGameTable(game.table)
			console.log(`Draw, Good Game!`)
			state = 'EXIT'
			break


		case 'EXIT':
			return
	}
}

function displayGameTable(table) {
	const size = table.length
	const area = size * size
	const digits = area.toString().split('').length

	const template = new Array(size).fill(` %s `).join('|')
	const rowDivider = '\n' + new Array((2+digits+1)*size-1).fill('-').join('') + '\n'

	const pad = v => ('     '+v).slice(-digits)

	const text = table
		.map(row => row.map(pad))
		.map(row => util.format.apply(util, [template].concat(row)))
		.join(rowDivider)

	console.log(text)
	console.log()
}
