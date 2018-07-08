const debug = require('debug')('Game')

class Game {

	/**
	 * @constructor
	 * @param {number} size - Size of the board, 3 or larger
	 * @param {string} playerX - Name for player X
	 * @param {string} playerO - Name for player O
	 */
	constructor(size = 3, playerX = 'x', playerO = 'o') {
		if (size < 0)
			throw Error('invalide table size')

		this.playerX = playerX || 'Xeno'
		this.playerO = playerO || 'Onex'

		// create n x n array
		const outer = new Array(size)
		for (let i=0, n=1; i<size; i++) {
			outer[i] = new Array(size)
			for(let j=0; j<size; j++) {
				outer[i][j] = n++
			}
		}
		this.table = outer
	}

	get size() {
		return this.table.length
	}

	/**
	 * check if a posistion is acceptable for a move
	 * @param {number} pos - Position of table start from 0
	 * @return {boolean} - can place a move
	 */
	checkMove(pos) {
		if(pos < 0 || pos >= this.size*this.size)
			return false

		const move = getTableMove(this.table, pos)
		return !Game.isPlayerMove(move)
	}

	/**
	 * place a move on position
	 * @param {number} pos - Position of the move
	 * @param {string} move - enum('o','x')
	 * @return {boolean} - success
	 */
	addMove(pos, move) {
		if( !Game.isPlayerMove(move) )
			throw new Error('unexpected player')

		if( !this.checkMove(pos) )
			return false

		setTableMove(this.table, pos, move)

		return true
	}

	/**
	 * check winning on this move
	 * @param {number} pos - Position of move
	 * @return {boolean} - wins
	 */
	isWin(pos) {

		const playerMove = getTableMove(this.table, pos)

		if( !Game.isPlayerMove(playerMove) )
			return false

		const size = this.size
		// offset of each positions to check
		// each set ordered by smallest offset number
		let checkList = [
			// column rules
			[0, size, 2*size],
			[-size, 0, size],
			[-size*2, -size, 0],
		]

		const col = pos%size
		const row = row => row/size|0

		// left to right diagonal rules
		if(col+2 < size) 							checkList.push([0, size+1, 2*(size+1)])
		if(col > 0 && col+1 < size) 	checkList.push([-(size+1), 0, size+1])
		if(col > 1) 									checkList.push([-(size+1)*2, -(size+1), 0])

		// right to left diagonal rules
		if(col > 1) 									checkList.push([0, size-1, 2*(size-1)])
		if(col > 0 && col+1 < size) 	checkList.push([-(size-1), 0, size-1])
		if(col+2 < size) 							checkList.push([-(size-1)*2, -(size-1), 0])

		// check same row for row rules
		if(row(pos) == row(pos+2)) 		checkList.push([0, 1, 2])
		if(row(pos-1) == row(pos+1)) 	checkList.push([-1, 0, 1])
		if(row(pos-2) == row(pos)) 		checkList.push([-2, -1, 0])

		const insideTable = (rule) => {
			return pos+rule[0] >= 0 && pos+rule[2] < this.size * this.size
		}

		const toTableMove = (offset) => {
			return getTableMove(this.table, pos+offset)
		}

		const isPlayerMove = (move) => {
			return move == playerMove
		}

		let rules = checkList.filter(insideTable)
		debug(rules)

		// turn all offset to moves
		let moves = rules.map(rule => rule.map(toTableMove))
		debug(moves)

		// any of set are from this player
		return moves.some(moves => moves.every(isPlayerMove))
	}

	/**
	 * check if a move is either for player x or o
	 * @param {string} move - enum('o','x')
	 * @return {boolean} - valid move
	 */
	static isPlayerMove(move) {
		return move === 'x' || move === 'o'
	}
}

// @private
function getTableMove(table, position) {
	const size = table.length
	return table[position/size|0][position%size]
}

// @private
function setTableMove(table, position, value) {
	const size = table.length
	table[position/size|0][position%size] = value
}

module.exports = Game
