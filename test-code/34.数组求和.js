// 数组求和

let arr2 = ['张三', '李四', '王五', '找六', '张三']
console.log(arr2.reduce((a, b) => a + b)) // => 张三李四王五找六张三
let arr5 = [1, 2, 3, 4]
console.log(arr5.reduce((a, b) => a + b)) // => 10

const arr = [1, 2, 'a']

console.log(arr.indexOf('a')) // -1  indexOf找不到-1 找到返回对应的下标
console.log(arr.includes(3)) // false includes找不到返回 false 找到返回 true