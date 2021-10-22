// 获取数组的随机值

// 使用Math.floor() 和Math.random() 方法获得一个随机值
let arr2 = ['张三', '李四', '王五', '找六', '张三']
console.log(arr2[Math.floor(Math.random() * (arr2.length))]) // => 张三