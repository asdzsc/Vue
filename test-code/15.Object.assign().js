// Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。常用来合并对象。
const obj1 = {
    a: 1,
    b: 2
}
const obj2 = {
    b: 4,
    c: 5
}

const obj3 = Object.assign(obj1, obj2)
const obj4 = Object.assign({}, obj1) // 克隆了obj1对象

console.log(obj1) // { a: 1, b: 4, c: 5 } 对同名属性b进行了替换 obj1发生改变是因为obj2赋给了obj1
console.log(obj2) // { b: 4, c: 5 }
console.log(obj3) // { a: 1, b: 4, c: 5 }
console.log(obj4) // { a: 1, b: 4, c: 5 }

// 如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。
// Object.assign 方法只会拷贝源对象自身的并且可枚举的属性到目标对象。

// assign其实是浅拷贝而不是深拷贝(如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。同名属性会替换)
const obj5 = {
    name: 'dengke',
    a: 10,
    fn: {
        sum: 10
    }
}

const obj6 = Object.assign(obj1, obj5)
console.log(obj6) // { a: 10, b: 2, name: 'dengke', fn: {…}}
console.log(obj1) // {a: 10, b: 2, name: 'dengke', fn: {…}} 对同名属性a进行了替换