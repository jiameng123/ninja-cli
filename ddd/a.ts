import {Stack} from  './stack';

/* 
    栈的应用 
    进制 转换 
    
*/

//十进制转换成二进制的数
function divideBy2(decNumber: number) :string {
    let stack = new Stack<number>(),
        binaryStr = '',
        transNum;

    while(decNumber > 0 ){
        transNum = decNumber % 2 ;
        stack.push(transNum);
        decNumber = Math.floor(decNumber/2);
    }
    
    while(!stack.isEmpty()){
        binaryStr += stack.pop().toString();
    }
    return binaryStr;
}
let a = divideBy2(10);
console.log('awdawd')
console.log(a)