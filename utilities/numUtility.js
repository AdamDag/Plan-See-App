class NumUtil {
    constructor() {
    }
random(length){
    return Math.floor(Math.random() * length);
}
};

class ConversionUtil{
    constructor(){
    }
   

  stringToNum(string){
    return parseInt(string);
  }
}
module.exports = {
    NumUtil,
    ConversionUtil,
};