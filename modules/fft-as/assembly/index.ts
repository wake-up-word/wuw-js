import { add, subtract, multiply, exp, complex } from './complex';

/**
 * FFT based on Cooley–Tukey algorithm
 * First half of x are real parts, second half are imaginary parts.
 * Given N complex numbers contained in x where Real parts are x[0..N] and Imaginary x[N+1..N*2-1]
 * https://en.wikipedia.org/wiki/Cooley%E2%80%93Tukey_FFT_algorithm
 */
export function fft(x: Float64Array): Float64Array {
    if (x.length == 0 || Math.log2(x.length) % 1 !== 0) {
        throw new Error('input length must be a power of 2 and greater than 0');
    }

    return _fft(x);
}

function _fft(x: Float64Array): Float64Array {
    const N = x.length / 2;
    const X = new Float64Array(N * 2);

    if (N == 1) {
        X[0] = x[0];
        X[1] = x[1];
        return X;
    }

    const halfLength = N / 2;
    const evens_x = new Float64Array(halfLength * 2);
    const odds_x = new Float64Array(halfLength * 2);

    for (let i = 0; i < X.length; i += 2) {
        evens_x[i / 2] = x[i];
        odds_x[i / 2] = x[i + 1];
    }

    const evens_X = _fft(evens_x);
    const odds_X = _fft(odds_x);

    for (let k = 0; k < N / 2; k++) {
        const p = complex(evens_X[k], evens_X[k + halfLength]);
        const q = multiply(exp((-2 * Math.PI / N) * k), complex(odds_X[k], odds_X[k + halfLength]));

        const sum = add(p, q);
        X[k] = sum[0];
        X[k + N] = sum[1];

        const difference = subtract(p, q);
        X[k + N / 2] = difference[0];
        X[k + N / 2 + N] = difference[1];
    }

    return X;
}

// Unique Float64Array id when allocating in JavaScript
export const Float64Arrayy_ID = idof<Float64Array>();