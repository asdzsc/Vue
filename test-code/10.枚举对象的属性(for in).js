// for in: 会遍历对象中所有的可枚举属性（包括自有属性和继承属性）
const obj = {
    itemA: 'itemA',
    itemB: 'itemB'
}

// 使用Object.create创建一个原型为obj的对象 （模拟继承来的属性）
var newObj = Object.create(obj)

newObj.newItemA = 'newItemA'
newObj.newItemB = 'newItemB'

for (i in newObj) {
    console.log(i)
}
// newItemA
// newItemB
// itemA
// itemB

// 现在我们将其中的一个属性变为不可枚举属性
Object.defineProperty(newObj, 'newItemA', {
    enumerable: false
})

for (i in newObj) {
    console.log(i)
}
// newItemB
// itemA
// itemB

// 如果不想让for...in枚举继承来的属性可以借助Object.prototype.hasOwnProperty()
for (i in newObj) {
    if (newObj.hasOwnProperty(i)) console.log(i)
}
// newItemB