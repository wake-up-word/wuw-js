const assert = require("assert");
const myModule = require("..");

const fs = require('fs');

const { __pin, __unpin, __getArray, __newArray } = myModule;

const LENGTH = 512;
const FREQUENCY = 20;
const samples = Array.from(Array(LENGTH).keys())
    .map(x => Math.sin(x * FREQUENCY))
    .concat(new Array(LENGTH).fill(0))

// console.log(samples);

fs.writeFileSync('./samples.txt', samples.join('\n'))


// Create a new array in WebAssembly and get a reference to it. Note that
// the array is not reachable from within WebAssembly, only externally, so
// we should pin it to prevent it from becoming garbage collected too early.
let arrayPtr = __pin(__newArray(myModule.Float64Arrayy_ID, samples))
console.log(`Array pointer: ${arrayPtr}`)

// Log its elements to make sure these are zero
// console.log('Initial values: ' + __getArray(arrayPtr))
const resultPtr = myModule.fft(arrayPtr);
const result = __getArray(resultPtr);

fs.writeFileSync('./result.txt', result.join('\n'))

// assert.strictEqual(myModule.fft(samples), 3);
console.log("ok");
