import React from "react";
import { Router } from "../Router";
import { createBrowserHistory, createHashHistory } from "history";
import { mount } from "enzyme";
const mountInBrowserRouter = jsx => {
  const history = createBrowserHistory();
  const wrapper = mount(<Router history={history}>{jsx}</Router>);
  wrapper.history = history;
  return wrapper;
};

const mountInHashRouter = jsx => {
  const history = createHashHistory();
  const wrapper = mount(<Router history={history}>{jsx}</Router>);
  wrapper.history = history;
  return wrapper;
};
export { mountInBrowserRouter, mountInHashRouter, mount };
