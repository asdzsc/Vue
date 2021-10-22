// Object.getOwnPropertyNames(): 会返回自有属性的名称 （不管是不是可枚举的）
const obj = {
    itemA: 'nameA',
    itemB: 'nameB'
}

// 使用Object.create创建一个原型为obj的对象 （模拟继承来的属性）
var newObj = Object.create(obj)

newObj.newItemA = 'newNameA'
newObj.newItemB = 'newNameB'

// 现在我们将其中的一个属性变为不可枚举属性
Object.defineProperty(newObj, 'newItemA', {
    enumerable: false
})

const result = Object.getOwnPropertyNames(newObj) //会返回自有属性的名称 （不管是不是可枚举的）


console.log(result) // [ 'newItemA', 'newItemB' ]