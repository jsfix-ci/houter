import React, { useContext, useMemo } from "react";
import { RouteProps, Options, Location, RouteComponentProps } from "./types";
import { useRouter } from "./Router";
import { makeMatch } from "./makeMatch";
import RouterContext from "./context";

const useRoute = (
  options: Options | string | Array<string> = {},
  location?: Location
) => {
  const ctx = useRouter();
  location = location ? location : ctx.location;
  return useMemo<RouteComponentProps>(() => {
    if (typeof options === "string" || Array.isArray(options)) {
      options = {
        path: options
      };
    }
    const match = !options.path
      ? ctx.match
      : makeMatch((location as Location).pathname, options);
    return { location: location as Location, match, history: ctx.history };
  }, [options, location, ctx]);
};

const Route = ({
  path,
  exact,
  sensitive,
  strict,
  location,
  children,
  component,
  computedMatch,
  render
}: RouteProps) => {
  const props = useRoute(
    {
      path: path,
      exact: exact,
      sensitive: sensitive,
      strict: strict
    },
    location
  );
  if (computedMatch) props.match = computedMatch;
  if (Array.isArray(children) && children.length === 0) {
    children = void 0;
  }
  if (typeof children === "function") {
    children = children(props);
  }
  return (
    <RouterContext.Provider value={props}>
      {children
        ? children
        : props.match
        ? component
          ? React.createElement(component, props)
          : render
          ? render(props)
          : null
        : null}
    </RouterContext.Provider>
  );
};

export { Route, useRoute };
