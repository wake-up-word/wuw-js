/**
 * Complex f64 vector.
 * [Real, Imaginary]
 */
type cf64 = StaticArray<f64>;

/**
 * Create complex number (tuple: [Real, Imaginary])
 */
export function complex(r: f64, i: f64): cf64 {
    return StaticArray.fromArray([r, i]);
}

export function add(a: cf64, b: cf64): cf64 {
    return StaticArray.fromArray([a[0] + b[0], a[1] + b[1]]);
};

export function subtract(a: cf64, b: cf64): cf64 {
    return StaticArray.fromArray([a[0] - b[0], a[1] - b[1]]);
};

export function multiply(a: cf64, b: cf64): cf64 {
    return StaticArray.fromArray([
        (a[0] * b[0] - a[1] * b[1]),
        (a[0] * b[1] + a[1] * b[0])
    ]);
};

/**
 * e^ix
 * https://en.wikipedia.org/wiki/Euler%27s_formula
 */
export function exp(x: f64): cf64 {
    return StaticArray.fromArray([Math.cos(x), Math.sin(x)]);
}