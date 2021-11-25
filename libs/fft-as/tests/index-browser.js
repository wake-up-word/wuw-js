

module.exports = {
    'Test 1': function () {
        import myModule from '../dist/index.js';
        console.log(myModule)
        const LENGTH = 512;
        const FREQUENCY = 20;
        const samples = Array.from(Array(LENGTH).keys())
            .map(x => Math.sin(x * FREQUENCY))
            .concat(new Array(LENGTH).fill(0))

        console.log(samples);

        // fs.writeFileSync('./samples.txt', samples.join('\n'))


        const result = myModule.fft(samples);

        // fs.writeFileSync('./result.txt', result.join('\n'))

        // assert.strictEqual(myModule.fft(samples), 3);
        console.log("ok");

    },
}