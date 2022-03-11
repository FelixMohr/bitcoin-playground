import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function DefaultPage({ children }: Props) {
  return (
    <div className="bg-gray-900 min-w-screen min-h-screen px-2">
      <div className="container mx-auto pt-4 sm:pt-8">{children}</div>
    </div>
  );
}
