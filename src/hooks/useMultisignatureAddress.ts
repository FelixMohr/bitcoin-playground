import { useMemo } from 'react';
import { payments } from 'bitcoinjs-lib';

export const useMultisignatureAddress = (
  m: number,
  addresses: string[],
  onError?: (error: string) => void
) => {
  const address = useMemo(() => {
    const n = addresses.length;
    if (m > n) {
      onError && onError('m should be less than/equal n');
      return '';
    } else if (!addresses.length) {
      onError && onError('No signing addresses provided');
      return '';
    }
    try {
      const { address } = payments.p2sh({
        redeem: payments.p2ms({
          m,
          pubkeys: addresses.map((a) => Buffer.from(a, 'hex')),
        }),
      });
      onError && onError('');
      return address;
    } catch (e) {
      console.error(e);
      onError && onError(`${e}`);
      return '';
    }
  }, [addresses, m, onError]);

  return address;
};
