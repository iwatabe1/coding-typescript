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
function main() {
    // ここに処理を記述していく。
    let [H, W] = nextNums(2);
    let S = [];
    for (let i = 0; i < H; ++i) {
        S.push(next().split(''));
    }
    // 空きマス(.)の探索と周囲の#を数える。数えた数字を(.)と置き換える。
    for (let i = 0; i < H; ++i) {
        for (let j = 0; j < W; ++j) {
            if (S[i][j] === '.') {
                let countBoms = 0;
                if (i > 0 && j > 0 && S[i - 1][j - 1] === '#')
                    ++countBoms;
                if (i > 0 && S[i - 1][j] === '#')
                    ++countBoms;
                if (i > 0 && j < W - 1 && S[i - 1][j + 1] === '#')
                    ++countBoms;
                if (j > 0 && S[i][j - 1] === '#')
                    ++countBoms;
                if (j < W - 1 && S[i][j + 1] === '#')
                    ++countBoms;
                if (i < H - 1 && j > 0 && S[i + 1][j - 1] === '#')
                    ++countBoms;
                if (i < H - 1 && S[i + 1][j] === '#')
                    ++countBoms;
                if (i < H - 1 && j < W - 1 && S[i + 1][j + 1] === '#')
                    ++countBoms;
                S[i][j] = String(countBoms);
            }
        }
    }
    let result = [];
    for (let i = 0; i < H; ++i) {
        result.push(S[i].join(''));
    }
    println(result.join('\n'));
}
//# sourceMappingURL=B_Minesweeper.js.map