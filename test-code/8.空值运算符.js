/* 有一个冷门运算符??可以判断undefined和null，这样是比较符合普遍需求的。 */

const age = 0
const a = age ? ? 123
console.log(a) // 0