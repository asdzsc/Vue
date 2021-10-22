// 数组头部插入数据

let arr = [1, 2, 3]
arr.unshift('我是头部插入的数据')
console.log(arr) // => ['我是头部插入的数据', 1, 2, 3]

// 优化性能方案
let arr1 = [1, 2, 3]
let newArr = ['haha'].concat(arr)
console.log(newArr) // => ['haha',1, 2, 3]