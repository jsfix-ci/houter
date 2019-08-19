import React from 'react';
import { useLocation } from './use-location';
import { LinkProps } from './types';
const Link = (props: LinkProps) => {
  const push = useLocation()[1];
  const href = props.path || props.to;
  const handleClick = React.useCallback(
    e => {
      e.preventDefault();
      if (href) {
        push(href, props.state);
      }
      props.onClick && props.onClick(e);
    },
    [props.onClick, href]
  );

  const pendingProps = { onClick: handleClick, href, to: null };
  const child = React.isValidElement(props.children) ? (
    props.children
  ) : (
    <a {...props} />
  );
  return React.cloneElement(child, pendingProps);
};

export { Link };
