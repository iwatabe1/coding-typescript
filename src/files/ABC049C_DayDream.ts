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

function reverseString(str: string) {
  return str.split('').reverse().join('');
}

function main() {
  // ここに処理を記述していく。
  let S = next();
  let candidates = ['dream', 'dreamer', 'erase', 'eraser'];

  let result = '';

  // Sを反転させる
  const reversedS = reverseString(S);
  let can = true;

  // candidatesを反転させる
  for (let i = 0; i < 4; ++i) {
    candidates[i] = reverseString(candidates[i]);
  }

  // 反転させたSを繰り返し、端から切っていく
  for (let i = 0; i < reversedS.length; ) {
    let can2 = false; //4種の文字列のどれかでdivideできるかする。
    for (let j = 0; j < 4; ++j) {
      let compStr = candidates[j];
      if (reversedS.substring(i, i + compStr.length) === compStr) {
        // divide出来るか
        can2 = true;
        i += compStr.length; // divide出来たらiを進める
        break;
      }
    }
    if (!can2) {
      // どの文字列でもdivide出来なかったら
      can = false;
      break;
    }
  }

  result = can ? 'YES' : 'NO';

  println(result);
}
