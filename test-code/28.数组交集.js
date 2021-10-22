// 数组交集

let arr2 = ['张三', '李四', '王五', '找六', '张三']
let arr3 = ['小明', '小红', '王五', '张三']

// let jiaoji = []
// arr2.forEach(x => {
//     arr3.forEach(v => {
//         if (x == v) {
//             jiaoji.push(v)
//         }
//     })
// })
// console.log([...new Set(jiaoji)]); // => ['张三', '王五']


// 利用 filter 跟ES7的 includes 方法来完成
let jiaoji = [...new Set(arr2)].filter(item => {
    return arr3.includes(item)
})

console.log(jiaoji); // => ['张三', '王五']