let arr = [1, 2, 3, 4, 5, 6]

// 当一个函数的输出不受外部环境影响，同时也不影响外部环境时，该函数就是纯函数
// 因为纯函数相对于非纯函数来说，在可缓存性、可移植性、可测试性以及并行计算方面都有着巨大的优势

// slice 纯函数
console.log("slice-----", arr.slice(0, 2));
console.log("slice-----", arr);

// splice 非纯函数
console.log("splice-----", arr.splice(0, 2));
console.log("splice-----", arr)