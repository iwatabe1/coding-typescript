"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = require("readline");
const fs = __importStar(require("fs"));
let inputs = '';
let inputArray;
let currentIndex = 0;
let outputBuffer = '';
function next() {
    return inputArray[currentIndex++];
}
function nextNum() {
    return +next();
}
function nextBigInt() {
    return BigInt(next());
}
function nexts(length) {
    const arr = [];
    for (let i = 0; i < length; ++i)
        arr[i] = next();
    return arr;
}
function nextNums(length) {
    const arr = [];
    for (let i = 0; i < length; ++i)
        arr[i] = nextNum();
    return arr;
}
function nextBigInts(length) {
    const arr = [];
    for (let i = 0; i < length; ++i)
        arr[i] = nextBigInt();
    return arr;
}
function print(out, separator) {
    if (Array.isArray(out)) {
        outputBuffer += out.join(separator);
    }
    else {
        outputBuffer += out;
    }
}
function println(out, separator) {
    if (Array.isArray(out)) {
        print(out, separator || '');
    }
    else {
        print(out);
    }
    print('\n');
}
function flush() {
    console.log(outputBuffer);
}
// デバッグ環境がWindowsであれば条件分岐する
if (process.env.OS == 'Windows_NT') {
    const stream = (0, readline_1.createInterface)({
        input: process.stdin,
        output: process.stdout,
    });
    stream.on('line', (line) => {
        inputs += line;
        inputs += '\n';
    });
    stream.on('close', () => {
        inputArray = inputs.split(/\s/);
        main();
        flush();
    });
}
else {
    inputs = fs.readFileSync('/dev/stdin', 'utf8');
    inputArray = inputs.split(/\s/);
    main();
    flush();
}
/**
 * compare numbers for sort number[] ascending
 * @param a
 * @param b
 * @returns number
 */
function sortAsc(a, b) {
    return a - b;
}
/**
 * compare numbers for sort number[] descending
 * @param a
 * @param b
 * @returns number
 */
function sortDesc(a, b) {
    return b - a;
}
// 文字列反転
function reverseString(str) {
    return str.split('').reverse().join('');
}
// 最大公約数
function gcd(a, b) {
    if (b === 0)
        return a;
    else
        return gcd(b, a % b);
}
// 大きい方を返す:変数名はdpで引数を渡す
function chmax(dp, i, j, b) {
    if (dp[i][j] < b) {
        dp[i][j] = b;
        return true;
    }
    return false;
}
function chmax1(dp, i, b) {
    if (dp[i] < b) {
        dp[i] = b;
        return true;
    }
    return false;
}
function chmax2(dp, b) {
    if (dp < b) {
        dp = b;
        return true;
    }
    return false;
}
// 小さい方を返す:変数名はdpで引数を渡す
function chmin(dp, i, j, b) {
    if (dp[i][j] > b) {
        dp[i][j] = b;
        return true;
    }
    return false;
}
function chmin1(dp, i, b) {
    if (dp[i] > b) {
        dp[i] = b;
        return true;
    }
    return false;
}
// bit探索
function searchBound(array, item) {
    let low = 0;
    let high = array.length - 1;
    while (high - low > 1) {
        let midIndex = 0;
        midIndex = Math.floor((low + high) / 2);
        if (item <= array[midIndex]) {
            high = midIndex;
        }
        else {
            low = midIndex;
        }
    }
    return high;
}
// 深さ優先探索:汎用
function commonDfs(graph, v, seen) {
    seen[v] = true; // vを訪問済とする
    // v から行ける各頂点 next_v について
    for (const [key, value] of Object.entries(graph[v])) {
        if (seen[value])
            continue;
        commonDfs(graph, value, seen);
    }
}
// 順列全探索
function nextPermutation(arr) {
    const len = arr.length;
    let left = len - 2;
    while (left >= 0 && arr[left] >= arr[left + 1])
        left--;
    if (left < 0)
        return false;
    let right = len - 1;
    while (arr[left] >= arr[right])
        right--;
    {
        const t = arr[left];
        arr[left] = arr[right];
        arr[right] = t;
    }
    left++;
    right = len - 1;
    while (left < right) {
        {
            const t = arr[left];
            arr[left] = arr[right];
            arr[right] = t;
        }
        left++;
        right--;
    }
    return true;
}
function main() {
    let N = nextNum();
    let Ai = [];
    for (let i = 0; i < N; ++i) {
        Ai.push(nextNum());
    }
    const dp = Array.from({ length: N }, () => 0).map(() => Array.from({ length: N }, () => 0));
    // dp初期値
    dp[0].forEach((v, i, a) => (a[i] = Ai[i]));
    for (let i = 1; i < N; ++i) {
        for (let j = 0; j < N; ++j) {
            const l = j === 0 ? N - 1 : j - 1;
            const r = (j + i) % N;
            if (i & 1) {
                // IOI
                if (Ai[l] > Ai[r])
                    dp[i][l] = Math.max(dp[i][l], dp[i - 1][j]);
                else
                    dp[i][j] = Math.max(dp[i][j], dp[i - 1][j]);
            }
            else {
                // JOI
                dp[i][l] = Math.max(dp[i][l], dp[i - 1][j] + Ai[l]);
                dp[i][j] = Math.max(dp[i][j], dp[i - 1][j] + Ai[r]);
            }
        }
    }
    const result = Math.max(...dp[N - 1]);
    print(result);
}
//# sourceMappingURL=JOI2015B_%E3%82%B1%E3%83%BC%E3%82%AD%E3%81%AE%E5%88%87%E3%82%8A%E5%88%86%E3%81%912.js.map