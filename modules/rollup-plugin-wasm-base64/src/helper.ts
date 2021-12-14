export const HELPERS_ID = '\0wasmHelpers.js';

export const getHelpersModule = () => `
function _loadWasmBuffer (src) {
  var buf = null;
  var isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

  if (isNode) {
    buf = Buffer.from(src, 'base64');
  } else {
    var raw = globalThis.atob(src);
    var rawLength = raw.length;
    buf = new Uint8Array(new ArrayBuffer(rawLength));
    for(var i = 0; i < rawLength; i++) {
       buf[i] = raw.charCodeAt(i);
    }
  }
  return buf;
}
export { _loadWasmBuffer };
`;
