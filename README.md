# houter

[![Travis](https://img.shields.io/travis/lintuming/houter/master.png?style=flat-square)](https://travis-ci.org/lintuming/houter.svg?branch=master)
[![npm package](https://img.shields.io/npm/v/houter.png?style=flat-square)]( https://www.npmjs.org/package/houter)
[![Coverage Status](https://coveralls.io/repos/github/lintuming/houter/badge.svg?branch=master)](https://coveralls.io/github/lintuming/houter?branch=master)
[![LICENSE](https://img.shields.io/github/license/lintuming/houter?color=blue)](https://img.shields.io/github/license/lintuming/houter?color=blue)
</br>
A tiny routing solution inspired by **[wouter](https://github.com/molefrog/wouter)** and **[React Route](https://reacttraining.com/react-router/)** for React App .

- Familiar [React Route](https://reacttraining.com/react-router/) API & patterns: [`<BrowserRouter>`](#BrowserRouter), [`<HashRouter>`](#HashRouter) , [`<Route>`](#Route) , [`<Link/>`](#Link) , [`<Redirect/>`](#Redirect) and [`<Switch/>`](#Switch).
- Has hook-based API for more granular control over routing (like animations): **[useLocation](#useLocation)**, **[useRoute](#useRoute)** and **[useRouter](#useRouter)**.
- Written in **TypeScript** and will make it easier for you to type your React code.

## Install

```sh
npm install houter
```

## Get started

Check out this demo app below in order to get started:

```js
import { BrowserRouter, Route } from "houter";

const App = () => (
  <BrowserRouter>
    <Route path="/" render={() => <div>Home</div>} />
    <Route
      path="/users/:name"
      render={({ match }) => <div>{match.params.name}</div>}
    />
    <Route path="/inbox" component={InboxPage} />
  </BrowserRouter>
);
```

## Core API

Houter has two kinds of APIs:low-level [React Hook-based](https://reactjs.org/docs/hooks-intro.html) API and more traditional component-based API similar to [React Route](https://reacttraining.com/react-router/)'s one.

### The list of method available

**Component API**:

- **[`<BrowserRouter/>`](#BrowserRouter)**
- **[`<HashRouter/>`](#HashRouter)**
- **[`<Router/>`](#Router)**
- **[`<Route/>`](#Route)**
- **[`<Switch/>`](#Switch)**
- **[`<Link/>`](#Link)**
- **[`<Redirect/>`](#Redirect)**

**Hooks API**：

- **[`useRoute`](#useRoute)**
- **[`useRouter`](#useRouter)**
- **[`useLocation`](#useLocation)**

## Component API

### `<BrowserRouter/>`

A [`<Router>`](#Router) that uses the HTML5 history API (pushState, replaceState and the popstate event) to keep your UI in sync with the URL.

```js
import { BrowserRouter } from "houter";

<BrowserRouter
  basename={optionalString}
  forceRefresh={optionalBool}
  getUserConfirmation={optionalFunc}
  keyLength={optionalNumber}
>
  <App />
</BrowserRouter>;
```

### **props:**


#### **basename: string**

If all the URLs in your app are relative to some other "base" URL, use the basename option. This option transparently adds the given string to the front of all URLs you use.

```js
import { BrowserRouter } from "houter";

<BrowserRouter basename="/abc" />;

history.listen(location => {
  console.log(location.pathname); // /home
});

history.push("/home"); // URL is now /abc/home
```

#### **forceRefresh: boolean**

If true the router will use full page refreshes on page navigation. You probably only want this in browsers that don’t support the HTML5 history API.

#### **getUserConfirmation：function**

A function to use to confirm navigation with the user.

```js
import { BrowserRouter } from "houter";

<BrowserRouter
  getUserConfirmation={(message, cb) => cb(window.confirm(message))}
/>;
```

#### **keyLength: number**

The length of location.key

#### More information at [createBrowserHistory](https://github.com/ReactTraining/history#usage).

### `<HashRouter/>`

A [`<Router>`](#router) that uses the hash portion(window.location.hash) to keep your UI in sync with the URL.

```js
import { HashRouter } from "houter";

<HashRouter
  basename={optionalString}
  hashType={optionalString}
  getUserConfirmation={optionalFunc}
/>;
```

#### **basename:string**

The base URL for all locations. A properly formatted basename should have a leading slash, but no trailing slash.

#### **hashType:string**

By default [`<HashRouter/>`](#HashRouter) uses a leading slash in hash-based URLs. You can use the hashType option to use a different hash formatting.

```js
<HashRouter
  hashType="slash" // the default
/>;

history.push("/home"); // window.location.hash is #/home

<HashRouter
  hashType="noslash" //Omit the leading slash
/>;

history.push("/home"); // window.location.hash is #home

<HashRouter
  hashType="hashbang" //Google's legacy AJAX URL format
/>;
history.push("/home"); // window.location.hash is #!/home
```

#### More infomation at [createHashHitory](https://github.com/ReactTraining/history#usage).

### `<Router/>`

The common low-level interface for all router components.The most common use-case for using the low-level `<Router>` is to synchronize a custom history with a state management lib like Redux or Mobx,or using the history instance outside the React App.

```js
import {creteBrowserHistory,createHashHistory} from 'history'

const hashHistory = createHashHistory();
const browserHistory = createBrowserHistory();
//Using in modern web browsers that support the HTML5 history API.
<Router
  history={browserHistory}
>
  <App/>
</Router>
//Using in legacy web browsers.
<Router
  history={hashHistory}
>
 <App/>
</Router>
```

#### More information at [history](https://github.com/ReactTraining/history)

### `<Route/>`

**`<Route/>`** is a component rendered some UI when a location matches it's path.

#### Route render methods:

Houter provides multipile ways to render something with `<Route/>`:

```js
import { BrowserRouter } from "houter";

const App = () => {
  return (
    <BrowserRouter>
      <Route
        path="/"
        exact
        render={({ location, match, history }) => <div>Home</div>}
      />
      <Route path="/foo" component={Foo} />
      <Route
        path="/boo"
        children={({ location, match, history }) => <div>boo</div>}
      />
    </BrowserRouter>
  );
};
```

#### Route props:

All three render methods will be passed the same three route props:

- [location](#location)
- [match](#match)
- [history](#history)

### **Props:**

#### **path:string|string[]**

Any valid URL path or arrays of paths that [path-to-regexp@^3.0.0](https://github.com/pillarjs/path-to-regexp/tree/v3.0.0) understands.

Route always match without a path.

#### **component:ReactComponent**

A React component to be rendered when current location matches the route's path.It will be rendered with route props.

#### **render:function**

Inline rendering and wrapping without the undesired remounting explained above.

**Warining**:if you using **component** and **render** both in the same [`<Route/>`](#route),the **component** prop will takes precedence over **render**.

#### **children:function|ReactElement**

[`<Route/>`](#route) **always** rendering the children whether the current location matches route's path or not.

#### **exact:boolean**

When true the regexp will match to the end of the string.(default: false)

| path | location.pathname | exact | maches |
| ---- | ----------------- | ----- | ------ |
| /boo | /boo/foo          | true  | false  |
| /boo | /boo/foo          | false | true   |

#### **strict:boolean**

When true the regexp allows an optional trailing delimiter to match. (default: false)

| path  | location.pathname | strict | maches |
| ----- | ----------------- | ------ | ------ |
| /boo/ | /boo              | true   | false  |
| /boo/ | /boo              | false  | true   |

#### **sensitive:boolean**

When true the regexp will be case sensitive. (default: false)

| path  | location.pathname | sensitive | maches |
| ----- | ----------------- | --------- | ------ |
| /BOO/ | /boo              | true      | false  |
| /boo/ | /boo              | true      | true   |
| /Boo/ | /boo              | false     | true   |

#### **location:object**

### `<Switch/>`

`<Switch/>` always render the first matched `<Route/>` component.

See the differences between these two demo below:

```js
import { Switch, Route } from "houter";

const App = () => {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/foo" component={Foo} />
      <Route path="/boo" component={Boo} />
    </Switch>
  );
};

location.pathname = "/";
//Render <Home/>
location.pathname = "/foo";
//Render <Home/>
location.pathname = "/boo";
//Render <Home/>
```

```js
import { Switch, Route } from "houter";

const App = () => {
  return (
    <Switch>
      <Route path="/foo" component={Foo} />
      <Route path="/boo" component={Boo} />
      <Route path="/" component={Home} />
    </Switch>
  );
};

location.pathname = "/";
//Render <Home/>
location.pathname = "/foo";
//Render <Foo/>
location.pathname = "/boo";
//Render <Boo/>
```

### `<Link/>`

`<Link/>` component renders an `<a />` element that, when clicked, performs a navigation. You can customize the link appearance by providing your own component or link element as children:

```js
import { Link } from "houter";
// It will produce the ReactElement like
//`<a href="/" onClick={()=>history.push('/)}>Hello!</a>`
<Link to="/">
  <a>Hello!</a>
</Link>

// It will produce the ReactElement like
//`<a href="/" onClick={()=>history.push('/)}></a>`
<Link to="/">
</Link>

// It will produce the ReactElement like
//<a href="/" onClick={()=>history.push('/)}>
//  <div>Hello!</div>
//  <span>Welcome!</span>
//</a>`
<Link to="/">
  <div>Hello!</div>
  <span>Welcome!</span>
</Link>

// It will produce the ReactElement like
//<App href="/" onClick={()=>history.push('/)}>Hello!</div>
<Link to="/">
  <App>Hello!</App>
</Link>
```

### `<Redirect/>`

`<Redirect/>` will performing a redirect to a path provided when mounted.
Witout a provided path, `<Redirect/>` will doing nothing when mounted.

```js
import { Redirect } from "houter";
//It will redirect to '/foo'  when mounted.
<Redirect path="/foo" />;
```

### location

A Location represents where the app now,where the app want to go,or where the app it was.

It looks like this:

```js
{
  key:"ac3df4",
  pathname:'/',
  search:'?a=b&c=d',
  hash:"#",
  state:{
    [key]:value
  }
}
```

The route will provide location object in a few places:

- [`<Route render/>`](#renderfunction) as ({ location }) =>()
- [`<Route component/>`](#componentReactComponent) as this.props.location
- [`<Route children/>`](#childrenfunctionReactElement) as ({location}) =>()
- [`useRoute()`](#useRoute) as { location } = useRoute()
- [`useRouter()`](#useRouter) as { location } = useRouter()

### match

A Match object represents how a [`<Route/>`](#Route) matched the current URL.

It contains these properties below:

```ts
type match = {
  isExact: boolean;
  params: {
    [key]: value;
  };
  path: string;
  url: string;
};
```

The list of ways obtaining `match` object:

- [`<Route render/>`](#renderfunction) as ({match}) =>()
- [`<Route component/>`](#componentReactComponent) as this.props.match
- [`<Route children/>`](#childrenfunctionReactElement) as ({match}) =>()
- [`useRoute()`](#useRoute) as {match} = useRoute()
- [`useRouter()`](#useRouter) as { match } = useRouter()

### history

A History object offers a set of methods to perform navigation,it refers to the [history package](https://github.com/ReactTraining/history).

See more infomations at [history](https://github.com/ReactTraining/history).

## Hooks API

React's new "[Hooks](https://reactjs.org/docs/hooks-intro.html)" APIs give function components the ability to use local component state, execute side effects, and more.

### `useRouter`:

The `useRouter` hooks let you have access to the lastest [history](#history) object and the closest [\<Route/\>'s match](#match) object.

```js
const { location, match, history } = useRouter();
```

### `useRoute`:

The `useRoute` hook make accessing router directly easier . You can check if particular route
matches th current location by using an `useRoute` hook .

```ts
useRoute(
  options:string|string[]|{
    path?:string|string[],
    exact?:boolean,
    sensitive?:boolean,
    strict?:boolean
  }={}, location?:object);
```

```js
import { useRoute, BrowserRouter } from "houter";

const CustomizeRoute = () => {
  //You can pass any valid URL path or array of paths.
  const { match, location, history } = useRoute("/foo/:boo");
  const { match, location, history } = useRoute(["/foo/:boo"]);
  // or passing an object with specific config.
  const { match, location, history } = useRoute({
    path: "/foo/:boo", // or ["/foo/:boo",'/',...And any valid URL path you want to be matched]
    strict: false,
    sensitive: false,
    exact: false
  });

  return (
    <div onClick={() => history.push("/")}>
      Location:{location.pathname}
      params:{match.params.boo}
    </div>
  );
};
```

### `useLocation`

You can get access to the [location](#location) object’s properties and performing a navigation via the **useLocation** hook.

```js

const App = () => {
  const [location, push, replace] = useLocation();
  return <div onClick={() => push("/")}>go to Home</div>;
};
```


## License

houter is [MIT licensed](./License)
