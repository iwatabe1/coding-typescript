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
// 動的計画法(大きい方を返す)
function chmax(dp, i, j, b) {
    if (dp[i][j] < b) {
        dp[i][j] = b;
        return true;
    }
    return false;
}
// 動的計画法(小さい方を返す)
function chmin(a, b) {
    if (a > b) {
        a = b;
        return true;
    }
    return false;
}
function main() {
    // ここに処理を記述していく。
    /*
    let [N] = nextNums(1);
  
    let A1 = nextNums(N);
    let A2 = nextNums(N);
  
    let result = 0;
    let count = 0;
    let sums: number[] = [];
    // 回答1
    for (let i = 1; i <= 2; i++) {
      for (let j = 0; j < N; ++j) {
        for (let k = 0; k < N; ++k) {
          if (k === j) {
            count += A1[k] + A2[k];
          } else if (k > j) {
            count += A2[k];
          } else {
            count += A1[k];
          }
        }
        sums.push(count);
        count = 0;
      }
    }
  */
    // 回答2
    /*
    sums = [];
    count = 0;
  
    for (let i = 0; i < N; ++i) {
      for (let j = 0; j <= i; ++j) {
        count += A1[j];
      }
  
      for (let k = i; k < N; ++k) {
        count += A2[k];
      }
      sums.push(count);
      count = 0;
    }
  
      result = sums.sort(sortDesc)[0];
    */
    /*　回答3:DPしようとしたけど謎だった
    let [N] = nextNums(1);
    let A1 = nextNums(N);
    let A2 = nextNums(N);
    let A: number[][] = [];
    A.push(A1);
    A.push(A2);
  
    let dp = A;
    console.log(dp);
  
    for (let y = 0; y < 2; ++y) {
      for (let x = 0; x < N; ++x) {
        if (x !== 0) chmax(dp, y, x, dp[y][x - 1] + A[y][x]);
        if (y !== 0) chmax(dp, y, x, dp[y - 1][x] + A[y][x]);
      }
    }
  
    console.log(dp);
  
    println(dp[1][N - 1]);
    */
}
//# sourceMappingURL=C_Candies.js.map