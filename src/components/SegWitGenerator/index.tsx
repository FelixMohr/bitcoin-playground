import { validateMnemonic } from 'bip39';
import React, { useMemo, useState } from 'react';
import { getMnemonic, validateMnemonicWord } from '../../services/mnemonics';
import { pathValid } from '../../services/paths';
import PageWithTitles from '../Layout/PageWithTitles';
import MnemonicWordInput from './MnemonicWordInput';
import SegWit from './SegWit';

type SubtitleProps = {
  getRandomWords: () => void;
};

type PathProps = {
  value: string;
  onChange: (val: string) => void;
};

const Subtitle = ({ getRandomWords }: SubtitleProps) => {
  return (
    <>
      Enter your seed phrase or{' '}
      <a onClick={getRandomWords} className="default-link">
        {' '}
        generate
      </a>{' '}
      a random seed.
    </>
  );
};

const Path = ({ value, onChange }: PathProps) => {
  const invalid = useMemo(() => {
    return !pathValid(value);
  }, [value]);

  return (
    <>
      <h2 className="page-subtitle">Address Path</h2>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`default-input m-2 ${
          !invalid
            ? 'outline-gray-600 bg-gray-200'
            : 'outline-red-600 bg-red-200'
        }`}
      />
    </>
  );
};

function GeneratedAddress(path: string, combinedString: string) {
  return (
    <div className="generated-value-container">
      <h2 className="page-subtitle">
        <SegWit
          text="Generated SegWit address:"
          mnemonic={combinedString}
          blockExplorerUrl="https://www.blockchain.com/btc/address"
          path={path}
          onError={(error: string) => error && console.error(error)}
        />
      </h2>
    </div>
  );
}

export default function SegWitGenerator() {
  const [seed, setSeed] = useState<string[]>(Array(12).fill(''));
  const [path, setPath] = useState("m/84'/0'/0'/0/0");
  const combinedString = useMemo(() => seed.join(' '), [seed]);
  const seedValid = validateMnemonic(combinedString);
  const complete = seed.filter((s) => validateMnemonicWord(s)).length === 12;

  const getRandomWords = () => {
    setSeed(getMnemonic());
  };

  const changeWord = (val: string, index: number) => {
    setSeed((seed) => seed.map((word, i) => (i === index ? val : word)));
  };

  return (
    <PageWithTitles
      title="SegWit Address Generator"
      subtitle={Subtitle({ getRandomWords })}
    >
      <div
        className={`text-center max-w-screen-md mx-auto border-2  p-4 rounded-lg ${
          complete
            ? !seedValid
              ? 'border-red-400'
              : 'border-indigo-400'
            : 'border-transparent'
        }`}
      >
        {[...Array(12)].map((_, i) => (
          <MnemonicWordInput
            key={i}
            id={i}
            value={seed[i]}
            onChange={changeWord}
          />
        ))}
      </div>
      <div className="mt-4 p-4 text-center max-w-screen-md mx-auto">
        {seedValid ? (
          <>
            <Path value={path} onChange={setPath} />
            {GeneratedAddress(path, combinedString)}
          </>
        ) : (
          <></>
        )}
      </div>
    </PageWithTitles>
  );
}
