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
// 最大公約数
function gcd(a: number, b: number): any {
  if (b === 0) return a;
  else return gcd(b, a % b);
}

// 動的計画法(大きい方を返す):変数名はdpで引数を渡す
function chmax(dp: number[][], i: number, j: number, b: number) {
  if (dp[i][j] < b) {
    dp[i][j] = b;
    return true;
  }
  return false;
}

function chmax1(dp: number[], i: number, b: number) {
  if (dp[i] < b) {
    dp[i] = b;
    return true;
  }
  return false;
}

function chmax2(dp: number, b: number) {
  if (dp < b) {
    dp = b;
    return true;
  }
  return false;
}

// 動的計画法(小さい方を返す):変数名はdpで引数を渡す
function chmin(dp: number[][], i: number, j: number, b: number) {
  if (dp[i][j] > b) {
    dp[i][j] = b;
    return true;
  }
  return false;
}

function chmin1(dp: number[], i: number, b: number) {
  if (dp[i] > b) {
    dp[i] = b;
    return true;
  }
  return false;
}

function chmin2(dp: number, b: number) {
  if (dp > b) {
    dp = b;
    return true;
  }
  return false;
}

function main() {
  let N = nextNum();
  let S = next().split('');

  let countW: number[] = [];
  let countE: number[] = [];

  // WとEを存在する場合1、しない場合0で配列に格納する
  for (let i = 0; i < N; ++i) {
    if (S[i] === 'W') {
      countW.push(1);
      countE.push(0);
    } else {
      countW.push(0);
      countE.push(1);
    }
  }

  // 存在するWとEの累積和を取得する
  for (let i = 1; i < N; ++i) {
    countW[i] += countW[i - 1];
    countE[i] += countE[i - 1];
  }

  // インデックス毎に最小値を取得
  let dp = N;
  /*
  for (let i = 0; i < N; ++i) {
    let sum = 0;
    if (i !== 0) sum += countW[i - 1]; // iより左にいるWの数
    sum += countE[N - 1] - countE[i]; // iより右にいるEの数
    if (dp > sum) dp = sum;
  }
  */

  // インデックス毎に最小値を取得
  for (let i = 0; i < N; ++i) {
    let sum = 0;
    if (i !== 0) sum += countW[i - 1]; // iより左にいるWの数
    sum += countE[N - 1] - countE[i]; // iより右にいるEの数
    if (chmin2(dp, sum)) dp = sum;
  }

  println(dp);
}
