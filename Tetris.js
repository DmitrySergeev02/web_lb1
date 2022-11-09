
export default class Tetris{

    constructor(rowCount,columnCount) {
        this.rowCount = rowCount;
        this.columnCount = columnCount;

        this.currentTetramino = this.createNewTetramino();
        this.field = this.createField()
    }

    createField(){
        let field = new Array(this.rowCount)
        for (let row = 0; row<this.rowCount;row++){
            field[row] = new Array(this.columnCount);
            for (let column=0;column<this.columnCount;column++){
                field[row][column]=0;
            }
        }
        return field;
    }

    moveLeft(){
        if (this.isMovementCorrect({
            view : this.currentTetramino.view,
            row : this.currentTetramino.row,
            column : this.currentTetramino.column-1
        })){
            this.currentTetramino.column-=1
            this.checkEnd();
        }
    }

    moveRight(){
        if (this.isMovementCorrect({
            view : this.currentTetramino.view,
            row : this.currentTetramino.row,
            column : this.currentTetramino.column+1
        })){
            this.currentTetramino.column+=1
            this.checkEnd();
        }
    }

    moveDown(){
        if (this.isMovementCorrect({
            view : this.currentTetramino.view,
            row : this.currentTetramino.row+1,
            column : this.currentTetramino.column
        })){
            this.currentTetramino.row+=1;
            this.checkEnd();
        }
    }

    moveFastDown(){
        this.isMovingDown = true;
        while (this.isMovingDown){
            this.moveDown();
        }
    }

    rotateTetramino(){
        const length = this.currentTetramino.view.length;
        const currentTetramino = this.currentTetramino.view;
        let tmp = [];
        for (let row=0;row<length;row++){
            tmp[row] = [];
            for (let column=0;column<length;column++){
                tmp[row][column]=0;
            }
        }
        for (let row = 0;row<length;row++){
            for (let column = 0;column<length;column++){
                tmp[column][row] = currentTetramino[length-1-row][column];
            }
        }
        if (this.isMovementCorrect({
            view : tmp,
            row : this.currentTetramino.row,
            column : this.currentTetramino.column
        }))
            this.currentTetramino.view = tmp;
    }

    isMovementCorrect(newState) {
        for (let row = 0;row<newState.view.length;row++){
            for (let column=0;column<newState.view[row].length;column++){
                if (newState.view[row][column]>0 && (this.field[newState.row+row]===undefined || this.field[newState.row+row][newState.column+column]===undefined)){
                    return 0;
                }
            }
        }
        return 1;
    }

    checkEnd(){
        loop:
        for (let row=0;row<this.currentTetramino.view.length;row++){
            for (let column=0;column<this.currentTetramino.view[row].length;column++){
                if (this.currentTetramino.view[row][column]>0 && (this.currentTetramino.row+row===this.rowCount-1 || this.field[this.currentTetramino.row+row+1][this.currentTetramino.column+column]>0)){
                    this.lockTetramino();
                    break loop;
                }
            }
        }
    }

    lockTetramino(){
        for (let row = 0;row<this.currentTetramino.view.length;row++){
            for (let column = 0; column<this.currentTetramino.view.length;column++){
                if (this.currentTetramino.view[row][column]>0) {
                    this.field[this.currentTetramino.row + row][this.currentTetramino.column + column] = this.currentTetramino.view[row][column];
                }
            }
        }
        this.isMovingDown = false;
        this.checkLines();
        this.currentTetramino = this.createNewTetramino();
    }

    checkLines(){
        for (let row = 0;row<this.rowCount;row++){
            let product = 1;
            for (let column=0;column<this.columnCount;column++){
                product = product*this.field[row][column];
                if (product===0){
                    break;
                }
            }
            if (product>0){
                for (let i=row;i>0;i--){
                    this.field[i] = this.field[i-1];
                }
            }
        }
    }

    getFieldState(){
        let state = this.createField();
        for (let row = 0; row<this.rowCount;row++){
            for (let column = 0;column<this.columnCount;column++){
                state[row][column] = this.field[row][column];
            }
        }
        for (let row = 0;row<this.currentTetramino.view.length;row++){
            for (let column = 0;column<this.currentTetramino.view[row].length;column++){
                if (this.currentTetramino.view[row][column]>0) {
                    state[this.currentTetramino.row + row][this.currentTetramino.column + column] = this.currentTetramino.view[row][column];
                }
            }
        }
        return state;
    }

    createNewTetramino() {
        let tetraminoPool = [
            [
                [0,0,0],
                [1,1,1],
                [0,1,0]
            ],
            [
                [0,2,0],
                [0,2,0],
                [0,2,2]
            ],
            [
                [0,3,0],
                [0,3,0],
                [3,3,0]
            ],
            [
                [0,0,0],
                [4,4,0],
                [0,4,4]
            ],
            [
                [0,0,0],
                [0,5,5],
                [5,5,0]
            ],
            [
                [0,0,0,0],
                [0,6,6,0],
                [0,6,6,0],
                [0,0,0,0]
            ],
            [
                [0,0,0,0],
                [7,7,7,7],
                [0,0,0,0],
                [0,0,0,0]
            ],
        ];
        this.currentIndex = Math.floor(Math.random()*tetraminoPool.length)%tetraminoPool.length;
        let view = tetraminoPool[this.currentIndex];
        let row =0;
        let column = Math.floor((this.columnCount-view.length)/2);
        return {
            view : view,
            row : row,
            column : column
        }
    }
}