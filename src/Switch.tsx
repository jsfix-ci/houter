import React, { ReactElement } from 'react';
import { SwitchProps, Match, RouteProps } from './types';
import { useRouter } from './Router';
import { makeMatch } from './makeMatch';

const Switch = (props: SwitchProps) => {
  const ctx = useRouter();
  const location = props.location || ctx.location;
  let match: Match | null | undefined,
    element: ReactElement<RouteProps> | undefined;
  //
  React.Children.forEach(props.children, child => {
    if (match == null && React.isValidElement(child)) {
      element = child;
      const path = child.props.path || child.props.from;
      match = path
        ? makeMatch(location.pathname, { ...child.props, path })
        : ctx.match;
    }
  });

  return match
    ? React.cloneElement<RouteProps>(element as ReactElement<RouteProps>, {
        location,
        computedMatch: match
      })
    : null;
};

export { Switch };
