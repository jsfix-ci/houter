import React from 'react';
import { act } from 'react-dom/test-utils';
import { mountInBrowserRouter } from './testutils';
import Switch from '../Switch';
import { Route } from '../Route';

const h = () => <h1>h1</h1>;

describe('<Switch/> works', () => {
  const wrap = (path?: string, jsx?: any) => {
    window.history.replaceState(null, '', path);
    return mountInBrowserRouter(jsx);
  };

  it('works well when nothing is provided', () => {
    const { wrapper } = wrap();
    expect(wrapper.find(Switch).children()).toHaveLength(0);
  });

  it('always renders no more than 1 matched children', () => {
    const r = [
      <Route key="0" exact path="/" component={h} />,
      <Route key="1" path="/foo" render={() => <h2 />} />
    ];
    const { wrapper, history } = wrap(
      '/',
      <Switch>
        {r}
        <Route
          path="/:baa"
          render={({ match }) => <h3>{match.params.baa}</h3>}
        />
      </Switch>
    );
    expect(window.location.pathname).toBe('/');
    expect(wrapper.find('h1').text()).toBe('h1');
    act(() => history.push('/foo'));
    wrapper.update();
    expect(wrapper.find('h2').html()).toBe('<h2></h2>');
    act(() => history.push('/abb'));
    wrapper.update();
    expect(wrapper.find('h3').html()).toBe('<h3>abb</h3>');
  });

  it('always render no path prop <Route/>', () => {
    const { wrapper, history } = wrap(
      '/',
      <Switch>
        <Route component={h} />
        <Route path="/foo" render={() => <h2 />} />
      </Switch>
    );
    expect(wrapper.find('h1').html()).toBe('<h1>h1</h1>');
    act(() => history.push('/foo'));
    expect(wrapper.find('h2').exists()).toBe(false);
  });

  it('render nothing when pass nonthing insinde <Switch/>', () => {
    const { wrapper } = wrap('/', <Switch />);
    expect(
      wrapper
        .find(Switch)
        .children()
        .exists()
    ).toBe(false);
  });
});
