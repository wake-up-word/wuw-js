# fft-as
WebAssembly FFT based on [Cooley–Tukey algorithm](https://en.wikipedia.org/wiki/Cooley%E2%80%93Tukey_FFT_algorithm).

## Usage/Example

FFT of 20hz sine wave
```typescript
import { instantiate } from 'fft-as';

// Load library and wasm
instantiate().then(exports => {
    // Generate 512 samples of 20hz sine wave
    const LENGTH = 512;
    const FREQUENCY = 20;
    const samples = Array.from(Array(LENGTH).keys())
        .map(x => Math.sin(x * FREQUENCY))
        .concat(new Array(LENGTH).fill(0));

    // Compute FFT
    const result = exports.fft(samples);
    console.log(result);
});
```
