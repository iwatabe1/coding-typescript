import { createInterface } from 'readline';
import * as fs from 'fs';
import { isNumberObject } from 'util/types';

interface Vector {
  x: number;
  y: number;
  // description: number; //座標、ベクトル
}

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

// bit探索
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

// 深さ優先探索:汎用
function commonDfs(graph: Vector[], v: number, seen: boolean[]) {
  seen[v] = true; // vを訪問済とする

  // v から行ける各頂点 next_v について
  for (const [key, value] of Object.entries(graph[v])) {
    if (seen[value]) continue;
    commonDfs(graph, value, seen);
  }
}

function main() {
  let [N, Q] = nextNums(2);
  // let graph: number[][] = Array.from({ length: N }, () => []);
  let graph: number[][] = Array.from({ length: N }, () => []);

  // edges of tree:枝のグラフを生成する
  for (let i = 0; i < N - 1; ++i) {
    let [a, b] = nextNums(2);
    graph[a - 1].push(b - 1); // 子
    graph[b - 1].push(a - 1); // 親
  }

  // operation : 最初に現れる要素(p)にxを加算する。
  const val: number[] = Array(N).fill(0);
  for (let j = 0; j < Q; j++) {
    let [p, x] = nextNums(2);
    val[p - 1] += x; // 0から開始した要素にする
  }

  // Stackへのvalの出し入れを行う
  // 再帰関数による処理は上限に引っかかる為。
  function thisDfs(s: number) {
    const stack: number[][] = [];
    stack.push([s, -1]);

    // 枝に紐づく枝を再帰的に処理する
    while (stack.length) {
      const [edge, parent] = stack.pop() as number[];
      graph[edge].forEach((to) => {
        if (to !== parent) {
          val[to] += val[edge];
          stack.push([to, edge]);
        }
      });
    }
  }

  thisDfs(0);
  /* 再帰関数を使用するとTypeScriptの上限に引っ掛かりエラーとなる
  // 頂点v。p:vの親。res:根から頂点までの x の値の総和
  function thisDfs(edge: number, parent: number, res: number[]) {
    if (parent != -1) res[edge] += res[parent];

    // edge から行ける各頂点 value の操作
    for (const value of Object.values(graph[edge])) {
      if (value === parent) continue;
      thisDfs(value, edge, res);
    }
  }
*/
  print(`${val.join(' ')}`);
}
