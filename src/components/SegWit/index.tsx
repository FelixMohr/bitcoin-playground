import React from 'react';
import { useMnemonicToSegwitAddress } from '../../hooks/useMnemonicToSegwitAddress';

type Props = {
  mnemonic: string;
  path: string;
  onError: (error: string) => void;
};

export default function SegWit({ mnemonic, path, onError }: Props) {
  const address = useMnemonicToSegwitAddress(mnemonic, path, onError);

  return <>{address}</>;
}
