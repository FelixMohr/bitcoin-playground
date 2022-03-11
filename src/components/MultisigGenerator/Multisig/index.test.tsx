import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Multisig from './index';

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

  it('should generate correct multisig address', () => {
    act(() => {
      let error = '';
      render(
        <Multisig
          onError={function (e): void {
            error = e;
          }}
          m={2}
          addresses={[
            '0491bba2510912a5bd37da1fb5b1673010e43d2c6d812c514e91bfa9f2eb129e1c183329db55bd868e209aac2fbc02cb33d98fe74bf23f0c235d6126b1d8334f86',
            '04865c40293a680cb9c020e7b1e106d8c1916d3cef99aa431a56d253e69256dac09ef122b1a986818a7cb624532f062c1d1f8722084861c5c3291ccffef4ec6874',
            '048d2455d2403e08708fc1f556002f1b6cd83f992d085097f9974ab08a28838f07896fbab08f39495e15fa6fad6edbfb1e754e35fa1c7844c41f322a1863d46213',
          ]}
        />,
        container
      );
      expect(error).toBeFalsy();
      // expected value from https://gist.github.com/gavinandresen/3966071
      expect(container?.innerHTML).toEqual(
        '3QJmV3qfvL9SuYo34YihAf3sRCW3qSinyC'
      );
    });
  });

  it('should generate error if m>n', () => {
    act(() => {
      let error = '';
      render(
        <Multisig
          onError={function (e): void {
            error = e;
          }}
          m={3}
          addresses={[
            '04865c40293a680cb9c020e7b1e106d8c1916d3cef99aa431a56d253e69256dac09ef122b1a986818a7cb624532f062c1d1f8722084861c5c3291ccffef4ec6874',
            '048d2455d2403e08708fc1f556002f1b6cd83f992d085097f9974ab08a28838f07896fbab08f39495e15fa6fad6edbfb1e754e35fa1c7844c41f322a1863d46213',
          ]}
        />,
        container
      );
      expect(error).toEqual('m should be less than/equal n');
      expect(container?.innerHTML).toEqual('');
    });
  });
});
