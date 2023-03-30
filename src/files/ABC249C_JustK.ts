import { createInterface } from 'readline';
import * as fs from 'fs';
import * as std from 'tstl';
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

// 最小公倍数
function lcm(a: number, b: number): any {
  return (a * b) / gcd(a, b);
}

// 大きい方を返す:変数名はdpで引数を渡す
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

// 小さい方を返す:変数名はdpで引数を渡す
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

// 順列全探索
function nextPermutation(arr: number[]) {
  const len = arr.length;
  let left = len - 2;
  while (left >= 0 && arr[left] >= arr[left + 1]) left--;
  if (left < 0) return false;
  let right = len - 1;
  while (arr[left] >= arr[right]) right--;
  {
    const t = arr[left];
    arr[left] = arr[right];
    arr[right] = t;
  }
  left++;
  right = len - 1;
  while (left < right) {
    {
      const t = arr[left];
      arr[left] = arr[right];
      arr[right] = t;
    }
    left++;
    right--;
  }
  return true;
}

// bitcount:2進数で1の数を数える
function bitCount(n: number) {
  n = n - ((n >> 1) & 0x55555555);
  n = (n & 0x33333333) + ((n >> 2) & 0x33333333);
  return (((n + (n >> 4)) & 0xf0f0f0f) * 0x1010101) >> 24;
}

function main() {
  let [N, K] = nextNums(2);
  let S = nexts(N);
  let ans = 0;

  // bit全探索により、Sの各文字列が 1 or 0 の全探索をする
  for (let i = 0; i < 1 << N; ++i) {
    // 英小文字(a~z)を26文字の数字として格納する為の配列
    let sum: number[] = Array(26).fill(0);

    // Sの内、1 となっている文字列の場合処理を行う。
    // j は1となっているかどうかの判定の為に使う。
    for (let j = 0; j < N; ++j) {
      if ((i >> j) & 1) {
        // Sの対象文字列の内の文字を1つずつ、sumの対応する添え字に1を加えていく。
        S[j].split('').forEach((v) => (sum[v.charCodeAt(0) - 97] += 1));
      }
    }

    // アルファベット毎に文字数がKと一致すればカウントする
    let cnt = 0;
    for (let su of sum) {
      if (su === K) cnt++;
    }
    ans = Math.max(ans, cnt);
  }

  print(ans);
}
