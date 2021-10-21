// 非纯函数
// var minimum = 21;
// var checkAge = function(age) {
//     return age >= minimum;
// };


// 纯函数  不依赖于系统状态
var checkAge = function(age) {
    var minimum = 21;
    return age >= minimum;
};

// 函数柯里化
// var checkage = min => (age => age > min);
// var checkage18 = checkage(18);
// checkage18(20);