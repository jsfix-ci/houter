import { useRouter, BrowserRouter, HashRouter, Router } from "./Router";
import { Route, useRoute } from "./Route";
import { useLocation } from "./use-location";
import { Link } from "./Link";
import { Redirect } from "./Redirect";
import { Switch } from "./Switch";

const houter = {
  useRouter,
  BrowserRouter,
  HashRouter,
  Router,
  Route,
  useRoute,
  useLocation,
  Link,
  Redirect,
  Switch
};
export {
  useRouter,
  BrowserRouter,
  HashRouter,
  Router,
  Route,
  useRoute,
  useLocation,
  Link,
  Redirect,
  Switch
};
export default houter;


export * from "./types";
