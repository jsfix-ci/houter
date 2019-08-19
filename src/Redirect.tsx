import React from 'react';
import { RedirectProps } from './types';
import useLocation from './use-location';

const Redirect = (props: RedirectProps) => {
  const push = useLocation()[1];

  React.useEffect(() => {
    const href = props.href || props.to;
    if (href) push(href);
  }, []);
  return null;
};

export default Redirect;
