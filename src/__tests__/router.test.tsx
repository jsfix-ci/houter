import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, BrowserRouter, HashRouter } from '../Router';
import { mount } from './testutils';

describe('<Router/> works', () => {
  const wrapper = mount(<Router history={createBrowserHistory()} />);

  it('with one child', () => {
    wrapper.setProps({
      children: (
        <p>
          123<span>1234</span>
        </p>
      )
    });
    expect(wrapper.find('p').text()).toBe('1231234');
  });

  it('with more than one childs', () => {
    wrapper.setProps({
      children: [<div key="1">child1</div>, <div key="2">child2</div>]
    });
    expect(wrapper.children().length).toBe(2);
  });
});

describe('<BrowserRouter> works', () => {
  const wrapper = mount(
    <BrowserRouter>
      <div>1234</div>
    </BrowserRouter>
  );
  it('render without errors', () => {
    expect(wrapper.find('div').text()).toBe('1234');
  });
});

describe('<HashRouter> works', () => {
  const wrapper = mount(
    <HashRouter>
      <div>1234</div>
    </HashRouter>
  );
  it('render without errors', () => {
    expect(wrapper.find('div').text()).toBe('1234');
  });
});
