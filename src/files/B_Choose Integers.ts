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

function main() {
  // ここに処理を記述していく。
  let [A, B, C] = nextNums(3);

  let result = '';
  let bool = false;

  // CがAとBの最大公約数の倍数であるという問題
  // パターン1：愚直にA<=A*BにCが一致するかを調べる
  for (let i = 1; i < A * B; ++i) {
    if ((i * A) % B === C) {
      bool = true;
      break;
    }
  }
  // パターン2：AとBの最大公約数の倍数がCであることを調べる。
  if (C % gcd(A, B) !== 0) bool = false;

  result = bool ? 'YES' : 'NO';

  println(result);
}
