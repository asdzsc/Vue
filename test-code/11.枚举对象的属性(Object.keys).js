// Object.keys(): 会返回一个包括所有的可枚举的自有属性的名称组成的数组

const obj = {
    itemA: 'nameA',
    itemB: 'nameB'
}

// 使用Object.create创建一个原型为obj的对象 （模拟继承来的属性）
var newObj = Object.create(obj)

newObj.newItemA = 'newNameA'
newObj.newItemB = 'newNameB'

const result = Object.keys(newObj) //返回可枚举的自有属性名组成的数组
const result1 = Object.values(newObj) //返回可枚举的自有属性值组成的数组

console.log(result) // [ 'newItemA', 'newItemB' ]
console.log(result1) // [ 'newNameA', 'newNameB' ]