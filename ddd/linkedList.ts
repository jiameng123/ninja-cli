/* 
    链表
*/
class LinkedNode<T>{
    next: LinkedNode<T>|null;
    constructor (public ele:T) {
        this.next = null;
       
    }
}
class LinkedList {

    private head = new LinkedNode('head');
    private length = 0;

    /* 想链表尾部添加一个元素。遍历链表 */
    append(node:LinkedNode<string>) {

        let current:any = this.head;

        if(this.head === null) {

            this.head = node;
        } else {
            while (current){
                current = current.next;
            }
            current.next = node;
        }
        this.length++;
    }

    /* 向链表中任意位置添加元素 */
    insert(node:LinkedNode<string>, position:number):boolean{

        /* 检查临界值 */
        if(position >=0 && position<= this.length) {
            
            let current:any = this.head,
            index = 0,
            pre:any = null;

            if(position === 0) {

                node.next = current;
                this.head = node;   
            } else {
                
                while(index++ < position) {
                    pre = current;
                    current = current.next;
                }

                pre.next = node;
                node.next = current;
            }

            this.length++;
            return true;
        } else {
            return false;
        }
    }

    /* 根据元素位置来删除链表中的元素 */
    removeAt(position:number){
        
        if(position>-1 && position<this.length) {
            let current:any = this.head,
                pre: any = null,
                index = 0;
            
            if(position === 0) {
                this.head = current.next;
                
            } else {

                while(index++ < position) {
                    pre = current;
                    current = current.next;
                }
                pre.next = current.next;
            }
            this.length--;

            return current.ele;
        } else {
            return null;
        }
    }

    /* 根据元素值删除链表中的元素 */
    remove(node:LinkedNode<string>){

       let index = this.indexOf(node);
       return this.removeAt(index);  
    }

    /* 查找元素在链表中的位置 */
    indexOf(ele:LinkedNode<string>):number {
        
        let current:any = this.head,
            index = 0;

        while(index++ < this.length){
            
            if(ele === current.ele) {
                return index;
            }
            current = current.next;
            index++;
        }

        return -1;
    }
    /* 链表长度 */
    size() {

        return this.length;
    }

    /* 链表转成字符串 */
    toString(){
        
        let current:any = this.head,
            str = '';

        while(current) {

            str += current.ele+(current.next?', ':'');
            current = current.next;
        }
        return str;
    }
    
    /* 检测链表是否为空 */
    isEmpty() {
        return this.length === 0;
    }

    /* 打印链表 */
    print() {
        console.log(this.toString());
    }
}

/* 
    双向链表
*/
class DoublyLinkedNode<T> {

    next: DoublyLinkedNode<T> | null;
    prev: DoublyLinkedNode<T> | null;
    
    constructor(public ele:T) {
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    
    private head:any = null;
    private tail:any = null;
    private len = 0;


    //在链表尾部插入元素
    append(node: DoublyLinkedNode<string>) {
        let current, _tial;

        if(this.head === null) {

            this.head = node;
            this.tail = node;

        } else {
            
            _tial = this.tail;
            _tial.next = node;
            node.prev = _tial;
            this.tail = node;

        }
        this.len++;
    }

    //在任意位置插入元素
    insert(position:number, node: DoublyLinkedNode<String>){
        
        if(position >= 0 && position <= this.len) {
            
            let current = this.head,
                index = 0,
                previous;
            if( position === 0) {
                
                if(!this.head) {
                    this.head = node;
                    this.tail = node;
                } else {
                    node.next = current;
                    current.prev = node;
                    this.head = node;
                }
            } else if (position === this.len) {
                
                current = this.tail;
                current.next = node;
                node.prev = current;
                this.tail = node;

            } else {

                while(index++ < position) {

                   previous =  current;
                   current = current.next;
                }
                
                node.next = current;
                previous.next = node;

                current.prev = node;
                node.prev = previous;
                
            }

            this.len++;
            return true;
            
        } else {

            return false;
        }
    }
    
    //从任意位置移除元素
    removeAt(position:number) {
        
        //检擦临界值
        if(position>-1 && position<this.len) {
            
            let current = this.head,
                previous,
                index = 0;

            if(position === 0) {

                this.head = current.next;
                if(this.len === 1) {
                    
                    this.tail = null;
                } else {
                    
                    this.head.prev = null;
                }
            } else if(this.len-1 === position) {

                current = this.tail;
                this.tail = current.prev;
                this.tail.next = null;
            } else {
                
                while(index++ < position) {
                    
                    previous = current;
                    current = current.next;
                } 
                
                previous.next = current.next;
                current.next.prev = previous;
            }

            this.len--;
            return current.ele;
        } else {

            return null;
        }
    }

}