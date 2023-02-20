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

// 組み合わせ
const combination = (nums: number[], k: number): number[][] => {
  let ans = [];
  if (nums.length < k) {
    return [];
  }

  if (k === 1) {
    for (let i = 0; i < nums.length; i++) {
      ans[i] = [nums[i]];
    }
  } else {
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

function main() {
  // ここに処理を記述していく。
  let A = nextNum();
  let B = nextNum();
  let C = nextNum();
  let X = nextNum();

  let result = 0;
  for (let i = 0; i <= A; i++) {
    for (let j = 0; j <= B; j++) {
      for (let k = 0; k <= C; k++) {
        if (i * 500 + j * 100 + k * 50 === X) {
          result++;
        }
      }
    }
  }
  println(`${result}`);
}
