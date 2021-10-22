// Object.isFrozen() 方法判断一个对象是否被冻结。
// 一个对象默认是可扩展的, 所以它也是非冻结的。
Object.isFrozen({}) // false

// 一个不可扩展的空对象同时也是一个冻结对象。
var vacuouslyFrozen = Object.preventExtensions({})
Object.isFrozen(vacuouslyFrozen) // true

var frozen = {
    1: 81
}
console.log(Object.isFrozen(frozen)); // false

// 使用Object.freeze是冻结一个对象最方便的方法.
Object.freeze(frozen)
console.log(Object.isFrozen(frozen)); // true