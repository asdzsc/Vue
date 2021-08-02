function f(n) {
  var cache = {};

  function _f(n) {
    if (n === 1 || n === 2) {
      return 1;
    }
    // 先看缓存中有没有
    if (cache[n]) {
      return cache[n];
    }
    // 没有缓存
    console.log('运算f(' + n + ')');
    cache[n] = _f(n - 1) + _f(n - 2);
    return cache[n];
  }

  return _f(n);
}

console.log(f(16));
