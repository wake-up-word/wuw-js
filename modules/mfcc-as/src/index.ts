import './pollyfill';
import * as loader from '@assemblyscript/loader';

import type * as WINDOWAS from '../build/optimized';
import loadBinary from '../build/optimized.wasm';

import * as fallback from '../assembly/index';

export enum Window {
    Rectangular = 'Rectangular',
    Hamming = 'Hamming'
}

export type API = {
    /**
     * Window Function
     * https://en.wikipedia.org/wiki/Window_function
     */
    window: (x: number[], window: Window) => number[],
    /**
      * Direct WASM export reference.
      */
    _applyRectangularWindow: typeof WINDOWAS.applyRectangularWindow | null,
    _applyHammingWindow: typeof WINDOWAS.applyHammingWindow | null,
    _window: typeof WINDOWAS.window | null
    _generateRectangularWindowCoeffs: typeof WINDOWAS.generateRectangularWindowCoeffs | null,
    _generateHammingWindowCoeffs: typeof WINDOWAS.generateHammingWindowCoeffs | null,
};

let cachedExports: (loader.ASUtil & typeof WINDOWAS) | null = null;
export async function instantiate(): Promise<API> {
    if (!wasmSupported) {
        return {
            window: (x: number[], window: Window): number[] => {
                switch (window) {
                    case Window.Rectangular: {
                        return [...fallback.applyRectangularWindow(Float64Array.from(x))];
                    }
                    case Window.Hamming: {
                        return [...fallback.applyHammingWindow(Float64Array.from(x))];
                    }
                }
            },
            _applyRectangularWindow: null,
            _applyHammingWindow: null,
            _window: null,
            _generateRectangularWindowCoeffs: null,
            _generateHammingWindowCoeffs: null,
        };
    }

    const generateApi = (instance: loader.ASUtil & typeof WINDOWAS) => {
        const { __pin, __unpin, __getArray, __newArray, Float64Arrayy_ID,
            applyRectangularWindow, applyHammingWindow, window, generateRectangularWindowCoeffs, generateHammingWindowCoeffs
        } = instance;
        return {
            window: (x: number[], window: Window): number[] => {
                const arrayPtr = __pin(__newArray(Float64Arrayy_ID, x));
                let resultPtr;
                switch (window) {
                    case Window.Rectangular: {
                        resultPtr = applyRectangularWindow(arrayPtr);
                    }
                    case Window.Hamming: {
                        resultPtr = applyHammingWindow(arrayPtr);
                    }
                }
                const result = __getArray(resultPtr);
                __unpin(arrayPtr);
                return result;
            },
            _applyRectangularWindow: null,
            _applyHammingWindow: null,
            _window: null,
            _generateRectangularWindowCoeffs: null,
            _generateHammingWindowCoeffs: null,
        };
    };

    if (cachedExports) {
        return generateApi(cachedExports);
    }

    return loader.instantiate<typeof WINDOWAS>(loadBinary()).then((instance) => {
        cachedExports = instance.exports;
        return generateApi(cachedExports);
    });
}

// https://stackoverflow.com/a/47880734
const wasmSupported = (() => {
    try {
        if (typeof WebAssembly === "object"
            && typeof WebAssembly.instantiate === "function") {
            const module = new WebAssembly.Module(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00));
            if (module instanceof WebAssembly.Module)
                return new WebAssembly.Instance(module) instanceof WebAssembly.Instance;
        }
    } catch (e) {
    }
    return false;
})();