// 枚举对象属性时为了避免for..in遍历继承来的属性，
// 给大家补充了可以借助Object.prototype.hasOwnProperty() 方法进行判断， 在这里也具体为大家介绍一下它。
// hasOwnProperty() 方法会返回一个布尔值， 指示对象自身属性中是否具有指定的属性（ 也就是， 是否有指定的键）。

const obj1 = {};
obj1.property1 = 42

console.log(obj1.hasOwnProperty('property1')) // true
console.log(obj1.hasOwnProperty('toString')) // false
console.log(obj1.hasOwnProperty('hasOwnProperty')) // false

// 只会对自身属性进行判断，继承来的一律返回false。配合for...in使用，可以避免其遍历继承来的属性
const o = new Object()
o.prop = 'exists'

console.log(o.hasOwnProperty('prop')) // true
console.log(o.hasOwnProperty('toString')) // false
console.log(o.hasOwnProperty('hasOwnProperty')) // false

// 即使属性的值是 null 或 undefined，只要属性存在，hasOwnProperty 依旧会返回 true。

const o1 = new Object();
o1.propOne = null
o1.propTwo = undefined


// Object.hasOwnProperty() 只要属性存在，不管是否可枚举 hasOwnProperty 依旧会返回 true。
// Object.values 返回可枚举 不可枚举的值的数组
const my_obj = Object.create({}, {
    getFoo: {
        value: function() {
            return this.foo;
        },
        enumerable: false
    }
});
my_obj.foo = 1;

console.log(o1.hasOwnProperty('propOne')) // true
console.log(o1.hasOwnProperty('propTwo')) // true
console.log(my_obj.hasOwnProperty('foo')) //true
console.log(Object.values(my_obj)) //[1]