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

	clone() {
		return JSON.parse(JSON.stringify(this.table))
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

function getTableMove(table, position) {
	const size = table.length
	return table[position/size|0][position%size]
}

function setTableMove(table, position, value) {
	const size = table.length
	table[position/size|0][position%size] = value
}

module.exports = Game
