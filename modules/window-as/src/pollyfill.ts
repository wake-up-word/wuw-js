// Polyfill for compiling AssemblyScript into javascript
type f64 = number;

// https://stackoverflow.com/a/47741462
function _idof<T>() { };

class StaticArray<T> extends Array {
    static fromArray(array: number[]) {
        return array;
    }
}

// Global declaration
declare var idof: typeof _idof;

// Global scope augmentation
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis
const _global = (() => {
    if (typeof self !== 'undefined') { return self; }
    if (typeof window !== 'undefined') { return window; }
    if (typeof global !== 'undefined') { return global; }
    throw new Error('unable to locate global object');
})() as any;

_global.idof = _idof;
_global.StaticArray = StaticArray;