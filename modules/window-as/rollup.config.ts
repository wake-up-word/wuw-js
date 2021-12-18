import { wasm } from 'rollup-plugin-wasm-base64';
import typescript from '@rollup/plugin-typescript';

export default {
    output: {
        name: 'fft-as',
        file: 'dist/bundle.js',
        format: 'umd',
        sourcemap: 'inline'
    },
    plugins: [
        wasm(),
        typescript(),
    ]
};