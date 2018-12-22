//创建一个类来表示栈 
var Stack = /** @class */ (function () {
    /* 声明一个私有属性 items数组来保存栈里的元素*/
    function Stack() {
        this.items = [];
    }
    /* 添加一个或几个元素到栈顶 */
    Stack.prototype.push = function (ele) {
        this.items.push(ele);
    };
    /* 移除栈顶的元素 并返回这个移除的元素 */
    Stack.prototype.pop = function () {
        //this.items.pop 的返回值有隐式类型undefind，所以我们要使用类型断言手动去除 
        return this.items.pop();
    };
    /* 返回栈顶元素 */
    Stack.prototype.peek = function () {
        return this.items[this.items.length - 1];
    };
    /* 返回栈所有元素 */
    Stack.prototype.toString = function () {
        return this.items.toString();
    };
    /* 清空栈 */
    Stack.prototype.clear = function () {
        this.items = [];
    };
    /* 返回栈元素的个数 */
    Stack.prototype.size = function () {
        return this.items.length;
    };
    /* 检查栈 是否为空 */
    Stack.prototype.isEmpty = function () {
        return this.items.length === 0;
    };
    /* 打印栈的元素 */
    Stack.prototype.print = function () {
        console.log(this.items.toString());
    };
    return Stack;
}());
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
function divideBy2(decNumber) {
    var stack = new Stack(), binaryStr = '', transNum;
    while (decNumber > 0) {
        transNum = Math.floor(decNumber % 2);
        //进栈
        stack.push(transNum);
        decNumber = Math.floor(decNumber / 2);
    }
    while (!stack.isEmpty()) {
        //出栈
        binaryStr += stack.pop().toString();
    }
    return binaryStr;
}
var a = divideBy2(10);
console.log(a); //1010
function divideByAny(decNumber, base) {
    var stack = new Stack(), transNum, binaryStr = '', digits = '0123456789ABCDEF';
    //将转换的余数推入栈中
    while (decNumber > 0) {
        transNum = Math.floor(decNumber % base);
        stack.push(transNum);
        decNumber = Math.floor(decNumber / base);
    }
    //从栈中推出
    while (!stack.isEmpty()) {
        binaryStr += digits[stack.pop()];
    }
    return binaryStr;
}
var b1 = divideByAny(10, 2);
var b2 = divideByAny(10, 8);
var b3 = divideByAny(10, 16);
console.log('十进制转2进制：' + b1); //1010
console.log('十进制转8进制：' + b2); //12
console.log('十进制转16进制：' + b3); //A
/*
    回文 ： 正着读和倒着读是一样的串 例如 ：98789 ， abccba
    最简单的实现回文方式：abccba.split('').reverse().toString();
    下面用栈来实现回文
*/
function isPalindrome(str) {
    var stack = new Stack(), arr = str.split(''), index = 0;
    //将字符串推入栈中   
    arr.forEach(function (item) { return stack.push(item); });
    //从栈顶推出元素，与str位置0开始+n 比较
    while (!stack.isEmpty()) {
        if (stack.pop() !== arr[index])
            return false;
        index++;
    }
    return true;
}
console.log('abcba是回文吗：' + isPalindrome('abcba')); // true
console.log('98789是回文吗：' + isPalindrome('98789')); // true
console.log('acbdca是回文吗：' + isPalindrome('acbdca')); // false
/*
    平衡圆括号：例如 ((()()))是平衡的，但是)()是不平衡的，一共有n个左括号和n个右括号，现在让我们用栈的方式来找出平衡序列
*/
function isSolution(solution) {
    /*
        首先初始化一个Stack实例，变量left用于存储括号开，right存储括号闭合，默认传入的solution是平衡圆括号，用变量isBalance保存，symobol用于存储要推入stack中的数据，top用于存储推出stack中的数据
   */
    var stack = new Stack(), left = '([{', right = ')]}', index = 0, isBalanced = true, symbol, top;
    /*
        我们遍历传入的solution字符串；并且isBalacned为真时才可以执行while循环。根据charAt(index)取出 solution参数的字符串对应字符，赋值给symbol；如果left中（即开括号'（[{'）中存在symbol；则将symbol推入栈中。否则如果栈中为空，即solution第一个字符为闭合括号)、]或},则说明solution一定不是平衡圆括号。如果stack不为空，则将栈顶元素推出栈，并赋值给top；比较top在left中的位置和symbol在right中的位置是否相等 最后index++ 重复上述步骤。关键点在于第index个出栈的元素在left中的位置是否和solution第index位置上的字符在right中的位置是否相等，如果位置相等，那么他们一定是一对括号。
    */
    while (index < solution.length && isBalanced) {
        symbol = solution.charAt(index);
        if (left.indexOf(symbol) >= 0) {
            stack.push(symbol);
        }
        else {
            if (stack.isEmpty()) {
                isBalanced = false;
            }
            else {
                top = stack.pop();
                if (left.indexOf(top) !== right.indexOf(symbol)) {
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
function hanoi(n, A, B, C) {
    if (n > 0) {
        hanoi(n - 1, A, C, B);
        document.write('move n：' + n + " from " + A + "to" + C + "<br/>");
        hanoi(n - 1, B, A, C);
    }
}
// hanoi(3,'A','B','C');
/*
    用栈描述: from是源，to是目标柱，helper表示中转柱
 */
function towerOfHanoi(n, from, to, helper) {
    if (n > 0) {
        towerOfHanoi(n - 1, from, helper, to);
        to.push(from.pop());
        document.write('-----<br/>');
        document.write(n + '<br />');
        document.write('Source: ' + from.toString() + '<br />');
        document.write('Dest: ' + to.toString() + '<br >');
        document.write('Helper: ' + helper.toString() + '<br >');
        towerOfHanoi(n - 1, helper, to, from);
    }
}
var source = new Stack();
source.push(3);
source.push(2);
source.push(1);
var dest = new Stack();
var helper = new Stack();
towerOfHanoi(source.size(), source, dest, helper);
source.print();
helper.print();
dest.print();
