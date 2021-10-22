// Object.getOwnPropertyNames() 返回一个数组，该数组对元素是 obj自身拥有的枚举或不可枚举属性名称字符串。
// 数组中枚举属性的顺序与通过for...in循环Object.keys迭代该对象属性时一致。数组中不可枚举属性的顺序未定义。

const arr = ["a", "b", "c"];
console.log(Object.getOwnPropertyNames(arr).sort()) // ["0", "1", "2", "length"]

// 类数组对象
const obj = {
    0: "a",
    1: "b",
    2: "c"
};
console.log(Object.getOwnPropertyNames(obj).sort()) // ["0", "1", "2"]

// 使用Array.forEach输出属性名和属性值
Object.getOwnPropertyNames(obj).forEach(function(val, idx, array) {
        console.log(val + " -> " + obj[val]);
    })
    // 0 -> a
    // 1 -> b
    // 2 -> c

// 不可枚举属性
const my_obj = Object.create({}, {
    getFoo: {
        value: function() {
            return this.foo;
        },
        enumerable: false
    }
});
my_obj.foo = 1;

console.log(Object.getOwnPropertyNames(my_obj).sort())
    // ["foo", "getFoo"]