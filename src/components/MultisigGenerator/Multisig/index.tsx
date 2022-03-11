import { useMultisignatureAddress } from '../../../hooks/useMultisignatureAddress';
import Address from '../../Layout/Address';

type Props = {
  m: number;
  addresses: string[];
  onError?: (error: string) => void;
  text?: string;
  blockExplorerUrl?: string;
};

export default function Multisig({
  m,
  addresses,
  onError,
  text,
  blockExplorerUrl,
}: Props) {
  const address = useMultisignatureAddress(m, addresses, onError);

  return Address({ address, blockExplorerUrl, text });
}
