/*
    创建一个类来表示队列
*/
var Queue = /** @class */ (function () {
    //初始化私有变量items数组，用于保存队列中的所有元素
    function Queue() {
        this.items = [];
    }
    //向队列中添加一个元素
    Queue.prototype.enqueue = function (ele) {
        this.items.push(ele);
    };
    //移除队列的第一项 并返回移除的项
    Queue.prototype.dequeue = function () {
        return this.items.shift();
    };
    //返回队列的第一个元素
    Queue.prototype.front = function () {
        return this.items[0];
    };
    //检查队列中是否还包含元素，为空则返回true
    Queue.prototype.isEmpty = function () {
        return this.items.length === 0;
    };
    //返回队列中元素的个数
    Queue.prototype.size = function () {
        return this.items.length;
    };
    //打印队列中的元素
    Queue.prototype.print = function () {
        console.log(this.items.toString());
    };
    return Queue;
}());
/*
    到此我们的Queue类就实现，使用Queue类：
*/
var queue = new Queue();
console.log(queue.isEmpty()); //输出true
//添加一些元素
queue.enqueue('xiaoming');
queue.enqueue('xiaohong');
queue.enqueue('xiaogang');
//打印一下
queue.print(); // 'xiaoming','xiaohong','xiaogang';
console.log(queue.size()); // 输出3
queue.dequeue(); // 'xiaoming'
queue.print(); // 'xiaohong' , 'xiaogang'
var PriorityQueue = /** @class */ (function () {
    //初始化私有变量items数组，用于保存队列中的所有元素,数组中存储对象
    function PriorityQueue() {
        this.items = [];
        this.add = false;
    }
    //向队列中添加一个元素
    PriorityQueue.prototype.enqueue = function (ele) {
        for (var i = 0; i < this.items.length; i++) {
            if (ele.prirority < this.items[i].prirority) {
                this.items.splice(i, 0, ele);
                this.add = true;
                break;
            }
        }
        if (!this.add) {
            console.log(this.add);
            this.items.push(ele);
        }
    };
    //移除队列的第一项 并返回移除的项
    PriorityQueue.prototype.dequeue = function () {
        return this.items.shift();
    };
    //返回队列的第一个元素
    PriorityQueue.prototype.front = function () {
        return this.items[0];
    };
    //检查队列中是否还包含元素，为空则返回true
    PriorityQueue.prototype.isEmpty = function () {
        return this.items.length === 0;
    };
    //返回队列中元素的个数
    PriorityQueue.prototype.size = function () {
        return this.items.length;
    };
    //打印队列中的元素
    PriorityQueue.prototype.print = function () {
        console.log(this.items.length);
        this.items.forEach(function (item) {
            console.log(item.ele + " ----- " + item.prirority);
        });
    };
    return PriorityQueue;
}());
var priorityQueue = new PriorityQueue();
priorityQueue.enqueue({ ele: '小红', prirority: 1 });
priorityQueue.enqueue({ ele: '小刚', prirority: 4 });
priorityQueue.print(); // 小红---1，小明---3，小刚---4
console.log(priorityQueue.size()); // 3
/*
    循环队列-击鼓传花
*/
function hotPotato(nameList, num) {
    var queue = new Queue();
    var name;
    console.log('123');
    //将nameList存入 queue 中
    nameList.forEach(function (item) {
        queue.enqueue(item);
    });
    while (queue.size() > 1) {
        for (var i = 0; i < num; i++) {
            queue.enqueue(queue.dequeue());
        }
        name = queue.dequeue();
        console.log(name + '被淘汰了');
    }
    name = queue.dequeue();
    return name;
}
var nameList = ['小明', '小红', '小刚', '小强'];
hotPotato(nameList, 4); //小强
var num = [1, 3, 5, 7];
function ac(arr, num) {
    var start = 0, end = arr.length - 1, mid = null, guess = null;
    while (start <= end) {
        mid = Math.floor((start + end) / 2);
        guess = arr[mid];
        if (guess < num) {
            start = mid + 1;
        }
        else if (guess > num) {
            end = mid - 1;
        }
        else if (guess === num) {
            return mid;
        }
        else {
            return null;
        }
    }
}
console.log(ac(num, 1));
