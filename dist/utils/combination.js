"use strict";
// 組み合わせ
const combination = (nums, k) => {
    let ans = [];
    if (nums.length < k) {
        return [];
    }
    if (k === 1) {
        for (let i = 0; i < nums.length; i++) {
            ans[i] = [nums[i]];
        }
    }
    else {
        for (let i = 0; i < nums.length - k + 1; i++) {
            let row = combination(nums.slice(i + 1), k - 1);
            if (row && row.length) {
                for (let j = 0; j < row.length; j++) {
                    ans.push([nums[i]].concat(row[j]));
                }
            }
        }
    }
    return ans;
};
//# sourceMappingURL=combination.js.map