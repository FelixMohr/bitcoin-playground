import React, { useState } from 'react';
import { mnemonicWordComplete } from '../../services/mnemonics';

type Props = {
  id: number;
  value: string;
  onChange: (val: string, id: number) => void;
};

export default function MnemonicWordInput({ id, value, onChange }: Props) {
  const [valid, setValid] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const [valid, completeWord] = mnemonicWordComplete(newValue);
    onChange(completeWord || newValue, id);
    if (completeWord) {
      const nextSibling =
        (document.querySelector(
          `input[name=word-${id + 1}]`
        ) as HTMLInputElement) || null;
      if (nextSibling) {
        nextSibling.focus();
      }
    }
    setValid(valid || !!completeWord || !newValue);
  };

  return (
    <input
      placeholder={`${id + 1}.`}
      name={`word-${id}`}
      value={value}
      onChange={handleChange}
      className={`default-input ${
        valid ? 'outline-gray-600 bg-gray-200' : 'outline-red-600 bg-red-200'
      }`}
    />
  );
}
