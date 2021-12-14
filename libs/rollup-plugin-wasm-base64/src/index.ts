import * as fs from 'fs';

import { Plugin } from 'rollup';

import { getHelpersModule, HELPERS_ID } from './helper';

export interface RollupWasmOptions {}

export function wasm(options: RollupWasmOptions = {}): Plugin {
    const { } = options;
    const copies = Object.create(null);

    return {
        name: 'wasm',

        resolveId(id) {
            if (id === HELPERS_ID) {
                return id;
            }

            return null;
        },

        load(id) {
            if (id === HELPERS_ID) {
                return getHelpersModule();
            }

            if (!/\.wasm$/.test(id)) {
                return null;
            }

            return Promise.all([fs.promises.stat(id), fs.promises.readFile(id)]).then(
                ([stats, buffer]) => {
                    return buffer.toString('binary');
                }
            );
        },

        transform(code, id) {
            if (code && /\.wasm$/.test(id)) {
                let src = Buffer.from(code, 'binary').toString('base64');
                    src = `'${src}'`;
                return {
                    map: {
                        mappings: ''
                    },
                    code: `import { _loadWasmBuffer } from ${JSON.stringify(HELPERS_ID)};
export default function(){return _loadWasmBuffer(${src})};
`
                };
            }
            return null;
        },
        generateBundle: async function write() {
            await Promise.all(
                Object.keys(copies).map(async (name) => {
                    const copy = copies[name];

                    this.emitFile({
                        type: 'asset',
                        source: copy.buffer,
                        name: 'Rollup WASM Asset',
                        fileName: copy.filename
                    });
                })
            );
        }
    };
}

export default wasm;
