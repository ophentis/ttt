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
	})

	describe('function', () => {
		let game = null

		beforeAll(() => {
			game = new Game()
		})

		it('should return a clone of table', () => {
			const table = game.clone
			expect(table).toBeTruthy()
		})
	})

})
