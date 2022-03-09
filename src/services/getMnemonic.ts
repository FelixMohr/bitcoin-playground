import { entropyToMnemonic } from 'bip39';

export const getMnemonic = () => {
  const arr = new Uint8Array(16);
  // https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
  // "The Crypto.getRandomValues() method lets you get cryptographically strong random values."
  self.crypto.getRandomValues(arr);
  const hex = Buffer.from(arr);
  const mnemonic = entropyToMnemonic(hex);
  return mnemonic.split(' ');
};
