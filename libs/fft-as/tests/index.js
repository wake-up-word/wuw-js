/// <reference types="node"  />
console.log("before require");
const myModule = require('../dist/browser.js');
console.log(myModule)
// import * as myModule from '../dist/index.js';
const fs = require('fs');
// import * as fs from 'fs';
console.log("before init");
myModule.init().then(exports => {
    console.log("init");
    const LENGTH = 512;
    const FREQUENCY = 20;
    const samples = Array.from(Array(LENGTH).keys())
        .map(x => Math.sin(x * FREQUENCY))
        .concat(new Array(LENGTH).fill(0))

    // console.log(samples);

    fs.writeFileSync('./samples.txt', samples.join('\n'))


    const result = exports.fft(samples);
    console.log(result);

    fs.writeFileSync('./result.txt', result.join('\n'))

    // assert.strictEqual(myModule.fft(samples), 3);
    console.log("ok");
});
