function melFilter() {

}

function vlog() {

}

function dct() {

}

function freqToMel(f: f64): f64 {
    return 2595.0 * Math.log10(1.0 + f / 700.0);
}

function melToFreq(mel: f64): f64 {
    return 700.0 * (Math.pow(10, mel / 2595.0) - 1.0);
}

// Unique Float64Array id when allocating in JavaScript
export const Float64Arrayy_ID = idof<Float64Array>();