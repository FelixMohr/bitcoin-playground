import React from 'react';
import { useMultisignatureAddress } from '../../hooks/useMultisignatureAddress';

type Props = {
  m: number;
  addresses: string[];
  onError: (error: string) => void;
};

export default function Multisig({ m, addresses, onError }: Props) {
  const address = useMultisignatureAddress(m, addresses, onError);

  return <>{address}</>;
}
