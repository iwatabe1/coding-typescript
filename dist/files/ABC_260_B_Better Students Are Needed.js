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
// ?????????????????????Windows??????????????????????????????
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
// ???????????????
function reverseString(str) {
    return str.split('').reverse().join('');
}
// ???????????????
function gcd(a, b) {
    if (b === 0)
        return a;
    else
        return gcd(b, a % b);
}
// ???????????????(?????????????????????):????????????dp??????????????????
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
// ???????????????(?????????????????????):????????????dp??????????????????
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
// bit??????
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
// ??????????????????:??????
function commonDfs(graph, v, seen) {
    seen[v] = true; // v?????????????????????
    // v ???????????????????????? next_v ????????????
    for (const [key, value] of Object.entries(graph[v])) {
        if (seen[value])
            continue;
        commonDfs(graph, value, seen);
    }
}
function main() {
    let [N, X, Y, Z] = nextNums(4);
    let A = nextNums(N);
    let B = nextNums(N);
    const C = [];
    const E = [];
    const sum = [];
    const passed = Array(N + 5).fill(false);
    // ??????
    for (let i = 0; i < N; i++) {
        C.push(10000 * (100 - A[i]) + i);
    }
    C.sort(sortAsc);
    for (let i = 0; i < X; i++) {
        passed[C[i] % 10000] = true;
    }
    // ??????
    for (let i = 0; i < N; i++) {
        if (!passed[i])
            E.push(10000 * (100 - B[i]) + i);
    }
    E.sort(sortAsc);
    for (let i = 0; i < Y; i++) {
        passed[E[i] % 10000] = true;
    }
    // ??????+??????
    for (let i = 0; i < N; i++) {
        if (!passed[i])
            sum.push(10000 * (200 - (A[i] + B[i])) + i);
    }
    sum.sort(sortAsc);
    for (let i = 0; i < Z; i++) {
        passed[sum[i] % 10000] = true;
    }
    // ???????????????
    const result = passed
        .map((val, index) => {
        if (val === true)
            return index + 1;
    })
        .filter((val) => val !== undefined);
    println(result, '\n');
}
//# sourceMappingURL=ABC_260_B_Better%20Students%20Are%20Needed.js.map