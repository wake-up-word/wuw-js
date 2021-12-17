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
var window = window || null;
const _global = (window || global) as any;

_global.idof = _idof;
_global.StaticArray = StaticArray;
