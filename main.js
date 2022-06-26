const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

const fieldArr = [
  [pathCharacter, fieldCharacter, hole],
  [fieldCharacter, hole, fieldCharacter],
  [fieldCharacter, hat, fieldCharacter]
];

let gameOver = false;
let indexH = 0;
let indexV = 0;

class Field {
  constructor(field = [[]]){
    this.field = field;
  }

  print(){
    process.stdout.write(this.field.map(line => line.join('')).join('\n'));
  }

  checkToWin(indexH, indexV){
    //console.log('h>>'+indexH+'v>>'+indexV);
    //console.log('value>>>  :'+ this.field[indexH][indexV]);
    if(this.field[indexH][indexV] == hat){
      console.log('You won !');
      gameOver = true;
    }else if(this.field[indexH][indexV] == hole){
      console.log('You lost. You fell in the hole.');
      gameOver = true;
    }else if(this.field.length < indexH || this.field[0].length < indexV){
      console.log('You lost. You are out of bounds.');
      gameOver = true;
    }else{
      gameOver = false;
    }
    //console.log(gameOver);
    return gameOver;
  }

  handleMove(indexH, indexV){
    //console.log('Inside handleMove'+indexH+'>> '+ indexV);
    let way = prompt('Which way (u,d,l,r)? :').toLowerCase();
    if(way === 'u'){
      if(indexH <= 0){
        way = prompt('Not allowed. Enter again:');
      }else {
        indexH--;
      }
      //console.log('u:'+ indexH);
    }
    if(way === 'd'){
      if(indexH === this.field.length){
        way = prompt('Not allowed. Enter again:');
      }else {
        indexH++;
      }
      //console.log('d:'+ indexH);
    }
    if(way === 'l'){
      if(indexV === 0 ){
        way = prompt('Not allowed. Enter again:');
      }else {
        indexV--;
      }
      //console.log('l'+ indexV);
    }
    if(way === 'r'){
      if(indexV >= this.field[0].length){
        way = prompt('Not allowed. Enter again:');
      }else {
        indexV++;
      }
      //console.log('r'+ indexV);
    }
    if(!this.checkToWin(indexH, indexV)){
      this.field[indexH][indexV] = pathCharacter;
    }
    const index = [indexH, indexV];
    this.print();
    return index;
  }

  playGame(){
    this.print();
    while(!gameOver){
      const index = this.handleMove(indexH,indexV);
      //console.log(index);
      indexH = index[0];
      indexV = index[1];
    }
  }

  static generateField() {
    const fieldArray = [];
    const fieldSize = Math.floor(Math.random() * (15 - 8 + 1)) + 8;
    for(let i=0; i<fieldSize; i++){
      let rowArray = [];
      for(let j=0;j< fieldSize; j++){
        rowArray[j] = Math.floor(Math.random()*10)%4 == 2 ? hole : fieldCharacter;
      }
      fieldArray[i] = rowArray;
    }
    //fieldArray[0][0] = pathCharacter;
    const randomXFieldHat = Math.floor(Math.random() * fieldSize);
    const randomYFieldHat = Math.floor(Math.random() * fieldSize);
    fieldArray[randomXFieldHat][randomYFieldHat] = hat;
    let xStart = Math.floor(Math.random() * fieldSize);
    let yStart = Math.floor(Math.random() * fieldSize);
    while(randomXFieldHat == xStart){
      xStart = Math.floor(Math.random() * fieldSize);
    }
    while(randomYFieldHat == yStart){
      yStart = Math.floor(Math.random() * fieldSize);
    }
    fieldArray[xStart][yStart] = pathCharacter;
    indexH = xStart;
    indexV = yStart;
    return fieldArray;
  }
}

const printField = new Field(Field.generateField());
printField.playGame(); 
