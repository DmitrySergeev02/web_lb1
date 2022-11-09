import Tetris from './Tetris.js';
import View from './View.js';

const game = new Tetris(20,10);
const view = new View(20,10);

window.game = game;
window.view = view;

document.addEventListener('keydown', event =>{
    switch (event.key){
        case 'ArrowDown':
            game.moveDown();
            break;
        case 'ArrowLeft':
            game.moveLeft();
            break;
        case 'ArrowRight':
            game.moveRight();
            break;
        case ' ':
            game.rotateTetramino();
            break;
    }
    view.drawField(game.getFieldState());
})

view.drawField(game.getFieldState());
