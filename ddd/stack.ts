
//创建一个类来表示栈 
class Stack<T> {
    private items :Array<T>
    /* 声明一个私有属性 items数组来保存栈里的元素*/
    constructor() {
        this.items = [] ;
    }

    /* 添加一个或几个元素到栈顶 */
    push(ele: T) { 
        
        this.items.push(ele);
    }
    
    /* 移除栈顶的元素 并返回这个移除的元素 */
    pop() :T {
        //this.items.pop 的返回值有隐式类型undefind，所以我们要使用类型断言手动去除 
        return  this.items.pop()!;
    }
    
    /* 返回栈顶元素 */
    peek(): T {
        return this.items[this.items.length-1];
    }

    /* 返回栈所有元素 */
    toString(): string{
        return this.items.toString();
    }

    /* 清空栈 */
    clear(){
        this.items = [];
    }

    /* 返回栈元素的个数 */
    size() :number {
        return this.items.length;
    }

    /* 检查栈 是否为空 */
    isEmpty() :boolean {
        return this.items.length === 0;
    }

    /* 打印栈的元素 */
    print(){
        console.log (this.items.toString());
    }

} 

/* 
    栈的应用 
    进制 转换 
    
*/

/*
 十进制转换成二进制的数,除K取余,从下往上取,类似于这么一个过程 ：
    10 % 2 = 0，↑  
    5 % 2 = 1， ↑
    2 % 2 = 0,  ↑
    1 % 2 = 1,  ↑
    除数进栈 余数出栈
*/
function divideBy2(decNumber: number) :string {
    let stack = new Stack<number>(),
        binaryStr = '',
        transNum;

    while(decNumber > 0 ){
        transNum =  Math.floor(decNumber % 2);
        //进栈
        stack.push(transNum); 
        decNumber = Math.floor(decNumber/2);
    }
    
    while(!stack.isEmpty()){
        //出栈
        binaryStr += stack.pop().toString();
    }
    return binaryStr;
}
let a = divideBy2(10);
console.log(a); //1010

/* 
    可以稍微改动一下，把十进制的数转换成任意进制的数，十进制转2进制时，余数是0或1，转成八进制时，余数是0~7，转换成16进制时，余数是0~9之间的数字加上ABCDEF，我们需要将余数做一个转换，声明一个digits变量来存储这些余数，然后在出栈的时候根据digits来获取对应进制的数值
*/
type arg = number;
function divideByAny(decNumber: arg, base: arg) :string{

    let stack = new Stack<number>(),
        transNum,
        binaryStr = '',
        digits = '0123456789ABCDEF';

    //将转换的余数推入栈中
    while( decNumber > 0) {

        transNum = Math.floor(decNumber % base);
        stack.push(transNum);
        decNumber = Math.floor(decNumber / base); 
    }

    //从栈中推出
    while(!stack.isEmpty()) {

        binaryStr += digits[stack.pop()];
    }
    return binaryStr;
}
let b1 = divideByAny(10,2);
let b2 = divideByAny(10,8);
let b3 = divideByAny(10,16);

console.log('十进制转2进制：'+b1); //1010
console.log('十进制转8进制：'+b2); //12
console.log('十进制转16进制：'+b3); //A

/* 
    回文 ： 正着读和倒着读是一样的串 例如 ：98789 ， abccba
    最简单的实现回文方式：abccba.split('').reverse().toString();
    下面用栈来实现回文
*/
function isPalindrome(str: string) {

    let stack = new Stack<string>(),
        arr = str.split(''),
        index = 0;
    //将字符串推入栈中   
    arr.forEach (item => stack.push(item));

    //从栈顶推出元素，与str位置0开始+n 比较
    while(!stack.isEmpty()) {
        
        if(stack.pop() !== arr[index]) return false;
        index++;
    }

    return true;
}
console.log('abcba是回文吗：'+isPalindrome('abcba')); // true
console.log('98789是回文吗：'+isPalindrome('98789')); // true
console.log('acbdca是回文吗：'+isPalindrome('acbdca')); // false

/* 
    平衡圆括号：例如 ((()()))是平衡的，但是)()是不平衡的，一共有n个左括号和n个右括号，现在让我们用栈的方式来找出平衡序列
*/
function isSolution(solution: string) :boolean{
    /*  
        首先初始化一个Stack实例，变量left用于存储括号开，right存储括号闭合，默认传入的solution是平衡圆括号，用变量isBalance保存，symobol用于存储要推入stack中的数据，top用于存储推出stack中的数据
   */
    let stack = new Stack<string>(),
        left = '([{',
        right = ')]}',
        index = 0,
        isBalanced = true,
        symbol, top;
    /* 
        我们遍历传入的solution字符串；并且isBalacned为真时才可以执行while循环。根据charAt(index)取出 solution参数的字符串对应字符，赋值给symbol；如果left中（即开括号'（[{'）中存在symbol；则将symbol推入栈中。否则如果栈中为空，即solution第一个字符为闭合括号)、]或},则说明solution一定不是平衡圆括号。如果stack不为空，则将栈顶元素推出栈，并赋值给top；比较top在left中的位置和symbol在right中的位置是否相等 最后index++ 重复上述步骤。关键点在于第index个出栈的元素在left中的位置是否和solution第index位置上的字符在right中的位置是否相等，如果位置相等，那么他们一定是一对括号。
    */
    while(index < solution.length  && isBalanced) {
        
        symbol = solution.charAt(index);
        
        if(left.indexOf(symbol) >= 0) {

            stack.push(symbol);
        } else {

            if(stack.isEmpty()) {
                isBalanced = false;
            } else {

                top = stack.pop();

                if(left.indexOf(top) !== right.indexOf(symbol)) {
            
                    isBalanced = false;
                } 
            }
        }

        index++;
    }

    if (isBalanced && stack.isEmpty()) {
        return true;
    }
    return false;
}

console.log(isSolution('{([])}')); //true
console.log(isSolution('{{([][])}()}')); //true
console.log(isSolution('[{()]]')); //false
console.log(isSolution('((()()))')); //true

/* 
汉诺塔： 有三根杆子A，B，C。A杆上有N个(N>1)穿孔圆盘，盘的尺寸由下到上依次变小。要求按下列规则将所有圆盘移至C杆： 每次只能移动一个圆盘； 大盘不能叠在小盘上面，假设有3个柱子A,B,C，A柱上有三个盘子,那么把A柱的盘子移动到C柱上就需要：
   A->C
   A->B
   C->B
   A->C
   B->A
   B->C
   A->C

   把A柱子n-1个盘子移动到B柱上，C作为中转站，
   将B住上n-1个盘子移动到C住上,A作为中转站
   ...
   重复以上步骤，用递归的写法如下
*/
function hanoi(n: number, A: string, B: string, C: string){
    if(n>0){
        hanoi(n-1, A, C, B);
        document.write('move n：' + n + " from "+ A +"to"+C+"<br/>");
        hanoi(n-1, B, A ,C);
    }
}
// hanoi(3,'A','B','C');

/* 
    用栈描述: from是源，to是目标柱，helper表示中转柱
 */
function towerOfHanoi(n: any , from: Stack<number>, to: Stack<number>, helper: Stack<number>) {

    if(n > 0 ) {
        towerOfHanoi(n-1, from, helper, to);
        to.push(from.pop());
        document.write('-----<br/>');
        document.write(<string>n +'<br />');
        document.write('Source: ' + from.toString()+'<br />');
        document.write('Dest: ' + to.toString()+'<br >');
        document.write('Helper: ' + helper.toString()+'<br >');
       
        towerOfHanoi(n-1, helper, to, from);
    }

}

let source = new Stack<number>();
source.push(3);
source.push(2);
source.push(1);
let dest = new Stack<number>();
let helper = new Stack<number>();

towerOfHanoi(source.size(), source, dest, helper);

source.print();
helper.print();
dest.print();
