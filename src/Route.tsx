import React, { useMemo } from 'react';
import { RouteProps, Options, Location, RouteComponentProps } from './types';
import { useRouter } from './Router';
import makeMatch from './makeMatch';
import RouterContext from './context';

const EMPTY_OBJ = {};
// TODO:shallow equal to check memorize _options and _location
const useRoute = (
  _options: Options | string | Array<string> = EMPTY_OBJ,
  _location?: Location
) => {
  const ctx = useRouter();
  const options = useMemo(
    () => {
      if (typeof _options === 'string' || Array.isArray(_options)) {
        return { path: _options };
      }
      return _options;
    },
    [_options]
  );

  const location = _location || ctx.location;

  return useMemo(
    () => {
      const match = !options.path
        ? ctx.match
        : makeMatch(location!.pathname, options);
      return {
        location: location!,
        match,
        history: ctx.history
      };
    },
    [options, location, ctx]
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
