import React, { ReactNode } from 'react';
import { Router } from '../Router';
import { createBrowserHistory, createHashHistory } from 'history';
import { mount } from 'enzyme';
const mountInBrowserRouter = (jsx: ReactNode) => {
  const history = createBrowserHistory();
  const wrapper = mount(<Router history={history}>{jsx}</Router>);

  return { wrapper, history };
};

const mountInHashRouter = (jsx: ReactNode) => {
  const history = createHashHistory();
  const wrapper = mount(<Router history={history}>{jsx}</Router>);
  return { wrapper, history };
};
export { mountInBrowserRouter, mountInHashRouter, mount };
