import { mountInBrowserRouter } from './testutils';
import Redirect from '../Redirect';
import React from 'react';
describe('<Redirect/> works', () => {
  afterEach(() => history.replaceState(null, '', '/'));

  it('redirects', () => {
    const { wrapper } = mountInBrowserRouter(<Redirect to="/foo" />);
    expect(location.pathname).toBe('/foo');
    wrapper.unmount();
  });
  it('do nothing when receive invalid `path` or `to` prop', () => {
    const { wrapper } = mountInBrowserRouter(<Redirect />);
    expect(location.pathname).toBe('/');
    wrapper.unmount();
  });
});
