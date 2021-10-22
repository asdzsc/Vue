// 数组尾部插入数据

let arr = [1, 2, 3]
arr.push(4)
console.log(arr) // => [1,2,3,4]

// 优化性能方案
let arr1 = [1, 2, 3]
arr1[arr1.length] = 4
console.log(arr1) // => [1,2,3,4]