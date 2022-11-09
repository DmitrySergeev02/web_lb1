"use strict";
const FIELD_WIDTH = 10
const FIELD_HEIGHT = 20

class Tetris{

    constructor(rowCount,columnCount) {
        // this.field = new Array(rowCount)
        // for (let row = 0; row<rowCount;rowCount++){
        //     this.field[row] = new Array(columnCount);
        // }

        this.field = [
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0]
        ]
    }

    moveLeft(){
        this.currentTetramino.column -= 1;
        switch (this.isMovementCorrect()){
            case (0) : {
                break;
            }
            case (1) : {
                this.currentTetramino.column += 1;
                break;
            }
            case (2): {
                this.currentTetramino.column += 1;
                this.lockTetramino();
                break;
            }
        }
    }

    moveRight(){
        this.currentTetramino.column += 1;
        switch (this.isMovementCorrect()){
            case (0) : {
                break;
            }
            case (1) : {
                this.currentTetramino.column -= 1;
                break;
            }
            case (2): {
                this.currentTetramino.column -= 1;
                this.lockTetramino();
                break;
            }
        }
    }

    moveDown(){
        this.currentTetramino.row += 1;
        switch (this.isMovementCorrect()){
            case (0) : {
                break;
            }
            case (1) : {
                this.currentTetramino.row-=1;
                break;
            }
            case (2): {
                this.currentTetramino.row-=1;
                this.lockTetramino();
                break;
            }
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

        this.currentTetramino.view = tmp;

        switch (this.isMovementCorrect()){
            case (0) : {
                break;
            }
            default : {
                this.currentTetramino.view = currentTetramino;
            }
        }

    }

    isMovementCorrect() {
        for (let row = 0; row < this.currentTetramino.view.length; row++) {
            for (let column = 0; column < this.currentTetramino.view[row].length; column++) {
                if (this.currentTetramino.view[row][column] && (this.field[this.currentTetramino.row + row]!== undefined) && (this.field[this.currentTetramino.row + row][this.currentTetramino.column+column]!== undefined)) {
                    if (this.currentTetramino.view[row][column] === this.field[this.currentTetramino.row + row][this.currentTetramino.column + column]) {
                        return 2;
                    }
                } else {
                    if (this.currentTetramino.view[row][column]) {
                        return 1;
                    }
                }
            }
        }
        return 0;
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

    lockTetramino(){
        for (let row = 0;row<this.currentTetramino.view.length;row++){
            for (let column = 0; column<this.currentTetramino.view.length;column++){
                if (this.currentTetramino.view[row][column]) {
                    this.field[this.currentTetramino.row + row][this.currentTetramino.column + column] = this.currentTetramino.view[row][column];
                }
            }
        }

    }

}

let game = new Tetris(FIELD_HEIGHT,FIELD_WIDTH)