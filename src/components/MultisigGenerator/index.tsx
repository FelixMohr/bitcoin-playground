import React, { useEffect, useMemo, useState } from 'react';
import PageWithTitles from '../Layout/PageWithTitles';
import Multisig from './Multisig';

type MultisigParams = {
  m: string;
  n: string;
};

const getSubtitle = () => {
  return <>Enter parameters and addresses.</>;
};

function GeneratedAddress(m: number, addresses: string[]) {
  return (
    <div className="generated-value-container">
      <h2 className="page-subtitle">
        <Multisig
          m={m}
          addresses={addresses}
          text="Generated address: "
          blockExplorerUrl="https://www.blockchain.com/btc/address"
        />
      </h2>
    </div>
  );
}

const maxNAddresses = 5;

export default function MultisigGenerator() {
  const [multisigParams, setMultisigParams] = useState<MultisigParams>({
    m: '2',
    n: '3',
  });
  const [addresses, setAddresses] = useState<string[]>([]);
  const [m, n] = useMemo(() => {
    const m = parseInt(multisigParams.m) || 0;
    let n = parseInt(multisigParams.n) || 0;
    if (n > maxNAddresses) n = 0;
    return [m, n];
  }, [multisigParams]);
  useEffect(() => {
    if (n !== addresses.length) {
      setAddresses((addresses) => {
        if (n < addresses.length) {
          return addresses.slice(0, n);
        }
        return addresses.concat([...Array(n - addresses.length)].map(() => ''));
      });
    }
  }, [addresses.length, n]);

  return (
    <PageWithTitles title="Multisig Address Generator" subtitle={getSubtitle()}>
      <div className="max-w-3xl mx-auto pb-8">
        <div className="grid grid-cols-3 gap-6">
          <input
            type="number"
            placeholder={'n'}
            className={`full-input ${
              (n >= 0 && parseInt(multisigParams.n) <= maxNAddresses) ||
              !multisigParams.n
                ? 'outline-gray-600 bg-gray-200'
                : 'outline-red-600 bg-red-200'
            }`}
            value={multisigParams.n}
            onChange={(n) =>
              setMultisigParams((params) => {
                return { ...params, n: n.target.value };
              })
            }
          />
          <input
            type="number"
            placeholder={'m'}
            className={`full-input ${
              (m !== 0 && m <= n) || !multisigParams.m
                ? 'outline-gray-600 bg-gray-200'
                : 'outline-red-600 bg-red-200'
            }`}
            value={multisigParams.m}
            onChange={(m) =>
              setMultisigParams((params) => {
                return { ...params, m: m.target.value };
              })
            }
          />
        </div>
        <div className="grid grid-cols-1 gap-4 mt-4">
          {n > 0 && m <= n ? (
            addresses.map((address, i) => (
              <input
                key={i}
                placeholder={`Address ${i + 1}`}
                className={`full-input`}
                value={address}
                onChange={(e) =>
                  setAddresses((addresses) => {
                    return addresses.map((addr, j) =>
                      i !== j ? addr : e.target.value
                    );
                  })
                }
              />
            ))
          ) : (
            <></>
          )}
        </div>
        {GeneratedAddress(m, addresses)}
      </div>
    </PageWithTitles>
  );
}
