
import * as myModule from '../src/index';

console.log(myModule);
myModule.instantiate().then(exports => {
    console.log("init");
    const LENGTH = 512;
    const FREQUENCY = 20;
    const samples = Array.from(Array(LENGTH).keys())
        .map(x => Math.sin(x * FREQUENCY))
        .concat(new Array(LENGTH).fill(0))

    console.log(samples);
    const result = exports.fft(samples);
    console.log(result);
    // assert.strictEqual(myModule.fft(samples), 3);
    console.log("ok");
});