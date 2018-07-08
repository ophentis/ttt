const Game = require('../game.js')

describe('A Game', () => {

	describe('Constructor', ()=> {
		it('should accept no size on init', () => {
			const game = new Game()
			expect(game).toBeTruthy()
		})

		it('should accept table size >= 3', () => {
			const game1 = new Game(4)
			expect(game1).toBeTruthy()

			const game40 = new Game(40)
			expect(game40).toBeTruthy()
		})

		it('should have a table with size created', () => {
			const game4 = new Game(4)
			expect(game4.table.length).toBe(4)
			expect(game4.table[0].length).toBe(4)

			const game40 = new Game(40)
			expect(game40.table.length).toBe(40)
			expect(game40.table[0].length).toBe(40)
		})

		it('should have name for players', () => {
			const game = new Game()
			expect(game.playerX).toBeTruthy()
			expect(game.playerO).toBeTruthy()

			const game4 = new Game(4, 'A', 'B')
			expect(game4.playerX).toBe('A')
			expect(game4.playerO).toBe('B')
		})
	})

	describe('can', () => {
		// let game = null

		beforeEach(() => {
			this.game = new Game()
		})

		it('return a clone of table', () => {
			const table = this.game.clone()
			expect(table).toBeTruthy()
		})

		it('check a move is valid', () => {
			expect(this.game.checkMove(1)).toBe(true)
		})

		it('place a move', () => {
			expect(this.game.addMove(1, 'x')).toBe(true)
		})

		it('check a move is invalid', () => {
			this.game.addMove(1, 'x')
			expect(this.game.checkMove(1)).toBe(false)
		})

	})

})
