/**
 * 求最大连续的字符长度
 * @param {string } s 字符串
 * @returns {number} 最长连续字符出现的次数
 */
function maxPower(s) {
    let max = 1
    let i, j = 0
    if (s.length === 0) {
        return 0
    }
    for (; j <= s.length; j++) {
        if (s[i] !== s[j]) {
            var dis = j - i
                // max = dis ? dix > max : max
            if (dis > max) {
                max = dis
            }
            i = j
        }
    }
    return max
}


// test
console.log(maxPower("")); //0
console.log(maxPower("aaabbccs")); //3
console.log(maxPower("aabbvccccs")); //4
console.log(maxPower("aaabbaaddddccs")); //4