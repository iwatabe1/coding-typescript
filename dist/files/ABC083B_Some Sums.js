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
// ???????????????
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
function findSumOfDigit(num) {
    let sum = 0;
    while (num > 0) {
        sum += num % 10;
        num = Math.floor(num / 10);
    }
    return sum;
}
function main() {
    // ???????????????????????????????????????
    let [N, A, B] = nextNums(3);
    let result = 0;
    for (let i = 1; i <= N; i++) {
        const nums = Array.from(String(i), Number);
        let sum = 0;
        nums.map((num) => {
            sum += num;
        });
        if (sum >= A && sum <= B) {
            result += i;
        }
    }
    /* ?????????
    for (let i = 1; i < N; ++i) {
      let sum = 0;
      sum += findSumOfDigit(i);
      if (sum >= A && sum <= B){
        result += i
      }
    }
    */
    println(`${result}`);
}
//# sourceMappingURL=ABC083B_Some%20Sums.js.map