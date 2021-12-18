
import * as myModule from '../src/index';

console.log(myModule);
myModule.instantiate().then(exports => {
    console.log("init");
    const LENGTH = 512;
    const FREQUENCY = 20;
    const samples = Array.from(Array(LENGTH).keys())
        .map(x => Math.sin(x * FREQUENCY));

    console.log(samples);
    const result = exports.window(samples, myModule.Window.Hamming);
    console.log(result);
    console.log("ok");
});