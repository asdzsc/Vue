// Object.freeze() 方法可以冻结一个对象。一个被冻结的对象再也不能被修改；
// 冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，
// 以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。freeze() 返回和传入的参数相同的对象。

const obj = {
    prop: 42
}

Object.freeze(obj)

obj.prop = 33

console.log(obj.prop)
    //  42

// 被冻结的对象是不可变的。但也不总是这样。下例展示了冻结对象不是常量对象（浅冻结）
const obj1 = {
    internal: {}
}
Object.freeze(obj1)

obj1.internal.a = 'aValue'
console.log(obj1.internal.a) // 'aValue'

// 要使对象不可变，需要递归冻结每个类型为对象的属性（深冻结）。
// 深冻结函数.
function deepFreeze(obj) {
    // 取回定义在obj上的属性名
    const propNames = Object.getOwnPropertyNames(obj)

    // 在冻结自身之前冻结属性
    propNames.forEach(function(name) {
        const prop = obj[name]

        // 如果prop是个对象，冻结它
        if (typeof prop == 'object' && prop !== null)
            deepFreeze(prop)
    })

    // 冻结自身
    return Object.freeze(obj);
}

const obj2 = {
    internal: {}
}

deepFreeze(obj2)
obj2.internal.a = 'anotherValue'
obj2.internal.a // undefined