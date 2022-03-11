import { useMnemonicToSegwitAddress } from '../../../hooks/useMnemonicToSegwitAddress';
import Address from '../../Layout/Address';

type Props = {
  mnemonic: string;
  path: string;
  onError: (error: string) => void;
  text?: string;
  blockExplorerUrl?: string;
};

export default function SegWit({
  mnemonic,
  path,
  onError,
  text,
  blockExplorerUrl,
}: Props) {
  const address = useMnemonicToSegwitAddress(mnemonic, path, onError);
  return Address({ address, blockExplorerUrl, text });
}
