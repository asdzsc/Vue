// 这是当对象上没有这个键的时候，不会报错，而是赋值undefined

const foo = {
    name: "zengbo"
}
let a = foo.name ? .toUpperCase() // "ZENGBO" 
let b = foo.name ? .firstName ? .toUpperCase() // "undefined"