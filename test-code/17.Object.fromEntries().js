// Object.fromEntries() 方法把键值对列表转换为一个对象。与Object.entries()相反。
// 相当于反转了Object.entries()方法返回的数据结构。

// Map 转化为 Object
// 通过 Object.fromEntries， 可以将Map转换为Object:

const map = new Map([
    ['foo', 'bar'],
    ['baz', 42]
])
const obj1 = Object.fromEntries(map)
console.log(obj1)
    // { foo: "bar", baz: 42 }

// Array 转化为 Object
// 通过 Object.fromEntries， 可以将Array转换为Object:

const arr = [
    ['0', 'a'],
    ['1', 'b'],
    ['2', 'c']
]
const obj = Object.fromEntries(arr)
console.log(obj)
    // { 0: "a", 1: "b", 2: "c" }

// 对象转换
// Object.fromEntries 是与 Object.entries()相反的方法，用 数组处理函数 可以像下面这样转换对象：

const object1 = {
    a: 1,
    b: 2,
    c: 3
}

const object2 = Object.fromEntries(
    Object.entries(object1)
    .map(([key, val]) => [key, val * 2])
)

// Object.entries(object1) >>> [["a",1],["b",2],["c",3]]

console.log(object2) // { a: 2, b: 4, c: 6 }