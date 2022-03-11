import React from 'react';

type Props = {
  address?: string;
  text?: string;
  blockExplorerUrl?: string;
};

export default function Address({ text, blockExplorerUrl, address }: Props) {
  const addressText = blockExplorerUrl ? (
    <a
      className="default-link"
      target="_blank"
      href={`${blockExplorerUrl}/${address}`}
      rel="noreferrer"
    >
      {address}
    </a>
  ) : (
    <>{address}</>
  );
  const content =
    text && address ? (
      <>
        {text} {addressText}
      </>
    ) : (
      <>{addressText}</>
    );

  return content;
}
