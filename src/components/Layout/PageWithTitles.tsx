import React from 'react';
import DefaultPage from './DefaultPage';

type Props = {
  children: React.ReactNode;
  title: string;
  subtitle?: React.ReactNode;
};

export default function PageWithTitles({ children, title, subtitle }: Props) {
  return (
    <DefaultPage>
      <div className="width-screen text-center text-white mt-16 md:mt-36">
        <div className="animate-fade-in-down cursor-default">
          <h1 className="page-title">{title}</h1>
          {subtitle ? <h2 className="page-subtitle">{subtitle}</h2> : <></>}
        </div>
      </div>
      <div className="text-white mt-8 w-full">{children}</div>
    </DefaultPage>
  );
}
