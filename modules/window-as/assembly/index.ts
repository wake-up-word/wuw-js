/**
 * Rectangular Window
 * https://en.wikipedia.org/wiki/Window_function#Rectangular_window_applications
 */
export function applyRectangularWindow(x: Float64Array): Float64Array {
    const N = x.length;
    const coeffs = new Float64Array(N);
    generateRectangularWindowCoeffs(coeffs);
    return window(x, coeffs);
}

/**
 * Hamming Window
 * https://en.wikipedia.org/wiki/Window_function#Hann_and_Hamming_windows
 */
 export function applyHammingWindow(x: Float64Array): Float64Array {
    const N = x.length;
    const coeffs = new Float64Array(N);
    generateHammingWindowCoeffs(coeffs);
    return window(x, coeffs);
}

/**
 * Apply window coeffs to samples
 * @param x Samples
 * @param coeffs window coeffs
 */
export function window(x: Float64Array, coeffs: Float64Array): Float64Array {
    const N = x.length;
    const X = new Float64Array(N);

    for (let i = 0; i < N; i++) {
        X[i] = coeffs[i] * x[i];
    }
    return X;
}

/**
 * Generate Rectangular Window Coefficients
 * https://en.wikipedia.org/wiki/Window_function#Rectangular_window_applications
 * @param coeffs - Pass by reference.
 */
 export function generateRectangularWindowCoeffs(coeffs: Float64Array): void {
    for (let i = 0; i < coeffs.length; i++) {
        coeffs[i] = 1;
    }
}

/**
 * Generate Hamming Window Coefficients
 * https://en.wikipedia.org/wiki/Window_function#Hann_and_Hamming_windows
 * @param coeffs - Pass by reference.
 */
export function generateHammingWindowCoeffs(coeffs: Float64Array): void {
    const a0: f64 = 0.54;
    const a1: f64 = 1 - a0;
    const baseAngle: f64 = 2 * Math.PI / (coeffs.length - 1);
    for (let i = 0; i < coeffs.length; i++) {
        coeffs[i] = a0 - a1 * Math.cos(i * baseAngle);
    }
}

// Unique Float64Array id when allocating in JavaScript
export const Float64Arrayy_ID = idof<Float64Array>();