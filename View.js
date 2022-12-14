
export default class View{

    colorPool = [
        'red',
        'blue',
        'aqua',
        'darkmagenta',
        'deeppink',
        'green',
        'yellow'
    ]

    constructor(rows,columns) {
        this.canvas = document.getElementById("canvas");
        this.canvasContext = this.canvas.getContext("2d");

        this.rectWidth = this.canvas.clientWidth/columns;
        this.rectHeight = this.canvas.clientHeight/rows;
    }

    drawField(field){
        this.clearScreen();
        for(let row = 0; row< field.length;row++){
            for(let column = 0; column< field[row].length;column++){
                if (field[row][column]>0){
                    this.canvasContext.fillStyle = this.colorPool[field[row][column]-1];
                    this.canvasContext.strokeStyle = 'black';
                    this.canvasContext.lineWidth = 2;

                    this.canvasContext.fillRect(column*this.rectWidth,row*this.rectHeight,this.rectWidth,this.rectHeight);
                    this.canvasContext.strokeRect(column*this.rectWidth,row*this.rectHeight,this.rectWidth,this.rectHeight);
                } else {
                    this.canvasContext.strokeStyle = 'gray';
                    this.canvasContext.lineWidth = 1;
                    this.canvasContext.strokeRect(column*this.rectWidth,row*this.rectHeight,this.rectWidth,this.rectHeight);
                }
            }
        }
    }

    clearScreen(){
        this.canvasContext.clearRect(0,0,this.canvas.clientWidth,this.canvas.clientHeight);
    }
}