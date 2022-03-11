import { entropyToMnemonic, getDefaultWordlist, wordlists } from 'bip39';

export const getMnemonic = () => {
  const arr = new Uint8Array(16);
  // https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
  // "The Crypto.getRandomValues() method lets you get cryptographically strong random values."
  self.crypto.getRandomValues(arr);
  const hex = Buffer.from(arr);
  const mnemonic = entropyToMnemonic(hex);
  return mnemonic.split(' ');
};

export const validateMnemonicWord = (word: string) => {
  const words = wordlists[getDefaultWordlist()];
  return words.includes(word);
};

export const mnemonicWordComplete = (word: string): [boolean, string] => {
  const words = wordlists[getDefaultWordlist()];
  const completeWord = words.filter((w) => w.startsWith(word));
  return [
    words.includes(word),
    completeWord.length === 1 ? completeWord[0] : '',
  ];
};
