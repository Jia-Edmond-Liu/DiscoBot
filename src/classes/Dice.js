class Dice{
  constructor(){ }

  roll(amount,sides){
    let returnItems = new Array(2);
    let individual = new Array(amount),
      total = 0;
    for(let i = 0; i < amount; i++){
      individual[i] = Math.floor(Math.random() * sides) + 1;
      total += individual[i];
    }
    returnItems[0] = individual;
    returnItems[1] = total;
    return returnItems
  }
}
module.exports = Dice
