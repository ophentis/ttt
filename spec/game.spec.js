const Game = require('../game.js')

describe('A Game', () => {

    it('should init', () => {
        const game = new Game()
        expect(game).toBeTruthy()
    })

})
