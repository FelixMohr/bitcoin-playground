import { useMemo } from 'react';
import { mnemonicToSeedSync } from 'bip39';
import { networks, bip32, payments } from 'bitcoinjs-lib';

// for testing that a path applies to SegWit "bc1" addresses with P2WPKH
const pathRegex = /m\/84'\/0'\/\d+'\/\d+/;

export const useMnemonicToSegwitAddress = (
  mnemonic: string,
  path: string,
  onError: (error: string) => void
) => {
  const address = useMemo(() => {
    if (!pathRegex.test(path)) {
      onError(`Invalid path: ${path}`);
      return '';
    } else if (!mnemonic) {
      onError('Mnemonic seed missing');
      return '';
    }
    const bitcoinNetwork = networks.bitcoin;
    const seed = mnemonicToSeedSync(mnemonic);
    const node = bip32.fromSeed(seed, bitcoinNetwork);
    const child = node.derivePath(path);
    const publicKey = child.publicKey;
    const address = payments.p2wpkh({ pubkey: publicKey }).address ?? '';
    if (!address) {
      onError('Unable to generate address');
      return '';
    } else {
      return address;
    }
  }, [mnemonic, path, onError]);

  return address;
};
