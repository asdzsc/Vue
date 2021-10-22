// Object.entries() 方法返回一个给定对象自身可枚举属性的键值对数组。
const obj1 = {
    name: 'dengke',
    age: 18
};

for (const [key, value] of Object.entries(obj1)) {
    console.log(`${key}: ${value}`);
}
// "name: dengke"
// "age: 18"

const obj2 = {
    foo: 'bar',
    baz: 42
}
console.log(Object.entries(obj2)) // [ ['foo', 'bar'], ['baz', 42] ]

const obj3 = {
    0: 'a',
    1: 'b',
    2: 'c'
}
console.log(Object.entries(obj3)) // [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]

// 将Object转换为Map，new Map()构造函数接受一个可迭代的entries。
// 借助Object.entries方法你可以很容易的将Object转换为Map:
const obj = {
    foo: "bar",
    baz: 42
}
const map = new Map(Object.entries(obj))
console.log(map) // Map { foo: "bar", baz: 42 }