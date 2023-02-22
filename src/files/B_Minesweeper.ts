import { createInterface } from 'readline';
import * as fs from 'fs';

let inputs = '';
let inputArray: string[];
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
function nexts(length: number) {
  const arr = [];
  for (let i = 0; i < length; ++i) arr[i] = next();
  return arr;
}
function nextNums(length: number) {
  const arr = [];
  for (let i = 0; i < length; ++i) arr[i] = nextNum();
  return arr;
}
function nextBigInts(length: number) {
  const arr = [];
  for (let i = 0; i < length; ++i) arr[i] = nextBigInt();
  return arr;
}

function print(out: string | number | bigint): void;
function print<T>(out: Array<T>, separator: string): void;
function print<T>(out: string | number | bigint | Array<T>, separator?: string) {
  if (Array.isArray(out)) {
    outputBuffer += out.join(separator);
  } else {
    outputBuffer += out;
  }
}

function println(out: string | number | bigint): void;
function println<T>(out: Array<T>, separator: string): void;
function println<T>(out: string | number | bigint | Array<T>, separator?: string) {
  if (Array.isArray(out)) {
    print(out, separator || '');
  } else {
    print(out);
  }
  print('\n');
}

function flush() {
  console.log(outputBuffer);
}

// デバッグ環境がWindowsであれば条件分岐する
if (process.env.OS == 'Windows_NT') {
  const stream = createInterface({
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
} else {
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
function sortAsc(a: number, b: number) {
  return a - b;
}

/**
 * compare numbers for sort number[] descending
 * @param a
 * @param b
 * @returns number
 */
function sortDesc(a: number, b: number) {
  return b - a;
}
// 文字列反転
function reverseString(str: string) {
  return str.split('').reverse().join('');
}

function main() {
  // ここに処理を記述していく。
  let [H, W] = nextNums(2);
  let S: string[][] = [];
  for (let i = 0; i < H; ++i) {
    S.push(next().split(''));
  }

  // 空きマス(.)の探索と周囲の#を数える。数えた数字を(.)と置き換える。
  for (let i = 0; i < H; ++i) {
    for (let j = 0; j < W; ++j) {
      if (S[i][j] === '.') {
        let countBoms = 0;
        if (i > 0 && j > 0 && S[i - 1][j - 1] === '#') ++countBoms;
        if (i > 0 && S[i - 1][j] === '#') ++countBoms;
        if (i > 0 && j < W - 1 && S[i - 1][j + 1] === '#') ++countBoms;
        if (j > 0 && S[i][j - 1] === '#') ++countBoms;
        if (j < W - 1 && S[i][j + 1] === '#') ++countBoms;
        if (i < H - 1 && j > 0 && S[i + 1][j - 1] === '#') ++countBoms;
        if (i < H - 1 && S[i + 1][j] === '#') ++countBoms;
        if (i < H - 1 && j < W - 1 && S[i + 1][j + 1] === '#') ++countBoms;
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
