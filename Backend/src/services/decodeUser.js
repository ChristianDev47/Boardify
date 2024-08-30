import { Base64 } from "js-base64";
import pako from "pako";

export const compressUser = (data) => {
  const compressed = pako.deflate(JSON.stringify(data));
  const compressedArray = Array.from(compressed);
  const compressedString = String.fromCharCode.apply(null, compressedArray);
  return Base64.encode(compressedString);
};

export const decompress = (data) => {
  const decoded = Base64.decode(data);
  const inflated = Uint8Array.from(decoded, (c) => c.charCodeAt(0));
  const decompressed = pako.inflate(inflated);
  const inflatedString = new TextDecoder().decode(decompressed);
  return JSON.parse(inflatedString);
};
