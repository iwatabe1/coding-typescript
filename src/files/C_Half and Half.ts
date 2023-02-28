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

function searchBound(array: number[], item: number) {
  let low = 0;
  let high = array.length - 1;
  while (high - low > 1) {
    let midIndex = 0;
    midIndex = Math.floor((low + high) / 2);
    if (item <= array[midIndex]) {
      high = midIndex;
    } else {
      low = midIndex;
    }
  }
  return high;
}

function main() {
  let [A, B, C, X, Y] = nextNums(5);
  let resultSum = 0;
  let maxLength = 10 ** 5 * 2;

  // 全探索
  for (let AB = 0; AB <= maxLength; AB++) {
    let sm = C * AB;

    let x = Math.max(0, X - Math.floor(AB / 2));
    let y = Math.max(0, Y - Math.floor(AB / 2));

    sm += x * A;
    sm += y * B;

    if (!resultSum) resultSum = sm; // 初回はresultSumが0となってしまう為

    resultSum = Math.min(resultSum, sm); //小さい方
  }

  // 場合分けだが、非効率
  /*
  if ((A + B) / 2 > C) {
    if (A > C * 2 && B > C * 2) {
      resultSum += X >= Y ? X * C * 2 : Y * C * 2;
    } else {
      if (X > Y) {
        resultSum += Y * C * 2;
        if ((X - Y) * A < (X - Y) * C * 2) {
          resultSum += (X - Y) * A;
        } else {
          resultSum += (X - Y) * C * 2;
        }
      } else if (X < Y) {
        resultSum += X * C * 2;
        if ((Y - X) * B < (Y - X) * C * 2) {
          resultSum += (Y - X) * B;
        } else {
          resultSum += (Y - X) * C * 2;
        }
      } else {
        resultSum += Y * C * 2;
      }
    }
  } else {
    resultSum += A * X + B * Y;
  }
  */

  print(resultSum);
}
