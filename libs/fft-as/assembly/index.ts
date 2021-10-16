// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
    return a + b;
}

/**
 * FFT based on Cooley–Tukey algorithm
 */
export function fft(x: f64[]) {
    const X: f64[] = [];
    const N = x.length;

    if (N == 1) {
        X[0] = x[0];
    } else {
        const evens_x: f64[] = [];
        const odds_x: f64[] = [];
        x.forEach((v, i) => {
            if (i % 2 == 0) {
                evens_x.push(v);
            } else {
                odds_x.push(v);
            }
        });

        const evens_X = fft(evens_x);
        const odds_X = fft(odds_x);

        for (let k = 0; k < N / 2 - 1; k++) {
            const p = X[k];
            const q = Math.exp()
        }
    }

    return X;
}