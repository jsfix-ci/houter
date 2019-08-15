import RouterContext from "./context";
import React, { useContext,  useEffect, useReducer } from "react";
import { createBrowserHistory, createHashHistory } from "history";
import {
  History,
  RouterProps,
  BrowserRouterProps,
  HashRouterProps
} from "./types";

const buildRouter = (history: History) => {
  const match = {
    path: "/",
    url: "/",
    params: {},
    isExact: history.location.pathname === "/"
  };
  return {
    history,
    location: history.location,
    match
  };
};

const useRouter = () => {
  const ctx=useContext(RouterContext);
  if(ctx){
    return ctx
  }else{
    throw Error('You should not use `useRouter()` outside Router')
  }
};

const Router = ({ history, children }: RouterProps) => {
  const [value, setState] = useReducer(
    (state, payload) => ({
      ...state,
      ...payload
    }),
    buildRouter(history)
  );

  useEffect(() => {
    const unlisten = history.listen((location) => {
      setState({ location });
    });
    return ()=>unlisten()
  }, [history]);
  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
};

const HashRouter = ({ children, ...historyConfig }: HashRouterProps) => {
  const hashHistory = createHashHistory(historyConfig);
  return <Router history={hashHistory}>{children}</Router>;
};

const BrowserRouter = ({ children, ...historyConfig }: BrowserRouterProps) => {
  const browserHistory = createBrowserHistory(historyConfig);
  return <Router history={browserHistory}>{children}</Router>;
};

export { Router, useRouter, HashRouter, BrowserRouter };
