//数组去重

let arr = ['9', '1', '2', '3', '4', '5', '1', '3', '2', '6', '2']
    // console.log(Array.from(new Set(arr))) // =>['9', '1', '2', '3', '4', '5', '6']

//倘若不用Array.from()呢？
// console.log(new Set(arr)) // => {'9', '1', '2', '3', '4','5','6'}
console.log([...new Set(arr)]);