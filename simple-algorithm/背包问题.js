var list = [
  { v: 10, p: 5 },
  { v: 7, p: 4 },
  { v: 11, p: 8 },
  { v: 9, p: 6 },
  { v: 2, p: 1 },
  { v: 17, p: 20 },
  { v: 25, p: 30 },
];

console.log(package(list, 40));

/**
 * 背包问题求解
 * @param {*} list 商品数组
 * @param {*} c 背包体积
 */
function package(list, c) {
  var cache = {};
  /**
   * 求 从下标i开始，到末尾的所有商品，在剩余空间rest中，得到的最大价值
   * @param {*} i
   * @param {*} rest
   */
  function _package(i, rest) {
    if (i > list.length - 1) {
      return {
        p: 0,
        pick: [],
      };
    }
    var cacheKey = i + '-' + rest; // 缓存的属性名
    if (cache[cacheKey]) {
      return cache[cacheKey];
    }
    var curItem = list[i]; // 当前商品
    if (curItem.v > rest) {
      // 这件商品装不下
      var restSituation = _package(i + 1, rest); // 后边的选择情况
      cache[cacheKey] = {
        p: restSituation.p,
        pick: [0, ...restSituation.pick],
      };
    } else {
      // 能装下
      // 选
      var chooseRest = _package(i + 1, rest - curItem.v);
      var choose = {
        p: curItem.p + chooseRest.p,
        pick: [1, ...chooseRest.pick],
      };
      // 不选
      var unchooseRest = _package(i + 1, rest);
      var unchoose = {
        p: unchooseRest.p,
        pick: [0, ...unchooseRest.pick],
      };
      cache[cacheKey] = choose.p > unchoose.p ? choose : unchoose;
    }
    return cache[cacheKey];
  }

  var result = _package(0, c);
  return result;
}
