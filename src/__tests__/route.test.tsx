import React from 'react';
import { Route, useRoute } from '../Route';
import { BrowserRouter, HashRouter, useRouter } from '../Router';
import { mount, mountInBrowserRouter } from './testutils';
import { act } from 'react-dom/test-utils';

beforeEach(() => {
  window.history.replaceState(null, '', '/');
});
describe('<Route/> render element when matched', () => {
  it('throws erros', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      mount(<Route />);
    }).toThrow('You should not use `useRouter()` outside Router');
  });

  it('render nothing', () => {
    const wrapper = mount(
      <BrowserRouter>
        <Route />
      </BrowserRouter>
    );
    expect(wrapper.html()).toBe('');
  });
  it('work with <BrowserRouter/>', () => {
    const wrapper = mount(
      <BrowserRouter>
        <Route
          exact
          path="/"
          render={({ history }) => (
            <h1 onClick={() => history.push('/foo')}>haha</h1>
          )}
        />
        <Route
          path="/foo"
          render={({ history }) => (
            <h1 onClick={() => history.push('/')}>foo</h1>
          )}
        />
      </BrowserRouter>
    );
    expect(window.location.pathname).toBe('/');
    expect(wrapper.find('h1').text()).toBe('haha');
    wrapper.find('h1').simulate('click');
    expect(wrapper.find('h1').text()).toBe('foo');
    expect(window.location.pathname).toBe('/foo');

    wrapper.unmount();
  });

  it('work with <HashRouter/>', () => {
    const wrapper = mount(
      <HashRouter>
        <Route
          exact
          path="/"
          render={({ history }) => (
            <h1 onClick={() => history.push('/foo')}>haha</h1>
          )}
        />
        <Route
          path="/foo"
          render={({ history }) => (
            <h1 onClick={() => history.push('/')}>foo</h1>
          )}
        />
      </HashRouter>
    );
    expect(wrapper.find('h1').text()).toBe('haha');
    wrapper.find('h1').simulate('click');
    expect(wrapper.find('h1').text()).toBe('foo');
    expect(window.location.hash).toBe('#/foo');
    wrapper.unmount();
  });

  describe('render children', () => {
    it('render no child when children.lengh===0', () => {
      const wrapper = mount(
        <BrowserRouter>
          <Route path="/foo">{Array()}</Route>
        </BrowserRouter>
      );
      expect(wrapper.html()).toEqual('');
    });
    it('work with renderProps', () => {
      const wrapper = mount(
        <BrowserRouter>
          <Route path="/foo">
            {({ location, history }) => (
              <div onClick={() => history.push('/foo')}>
                {location.pathname}
              </div>
            )}
          </Route>
        </BrowserRouter>
      );
      const div = wrapper.find('div');
      expect(div.text()).toBe('/');
      div.simulate('click');
      expect(div.text()).toBe('/foo');
    });
  });
});

describe('useRoute() works', () => {
  it('work with string argument', () => {
    const C = () => {
      const { match } = useRoute('/foo');
      return match ? <div>foo</div> : null;
    };
    const { wrapper, history } = mountInBrowserRouter(<C />);
    expect(wrapper.exists('div')).toBe(false);
    act(() => history.push('/foo'));
    expect(window.location.pathname).toBe('/foo');
    wrapper.update();
    expect(wrapper.find('div').text()).toBe('foo');
    wrapper.unmount();
  });

  it('work with Array<string> argument', () => {
    const C = () => {
      const { match, location } = useRoute(['/foo', '/boo']);
      return match ? <div>{location.pathname}</div> : null;
    };

    const { wrapper, history } = mountInBrowserRouter(<C />);
    history.push('/');
    wrapper.update();
    expect(wrapper.exists('div')).toBe(false);
    act(() => history.push('/foo'));
    expect(window.location.pathname).toBe('/foo');
    wrapper.update();
    expect(wrapper.find('div').text()).toBe('/foo');
    act(() => history.push('/boo'));
    wrapper.update();
    expect(wrapper.find('div').text()).toBe('/boo');
    wrapper.unmount();
  });

  it('work with other location', () => {
    const C = () => {
      const { location } = useRouter();
      const unChangedLocation = React.useMemo(() => location, []);
      const { match, location: unChanged } = useRoute('/', unChangedLocation);
      return (
        <div>
          <span>{location.pathname}</span>
          {match ? <h1>{unChanged.pathname}</h1> : null}
        </div>
      );
    };
    const { wrapper, history } = mountInBrowserRouter(<C />);
    act(() => history.push('/'));
    wrapper.update();
    expect(wrapper.find('h1').html()).toBe('<h1>/</h1>');
    expect(wrapper.find('span').html()).toBe('<span>/</span>');
    act(() => history.push('/foo'));
    wrapper.update();
    expect(wrapper.find('h1').html()).toBe('<h1>/</h1>');
    expect(wrapper.find('span').html()).toBe('<span>/foo</span>');
  });

  it('always match when pass nothing', () => {
    const C = () => {
      const { match } = useRoute();
      return <div>{match ? <h1 /> : null}</div>;
    };
    const { wrapper } = mountInBrowserRouter(<C />);
    expect(wrapper.find('h1').exists()).toBe(true);
  });
});
