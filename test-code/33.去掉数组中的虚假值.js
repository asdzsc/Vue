// 去掉数组中的虚假值
// JS中虚假值有：false、0、''、null、NaN、undefined、-0

let arr4 = ['小明', '小蓝', '', false, ' ', undefined, null, 0, NaN, true]
console.log(arr4.filter(Boolean)) // => ['小明', '小蓝', ' ', true]