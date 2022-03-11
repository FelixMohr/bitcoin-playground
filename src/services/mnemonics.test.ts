import { getMnemonic, validateMnemonicWord } from './mnemonics';
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

describe('validateMnemonicWord', () => {
  it('should detect valid word', () => {
    const valid = validateMnemonicWord('engine');
    expect(valid).toBeTruthy();
  });

  it('should detect invalid word', () => {
    const valid = validateMnemonicWord('abcdefg');
    expect(valid).toBeFalsy();
  });
});
