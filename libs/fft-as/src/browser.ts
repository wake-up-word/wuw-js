// import * as loader from '@assemblyscript/loader';

// import type * as FFTAS from '../build/optimized';

// export async function init() {
//     const imports = { /* any imports go here */ };
//     const wasmModule = await loader.instantiate<typeof FFTAS>(fetch('../build/optimized.wasm'), imports);
//     const { __pin, __unpin, __getArray, __newArray, fft: _fft, Float64Arrayy_ID } = wasmModule.exports;
//     return {
//         fft: (x: number[]): number[] => {
//             const arrayPtr = __pin(__newArray(Float64Arrayy_ID, x));
//             const resultPtr = _fft(arrayPtr);
//             const result = __getArray(resultPtr);
//             __unpin(arrayPtr);
//             return result;
//         }
//     };
// }

import * as loader from '@assemblyscript/loader';

import type * as FFTAS from '../build/optimized';

import myModule from '../build/optimized.wasm';


export async function init() {
    console.log(myModule);
    myModule({}).then(({ instance }: any) => {
        console.log(instance.exports);
    });
    // const imports = { /* any imports go here */ };
    // const wasmModule = await loader.instantiate<typeof FFTAS>(myModule, imports);
    // const { __pin, __unpin, __getArray, __newArray, fft: _fft, Float64Arrayy_ID } = wasmModule.exports;
    // return {
    //     fft: (x: number[]): number[] => {
    //         const arrayPtr = __pin(__newArray(Float64Arrayy_ID, x));
    //         const resultPtr = _fft(arrayPtr);
    //         const result = __getArray(resultPtr);
    //         __unpin(arrayPtr);
    //         return result;
    //     }
    // };
}

