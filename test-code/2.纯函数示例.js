var squareNumber = (function memoize(x) {
    return x * x;
});
console.log(squareNumber(4));
//=> 16
console.log(squareNumber(4)); // 从缓存中读取输入值为 4 的结果
//=> 16