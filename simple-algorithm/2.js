function sum(nums) {
  function _sum(i) {
    if (i > nums.length - 1) {
      return 0;
    }
    return nums[i] + _sum(i + 1);
  }
  return _sum(0);
}

var result = sum([3, 4, 6, 1, 2, 6]);
console.log(result);
