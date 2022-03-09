import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import SegWit from './index';

describe('SegWit', () => {
  let container: HTMLDivElement | null;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    const containerDiv = container as HTMLDivElement;
    unmountComponentAtNode(containerDiv);
    containerDiv.remove();
    container = null;
  });

  it('should generate correct address for seed/path 1', () => {
    act(() => {
      let error = false;
      render(
        <SegWit
          mnemonic={
            'convince engine viable witness muscle private car flee always avocado silk oval'
          }
          path={"m/84'/0'/0'/0/0"}
          onError={function (): void {
            error = true;
          }}
        />,
        container
      );
      expect(error).toBeFalsy();
      // expected value from https://iancoleman.io/bip39/
      expect(container?.innerHTML).toEqual(
        'bc1qk2p759etalxtg9z64tf9ngjcpcu766404hwvun'
      );
    });
  });

  it('should generate correct address for seed/path 2', () => {
    act(() => {
      let error = false;
      render(
        <SegWit
          mnemonic={
            'convince engine viable witness muscle private car flee always avocado silk oval'
          }
          path={"m/84'/0'/0'/0/11"}
          onError={function (): void {
            error = true;
          }}
        />,
        container
      );
      expect(error).toBeFalsy();
      // expected value from https://iancoleman.io/bip39/
      expect(container?.innerHTML).toEqual(
        'bc1qntar0tpal8fx9nflr2uw6r42lvyvh6spggkhm5'
      );
    });
  });

  it('should detect invalid path', () => {
    act(() => {
      let error = '';
      render(
        <SegWit
          mnemonic={
            'convince engine viable witness muscle private car flee always avocado silk oval'
          }
          path={"m/84'/a'/b'/c/d"}
          onError={(e) => {
            error = e;
          }}
        />,
        container
      );
      expect(error.startsWith('Invalid path')).toBeTruthy();
    });
  });
});
