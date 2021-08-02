/**
 * 判断一个符号是不是运算符
 * @param {*} token
 */
function _isOperator(token) {
  return ['+', '-', '*', '/', ')', '('].includes(token);
}

/**
 * 得到四则运算的结果
 * @param {string} s 四则运算表达式
 * @returns {number}
 */
function compute(s) {
  // code here
  s = decompose(s); // 通过decompose函数分解表达式，得到一个中缀表达式的分解数组
  s = toRPN(s); // 通过toRPN函数，将中缀表达式转换为后缀表达式（逆波兰表达式）
  return evalRPN(s); // 计算逆波兰表达式结果
}

/**
 * 分解表达式中的所有操作数和操作符
 * @param {string} s 待分解的表达式
 * @return {any[]} 分解结果
 */
function decompose(s) {
  s = s.replace(/\s/g, ''); // 去掉字符串的所有空白
  if (s.length === 0) {
    return [];
  }
  var result = []; // 接收最终结果
  var reg = /^(?<data>-?\d+(?:\.\d+)?)(?<operator>[+\-*/]?)/;
  while (s.length > 0) {
    var firstChar = s[0];
    if (firstChar === '(' || firstChar === ')') {
      result.push(firstChar);
      s = s.substr(1);
    } else {
      var matches = s.match(reg);
      if (matches) {
        var data = +matches.groups.data;
        var operator = matches.groups.operator;
        result.push(data);
        if (operator) {
          result.push(operator);
        }
        s = s.substr(matches[0].length);
      } else {
        result.push(s[0]);
        s = s.substr(1);
      }
    }
  }
  return result;
}

/**
 * 计算逆波兰表达式的结果
 * @param {string[]} tokens 逆波兰表达式中的符号和数字
 * @return {number} 计算结果
 */
function evalRPN(tokens) {
  var numStack = []; // 数字栈
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (_isOperator(token)) {
      // 是一个运算符
      var data1 = numStack.pop(); // 弹出一个
      var data2 = numStack.pop(); // 弹出第二个
      // 使用 data2 token data1 进行运算
      var result = _compute(data2, data1, token);
      numStack.push(result);
    } else {
      // 是一个数字
      numStack.push(token);
    }
  }
  return numStack[0];

  function _compute(n1, n2, operator) {
    switch (operator) {
      case '+':
        return n1 + n2;
      case '-':
        return n1 - n2;
      case '*':
        return n1 * n2;
      case '/':
        return n1 / n2;
    }
  }
}

/**
 * 根据表达式的数字和符号，得到一个逆波兰表达式
 * @param {any[]} tokens 表达式中的数字和符号
 */
function toRPN(tokens) {
  // code here
  var RPN = []; // 最终结果
  var opStack = []; // 符号栈
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (_isOperator(token)) {
      // 符号
      _handleOperator(token);
    } else {
      // 数字
      RPN.push(token);
    }
  }
  // 将符号栈的东西依次弹出，依次加入到结果中
  while (opStack.length > 0) {
    RPN.push(opStack.pop());
  }
  return RPN;

  /**
   * 判断 token1 是不是 > token2
   * @param {*} token1
   * @param {*} token2
   */
  function _isHigher(token1, token2) {
    var config = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2,
    };
    return config[token1] > config[token2];
  }

  /**
   * 处理某一个符号
   * @param {*} token
   */
  function _handleOperator(token) {
    var top = opStack[opStack.length - 1]; // 栈顶元素
    //符号栈是空的 || 当前是 (
    if (opStack.length === 0 || token === '(') {
      opStack.push(token);
    }
    // 当前符号是 )
    else if (token === ')') {
      var popTop = opStack.pop();
      if (popTop !== '(') {
        RPN.push(popTop);
        _handleOperator(token);
      }
    }
    // 栈顶是( || 优先级>栈顶
    else if (top === '(' || _isHigher(token, top)) {
      opStack.push(token);
    }
    // 优先级 <= 栈顶
    else {
      var popTop = opStack.pop();
      RPN.push(popTop);
      _handleOperator(token);
    }
  }
}

// console.log(compute('1+1'));
console.log(compute('10/(2+3)'));
