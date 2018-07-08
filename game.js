class Game {

	constructor(size = 3) {
		if (size < 0) throw Error('invalide table size')

		const outer = new Array(size)
		for (let i=0; i<size; i++) {
			outer[i] = new Array(size)
		}

		this.table = outer
	}

	clone() {
		JSON.parse(JSON.stringify(this.table))
	}
}

module.exports = Game
