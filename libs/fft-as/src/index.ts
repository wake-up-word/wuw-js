import type * as FFTAS from '../build/optimized';

import fftas from '../build/optimized.wasm';

export function init() {
    console.log('in init!');
    const imports = { /* any imports go here */ };
    return fftas(imports).then(({ instance }: any) => {
        const { __pin, __unpin, __getArray, __newArray, fft, Float64Arrayy_ID } = instance.exports;
        return {
            fft: (x: number[]): number[] => {
                const arrayPtr = __pin(__newArray(Float64Arrayy_ID, x));
                const resultPtr = fft(arrayPtr);
                const result = __getArray(resultPtr);
                __unpin(arrayPtr);
                return result;
            }
        };
    });
}

