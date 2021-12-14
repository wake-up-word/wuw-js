
import * as loader from '@assemblyscript/loader';

import type * as FFTAS from '../build/optimized';
import loadBinary from '../build/optimized.wasm';

let cachedExports: (loader.ASUtil & typeof FFTAS) | null = null;

export async function instantiate() {
    const generateApi = (instance: loader.ASUtil & typeof FFTAS) => {
        const { __pin, __unpin, __getArray, __newArray, fft, Float64Arrayy_ID } = instance;
        return {
            /**
              * FFT based on Cooley–Tukey algorithm
              * First half of x are real parts, second half are imaginary parts.
              * Given N complex numbers contained in x where Real parts are x[0..N] and Imaginary x[N+1..N*2-1]
              * https://en.wikipedia.org/wiki/Cooley%E2%80%93Tukey_FFT_algorithm
              */
            fft: (x: number[]): number[] => {
                const arrayPtr = __pin(__newArray(Float64Arrayy_ID, x));
                const resultPtr = fft(arrayPtr);
                const result = __getArray(resultPtr);
                __unpin(arrayPtr);
                return result;
            },
            /**
             * Direct WASM export reference.
             */
            _fft: fft
        };
    };

    if (cachedExports) {
        return generateApi(cachedExports);
    }

    return loader.instantiate<typeof FFTAS>(loadBinary()).then((instance) => {
        cachedExports = instance.exports;
        return generateApi(cachedExports);
    });
}


