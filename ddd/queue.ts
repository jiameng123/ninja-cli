/* 
    创建一个类来表示队列
*/
class Queue<T> {
    private items: Array<T>;

    //初始化私有变量items数组，用于保存队列中的所有元素
    constructor(){
        this.items = [];
    }

    //向队列中添加一个元素
    enqueue(ele: T){
        this.items.push(ele);
    }

    //移除队列的第一项 并返回移除的项
    dequeue() :T{
        return this.items.shift()!;
    }

    //返回队列的第一个元素
    front() :T {
        return this.items[0];
    }

    //检查队列中是否还包含元素，为空则返回true
    isEmpty() :boolean {
        return this.items.length === 0;
    }

    //返回队列中元素的个数
    size(): number{
        return this.items.length;
    }

    //打印队列中的元素
    print(){
        console.log(this.items.toString());
    }
}
/* 
    到此我们的Queue类就实现，使用Queue类：
*/
let queue = new Queue<string>();
console.log(queue.isEmpty()) //输出true

//添加一些元素
queue.enqueue('xiaoming');
queue.enqueue('xiaohong');
queue.enqueue('xiaogang');

//打印一下
queue.print(); // 'xiaoming','xiaohong','xiaogang';

console.log(queue.size()); // 输出3
queue.dequeue() // 'xiaoming'
queue.print() // 'xiaohong' , 'xiaogang'

/* 
优先队列：元素的添加和移除是基于优先级的；类似于车站孕妇快捷通道，有比较高的优先级进入车站。优先队列又分为最小优先队列和最大优先队列，最小优先队列是优先级基数低的先服务，最大优先队列则相反。下面来实现最小优先队列，方法非常简单，只需要在队列元素中设置他们的优先级即可。
*/
/* 
    创建一个类来表示队列,创建一个queueEle接口来定义items 数组中元素类型
*/
interface queueEle<T> {
    ele: T,
    prirority: number
}

class PriorityQueue<T> {
    private items: Array< queueEle<T> >;
    private add: boolean;
    //初始化私有变量items数组，用于保存队列中的所有元素,数组中存储对象
    constructor(){
        this.items = [];
        this.add = false;
    }

    //向队列中添加一个元素
    enqueue(ele: queueEle<T>){
     
        for(let i = 0; i<this.items.length; i++) {
            
            if(ele.prirority < this.items[i].prirority) {
                this.items.splice(i, 0, ele);
                this.add = true;
                break;
            }
        }

        if(!this.add) {
            console.log(this.add)
            this.items.push(ele);
        }
    }

    //移除队列的第一项 并返回移除的项
    dequeue() :queueEle<T>{
        return this.items.shift()!;
    }

    //返回队列的第一个元素
    front() :queueEle<T> {
        return this.items[0];
    }

    //检查队列中是否还包含元素，为空则返回true
    isEmpty() :boolean {
        return this.items.length === 0;
    }

    //返回队列中元素的个数
    size(): number{
        return this.items.length;
    }

    //打印队列中的元素
    print(){
        console.log(this.items.length)
       this.items.forEach( (item: queueEle<T>) =>{
            console.log(`${item.ele} ----- ${item.prirority}`);
       });
    }
}

let  priorityQueue = new PriorityQueue<string>();
priorityQueue.enqueue({ele:'小红', prirority: 1});
priorityQueue.enqueue({ele:'小刚', prirority: 4});

priorityQueue.print(); // 小红---1，小明---3，小刚---4
console.log(priorityQueue.size());// 3

/* 
    循环队列-击鼓传花
*/

function hotPotato<T>(nameList: Array<T>, num: number){
    const queue = new Queue<T>();
    let name: T;
    console.log('123')
    //将nameList存入 queue 中
    nameList.forEach(item => {
        queue.enqueue( item );
    });
    
    while( queue.size() > 1) {
        for(let i = 0; i< num; i++) {
            queue.enqueue(queue.dequeue());
        }
        name =  queue.dequeue();
        console.log(name + '被淘汰了')
    }
    name = queue.dequeue();
    return name;
}
let nameList = ['小明', '小红', '小刚', '小强'];
hotPotato<string>(nameList , 4); //小强

let num = [1, 3, 5, 7];

function  ac (arr: Array<number>, num: number) {
    let start = 0,
        end = arr.length - 1,
        mid = null,
        guess = null;

       while(start <= end) {
            mid = Math.floor( (start + end) /2);
           
            guess = arr[mid];
            if(guess < num ) {
                start = mid + 1;
            } else if( guess > num ) {
                end = mid - 1;
            } else  if( guess === num){
                return mid;
            } else {
                return null;
            }
             
       }
}
console.log(ac(num, 1));

