import React from 'react';
import Link from '../Link';
import { mountInBrowserRouter, mount } from './testutils';
import { BrowserRouter } from '../Router';

describe('<Link/> works', () => {
  it('render with errors', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => {
      mount(<Link path="/" />);
    }).toThrow('You should not use `useRouter()` outside Router');
  });

  it('performs a navigation when `onClick` trigger', () => {
    const { wrapper } = mountInBrowserRouter(
      <Link path="/foo">
        <div>abc</div>
      </Link>
    );
    wrapper.find('div').simulate('click');
    expect(window.location.pathname).toBe('/foo');
  });

  it('accepts an `onClick` props,fired after the navigation', () => {
    let idx = 0;
    const { wrapper } = mountInBrowserRouter(
      <Link onClick={() => idx++} path="/foo">
        <div>abc</div>
      </Link>
    );
    wrapper.find('div').simulate('click');
    expect(window.location.pathname).toBe('/foo');
    expect(idx).toBe(1);
  });
  it('not performs a navigation,only fired `onClick()`', () => {
    let idx = 0;

    const { wrapper } = mountInBrowserRouter(
      <Link onClick={() => idx++}>
        <div>abc</div>
      </Link>
    );
    const prevPathname = window.location.pathname;
    wrapper.find('div').simulate('click');
    expect(idx).toBe(1);
    expect(window.location.pathname).toBe(prevPathname);
  });
  it('wrap children in <a> when received not single object children', () => {
    const { wrapper } = mountInBrowserRouter(
      <BrowserRouter>
        <Link to="/foo">
          <div>abc</div>
          <div>123</div>
        </Link>
      </BrowserRouter>
    );
    expect(wrapper.find('a').children()).toHaveLength(2);
  });
});
