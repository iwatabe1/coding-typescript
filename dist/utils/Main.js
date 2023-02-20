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
exports.Main = void 0;
const readline_1 = require("readline");
const fs = __importStar(require("fs"));
let inputs = '';
let inputArray;
let currentIndex = 0;
let outputBuffer = '';
class Main {
    constructor() {
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
                this.main();
                this.flush();
            });
        }
        else {
            inputs = fs.readFileSync('/dev/stdin', 'utf8');
            inputArray = inputs.split(/\s/);
            this.main();
            this.flush();
        }
    }
    next() {
        return inputArray[currentIndex++];
    }
    nextNum() {
        return +this.next();
    }
    nextBigInt() {
        return BigInt(this.next());
    }
    nexts(length) {
        const arr = [];
        for (let i = 0; i < length; ++i)
            arr[i] = this.next();
        return arr;
    }
    nextNums(length) {
        const arr = [];
        for (let i = 0; i < length; ++i)
            arr[i] = this.nextNum();
        return arr;
    }
    nextBigInts(length) {
        const arr = [];
        for (let i = 0; i < length; ++i)
            arr[i] = this.nextBigInt();
        return arr;
    }
    print(out, separator) {
        if (Array.isArray(out)) {
            outputBuffer += out.join(separator);
        }
        else {
            outputBuffer += out;
        }
    }
    println(out, separator) {
        if (Array.isArray(out)) {
            this.print(out, separator || '');
        }
        else {
            this.print(out);
        }
        this.print('\n');
    }
    flush() {
        console.log(outputBuffer);
    }
    main() {
        // ここに処理を記述していく。
    }
}
exports.Main = Main;
//# sourceMappingURL=Main.js.map