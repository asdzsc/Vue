const fn = function(n) {
    console.log(n)
}
const str = 'string'
const arr = [1, 2, 3]
const obj = {
    a: 123,
    b: 456
}
const num = 1
const b = true
const n = null
const u = undefined

console.log(typeof str) // string
console.log(typeof arr) // object
console.log(typeof obj) // object
console.log(typeof num) // number
console.log(typeof b) // boolean
console.log(typeof n) // object null是一个空的对象
console.log(typeof u) // undefined
console.log(typeof fn) // function

// 通过上面的检测我们发现typeof检测的Array和Object的返回类型都是Object，因此用typeof是无法检测出来数组和对象的。