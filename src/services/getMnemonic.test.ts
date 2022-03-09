import { getMnemonic } from './getMnemonic';
import { getDefaultWordlist, wordlists, validateMnemonic } from 'bip39';
import crypto from 'crypto';

describe('getMnemonic', () => {
  beforeAll(() => {
    // necessary because tests aren't run in the browser
    Object.defineProperty(global.self, 'crypto', {
      value: {
        getRandomValues: (arr: any) => crypto.randomBytes(arr.length),
      },
    });
  });

  it('should generate a valid mnemonic', () => {
    const mnemonic = getMnemonic();
    expect(mnemonic.length).toEqual(12);
    const words = wordlists[getDefaultWordlist()];
    expect(mnemonic.every((word) => words.includes(word))).toBeTruthy();
    expect(validateMnemonic(mnemonic.join(' '))).toBeTruthy();
  });
});
