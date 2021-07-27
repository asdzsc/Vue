/**
 * 判断字符串是否合法
 * @param {*} char 
 */

var regx = /[/a-zA-z0-9/]/

function isValid(char) {
    return regx.test(char)
}

/**
 * 判断一个字符串是不是回文串
 * @param {string} s 要验证的字符串 
 * @returns {boolean} 验证结果
 */

function isPalindrome(s) {
    if (s.length === 0) {
        return true
    }
    let left = 0,
        right = s.length - 1

    while (left < right) {
        // 不区分大小写
        let leftChar = s[left].toLowerCase()
        let rightChar = s[right].toLowerCase()
            // 左边字符不合法
        if (!isValid(leftChar)) {
            left++
        }
        // 右边字符不合法
        else if (!isValid(rightChar)) {
            right--
        }
        // 两个字符相等
        else if (leftChar === rightChar) {
            left++;
            right--;
        } else {
            return false
        }
    }
    // 两个指针见面了
    return true

}

console.log(isPalindrome('8,9'))
console.log(isPalindrome('8,9,9,8'))
console.log(isPalindrome(''))
console.log(isPalindrome('a,b,c,d'))
console.log(isPalindrome('Race a car'))