/// <reference types="node"  />
import * as myModule from '../';
import * as fs from 'fs';

myModule.instantiate().then(exports => {
    console.log("init");
    const LENGTH = 512;
    const FREQUENCY = 20;
    const samples = Array.from(Array(LENGTH).keys())
        .map(x => Math.sin(x * FREQUENCY));

    fs.writeFileSync('./samples.txt', samples.join('\n'))

    const result = exports.window(samples, myModule.Window.Hamming);
    console.log(result);

    fs.writeFileSync('./result.txt', result.join('\n'))

    console.log("ok");
});