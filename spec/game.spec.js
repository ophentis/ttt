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

		it('check a move is valid', () => {
			expect(this.game.checkMove(1)).toBe(true)
		})

		it('can place move on all position', () => {
			expect(this.game.addMove(0, 'x')).toBe(true)
			expect(this.game.addMove(1, 'o')).toBe(true)
			expect(this.game.addMove(2, 'x')).toBe(true)
			expect(this.game.addMove(3, 'o')).toBe(true)
			expect(this.game.addMove(4, 'x')).toBe(true)
			expect(this.game.addMove(5, 'o')).toBe(true)
			expect(this.game.addMove(6, 'x')).toBe(true)
			expect(this.game.addMove(7, 'o')).toBe(true)
			expect(this.game.addMove(8, 'x')).toBe(true)
		})

		it('check a move is invalid', () => {
			this.game.addMove(1, 'x')
			expect(this.game.checkMove(1)).toBe(false)
		})

	})

	describe('for size above 3', () => {
		it('can place move on all position with size 4', () => {
			const size = 4
			this.game = new Game(size)
			for(let i=0; i<size*size; i++) {
				expect(this.game.addMove(i, 'x')).toBe(true)
			}
		})

		it('can place move on all position with size 10', () => {
			const size = 10
			this.game = new Game(size)
			for(let i=0; i<size*size; i++) {
				expect(this.game.addMove(i, 'x')).toBe(true)
			}
		})
	})

	describe('can', () => {

		beforeEach(() => {
			this.game = new Game()
		})

		it('determine winner on first row', () => {
			this.game.addMove(0, 'x')
			this.game.addMove(1, 'x')
			this.game.addMove(2, 'x')
			expect(this.game.isWin(2)).toBe(true)
			expect(this.game.isWin(1)).toBe(true)
			expect(this.game.isWin(0)).toBe(true)
		})

		it('determine winner on second row', () => {
			this.game.addMove(3, 'x')
			this.game.addMove(4, 'x')
			this.game.addMove(5, 'x')
			expect(this.game.isWin(3)).toBe(true)
			expect(this.game.isWin(4)).toBe(true)
			expect(this.game.isWin(5)).toBe(true)
		})

		it('determine winner on third row', () => {
			this.game.addMove(6, 'x')
			this.game.addMove(7, 'x')
			this.game.addMove(8, 'x')
			expect(this.game.isWin(6)).toBe(true)
			expect(this.game.isWin(7)).toBe(true)
			expect(this.game.isWin(8)).toBe(true)
		})

		it('determine winner on first column', () => {
			this.game.addMove(0, 'x')
			this.game.addMove(3, 'x')
			this.game.addMove(6, 'x')
			expect(this.game.isWin(0)).toBe(true)
			expect(this.game.isWin(3)).toBe(true)
			expect(this.game.isWin(6)).toBe(true)
		})

		it('determine winner on second column', () => {
			this.game.addMove(1, 'x')
			this.game.addMove(4, 'x')
			this.game.addMove(7, 'x')
			expect(this.game.isWin(1)).toBe(true)
			expect(this.game.isWin(4)).toBe(true)
			expect(this.game.isWin(7)).toBe(true)
		})

		it('determine winner on third column', () => {
			this.game.addMove(2, 'x')
			this.game.addMove(5, 'x')
			this.game.addMove(8, 'x')
			expect(this.game.isWin(2)).toBe(true)
			expect(this.game.isWin(5)).toBe(true)
			expect(this.game.isWin(8)).toBe(true)
		})

		it('determine winner on left to right diagnal', () => {
			this.game.addMove(0, 'x')
			this.game.addMove(4, 'x')
			this.game.addMove(8, 'x')
			expect(this.game.isWin(0)).toBe(true)
			expect(this.game.isWin(4)).toBe(true)
			expect(this.game.isWin(8)).toBe(true)
		})

		it('determine winner on right to left diagnal', () => {
			this.game.addMove(2, 'x')
			this.game.addMove(4, 'x')
			this.game.addMove(6, 'x')
			expect(this.game.isWin(2)).toBe(true)
			expect(this.game.isWin(4)).toBe(true)
			expect(this.game.isWin(6)).toBe(true)
		})

		it('determine no win on corner', () => {
			this.game.addMove(0, 'x')
			this.game.addMove(2, 'x')
			this.game.addMove(6, 'x')
			this.game.addMove(8, 'x')
			expect(this.game.isWin(0)).toBe(false)
			expect(this.game.isWin(2)).toBe(false)
			expect(this.game.isWin(6)).toBe(false)
			expect(this.game.isWin(8)).toBe(false)
		})

		it('determine no win on side', () => {
			this.game.addMove(1, 'x')
			this.game.addMove(3, 'x')
			this.game.addMove(5, 'x')
			this.game.addMove(7, 'x')
			expect(this.game.isWin(1)).toBe(false)
			expect(this.game.isWin(3)).toBe(false)
			expect(this.game.isWin(5)).toBe(false)
			expect(this.game.isWin(7)).toBe(false)
		})

		it('determine no win on middle', () => {
			this.game.addMove(4, 'x')
			expect(this.game.isWin(4)).toBe(false)
		})

	})

})
