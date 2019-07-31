import React, { useMemo } from "react";
import { RouteProps, Options, Location, RouteComponentProps } from "./types";
import { useRouter } from "./Router";
import { makeMatch } from "./makeMatch";
import RouterContext from "./context";

const useRoute = (
  _options: Options | string | Array<string> = {},
  location?: Location
) => {
  const ctx = useRouter();
  let options: Options =
    typeof _options === "object" && !Array.isArray(_options) ? _options : {};
  location = location ? location : ctx.location;

  if (typeof _options === "string" || Array.isArray(_options)) {
    options = {
      path: _options
    };
  }

  return useMemo(() => {
    const match = !options.path
      ? ctx.match
      : makeMatch(location!.pathname, options);
    return {
      location: location!,
      match,
      history: ctx.history
    };
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
        : props.match !== null
        ? component
          ? React.createElement(component, props as RouteComponentProps)
          : render
          ? render(props as RouteComponentProps)
          : null
        : null}
    </RouterContext.Provider>
  );
};

export { Route, useRoute };
