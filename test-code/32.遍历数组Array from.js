// 遍历数组
// 平时我们使用最多的就是数组的 .map 方法，其实还有一个方法也能达到一样的目的，那就是Array.from
let list = [{
        name: '小明',
        age: 11
    },
    {
        name: '小红',
        age: 13
    },
    {
        name: '校长',
        age: 15
    }
]
Array.from(list, (item) => item.str = `名字：${item.name}，年龄：${item.age}`)
console.log(list)