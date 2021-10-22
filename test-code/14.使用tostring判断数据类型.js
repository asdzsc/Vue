/**
 * @description: 数据类型的检测
 * @param {any} data 要检测数据类型的变量
 * @return {string} type 返回具体的类型名称【小写】
 */

const isTypeOf = (data) => {
    return Object.prototype.toString.call(data).replace(/\[object (\w+)\]/, '$1').toLowerCase()
}

console.log(isTypeOf({})) // object
console.log(isTypeOf([])) // array
console.log(isTypeOf("ss")) // string
console.log(isTypeOf(1)) // number
console.log(isTypeOf(false)) // boolean
console.log(isTypeOf(/w+/)) // regexp
console.log(isTypeOf(null)) // null
console.log(isTypeOf(undefined)) // undefined
console.log(isTypeOf(Symbol("id"))) // symbol
console.log(isTypeOf(() => {})) // function