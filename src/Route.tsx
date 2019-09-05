import React, { useMemo } from 'react';
import { RouteProps, Options, Location, RouteComponentProps } from './types';
import { useRouter } from './Router';
import makeMatch from './makeMatch';
import RouterContext from './context';

const EMPTY_OBJ = {};

const coerceOpt = (options: Options | string | Array<string>) => {
  if (typeof options === 'string' || Array.isArray(options)) {
    return { path: options };
  }
  return options;
};
const useRoute = (
  options: Options | string | Array<string> = EMPTY_OBJ,
  location?: Location
) => {
  const ctx = useRouter();

  const resultLocation = location || ctx.location;

  return useMemo(
    () => {
      const optionsObj = coerceOpt(options);
      const match = !optionsObj.path
        ? ctx.match
        : makeMatch(resultLocation!.pathname, optionsObj);
      return {
        location: resultLocation!,
        match,
        history: ctx.history
      };
    },
    [options, resultLocation, ctx]
  );
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
      path,
      exact,
      sensitive,
      strict
    },
    location
  );
  if (computedMatch) props.match = computedMatch;
  if (Array.isArray(children) && children.length === 0) {
    children = void 0;
  }
  if (typeof children === 'function') {
    children = children(props);
  }

  const { match } = props;
  return (
    <RouterContext.Provider value={props}>
      {children ||
        (match !== null
          ? component
            ? React.createElement(component, props as RouteComponentProps)
            : render
            ? render(props as RouteComponentProps)
            : null
          : null)}
    </RouterContext.Provider>
  );
};

export { Route, useRoute };
