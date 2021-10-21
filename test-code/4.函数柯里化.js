//es5写法
var add = function(x) {
    return function(y) {
        return x + y;
    };
};

//es6写法
var add = x => (y => x + y);

//试试看
var increment = add(1);
var addTen = add(10);

console.log(increment(2)); // 3

console.log(addTen(2)); // 12