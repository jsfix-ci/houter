# houter

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

A tiny routing solution inspired by **[wouter](https://github.com/molefrog/wouter)** and **[React Route](https://reacttraining.com/react-router/)** for React App .

- Familiar [React Route](https://reacttraining.com/react-router/) API & patterns: [`<BrowserRouter>`](#BrowserRouter), [`<HashRouter>`](#HashRouter) , [`<Route>`](#Route) , [`<Link/>`](#Link) , [`<Redirect/>`](#Redirect) and [`<Switch/>`](#Switch).
- Has hook-based API for more granular control over routing (like animations): **[useLocation](#useLocation)**, **[useRoute](#useRoute)** and **[useRouter](#useRouter)**.
- Written in **TypeScript** and will make it easier for you to type your React code

## Why do this

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

## Houter API

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

A `<Router>` that uses the HTML5 history API (pushState, replaceState and the popstate event) to keep your UI in sync with the URL.

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

A `<Router>` that uses the hash portion(window.location.hash) to keep your UI in sync with the URL.

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

By default `<HashRouter/>` uses a leading slash in hash-based URLs. You can use the hashType option to use a different hash formatting.

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

`<Route/>` is a component rendered some UI when a location matches it's path.

Houter provides multipile ways to render something with `<Route/>`:

```js
import { BrowserRouter } from "houter";


```

## Hooks API

React's new "[Hooks](https://reactjs.org/docs/hooks-intro.html)" APIs give function components the ability to use local component state, execute side effects, and more.

### `useRoute`:

The `useRoute` hook make accessing router directly easier . You can check if particular route
matches th current location by using an `useRoute` hook .

```ts
useRoute(
  options?:string|string[]|{
    path?:string|string[],
    exact?:boolean,
    sensitive?:boolean,
    strict?:boolean
  }, location?:object);
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

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo
[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package
[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
