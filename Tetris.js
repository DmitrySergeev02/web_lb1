
export default class Tetris{

    constructor(rowCount,columnCount) {
        this.rowCount = rowCount;
        this.columnCount = columnCount;


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
        if (this.isMovementCorrect(0,-1)){
            this.currentTetramino.column-=1
            this.checkEnd();
        }
    }

    moveRight(){
        if (this.isMovementCorrect(0,1)){
            this.currentTetramino.column+=1
            this.checkEnd();
        }
    }

    moveDown(){
        if (this.isMovementCorrect(1,0)){
            this.currentTetramino.row+=1;
            this.checkEnd();
        }
    }

    rotateTetramino(){
        const length = this.currentTetramino.view.length;
        const currentTetramino = this.currentTetramino.view;
        let tmp = [
            [0,0,0],
            [0,0,0],
            [0,0,0]
        ]
        for (let row = 0;row<length;row++){
            for (let column = 0;column<length;column++){
                tmp[column][row] = currentTetramino[length-1-row][column];
            }
        }
        if (this.isMovementCorrect(0,0))
            this.currentTetramino.view = tmp;
    }

    isMovementCorrect(deltaRow,deltaColumn) {
        let currentRow = this.currentTetramino.row+deltaRow;
        let currentColumn = this.currentTetramino.column+deltaColumn;
        for (let row = 0;row<this.currentTetramino.view.length;row++){
            for (let column=0;column<this.currentTetramino.view[row].length;column++){
                if (this.currentTetramino.view[row][column] && (this.field[currentRow+row]===undefined || this.field[currentRow+row][currentColumn+column]===undefined)){
                    return 0;
                }
            }
        }
        return 1;
    }

    currentTetramino = {
        view : [
            [0,1,0],
            [0,1,1],
            [0,1,0]
        ],
        row : 0,
        column : 0
    }

    checkEnd(){
        for (let row=0;row<this.currentTetramino.view.length;row++){
            for (let column=0;column<this.currentTetramino.view[row].length;column++){
                if (this.currentTetramino.view[row][column] && (this.currentTetramino.row+row===this.rowCount-1 || this.field[this.currentTetramino.row+row+1][this.currentTetramino.column+column]))
                    this.lockTetramino();
            }
        }
    }

    lockTetramino(){
        for (let row = 0;row<this.currentTetramino.view.length;row++){
            for (let column = 0; column<this.currentTetramino.view.length;column++){
                if (this.currentTetramino.view[row][column]) {
                    this.field[this.currentTetramino.row + row][this.currentTetramino.column + column] = this.currentTetramino.view[row][column];
                }
            }
        }
        this.createNewTetramino();
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
                if (this.currentTetramino.view[row][column]===1) {
                    state[this.currentTetramino.row + row][this.currentTetramino.column + column] = this.currentTetramino.view[row][column];
                }
            }
        }
        return state;
    }

    createNewTetramino() {
        this.currentTetramino = {
            view : [
                [0,1,0],
                [0,1,1],
                [0,1,0]
            ],
            row : 0,
            column : 0
        }
    }
}