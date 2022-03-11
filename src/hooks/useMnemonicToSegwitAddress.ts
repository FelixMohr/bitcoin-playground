import { useMemo } from 'react';
import { mnemonicToSeedSync } from 'bip39';
import { networks, bip32, payments } from 'bitcoinjs-lib';
import { pathValid } from '../services/paths';

export const useMnemonicToSegwitAddress = (
  mnemonic: string,
  path: string,
  onError: (error: string) => void
) => {
  const address = useMemo(() => {
    if (!pathValid(path)) {
      onError(`Invalid path: ${path}`);
      return '';
    } else if (!mnemonic) {
      onError('Mnemonic seed missing');
      return '';
    }
    const bitcoinNetwork = networks.bitcoin;
    try {
      const seed = mnemonicToSeedSync(mnemonic);
      const node = bip32.fromSeed(seed, bitcoinNetwork);
      const child = node.derivePath(path);
      const publicKey = child.publicKey;
      const address = payments.p2wpkh({ pubkey: publicKey }).address ?? '';
      if (!address) {
        onError('Unable to generate address');
        return '';
      } else {
        onError('');
        return address;
      }
    } catch (e) {
      onError(`${e}`);
      return '';
    }
  }, [mnemonic, path, onError]);

  return address;
};
