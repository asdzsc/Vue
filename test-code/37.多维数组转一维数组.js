var arr = [1, [2, [
    [3, 4], 5
], 6]];

function unid(arr) {
    var arr1 = (arr + '').split(','); //将数组转字符串后再以逗号分隔转为数组
    var arr2 = arr1.map(function(x) {
        return Number(x);
    });
    return arr2;
}
console.log(unid(arr));