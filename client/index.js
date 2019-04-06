import { WINDOW_WIDTH, WINDOW_HEIGHT } from './config'
import Game from './state/game'

class App extends Phaser.Game {
    constructor () {
        super(WINDOW_WIDTH, WINDOW_HEIGHT, Phaser.AUTO)
        this.state.add('game', game)
        this.state.start('game')
    }
}

const SimpleGame = new App()
